import React, { Component } from "react";
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from "react-native";
import firebase from "firebase";
import { db, auth } from "../firebase/config";

export default class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: "",
      comentario: "",
      comentarios: "",
      owner: ''
    };
  }
  componentDidMount() {
    const postId = this.props.route.params.id;
    db.collection("posts")
      .doc(postId)
      .onSnapshot((doc) => {
        let post = doc.data().post;
        let comentarios = doc.data().comentarios;
        let owner = doc.data().owner
        console.log(post);
        console.log(comentarios);
        this.setState({
          post: post,
          comentarios: comentarios,
          owner: owner
        });
      });
  }
  crearComentario() {
    if (this.state.comentario !== "") {
      const postId = this.props.route.params.id;
      db.collection("posts")
        .doc(postId)
        .update({
          comentarios: firebase.firestore.FieldValue.arrayUnion({
            user: auth.currentUser.email,
            descripcion: this.state.comentario,
            createdAt: Date.now(),
          }),
        })
        .then((resp) => this.setState({ comentario: "" }))
        .catch((err) => console.log(err));
    }
  }

  render() {
    return (
      <View style={styles1.container}>
        <View style={styles1.postCard}>
          <Text>Hecho por: {this.state.owner}</Text>
          <Text style={styles1.postText}>{this.state.post}</Text>
        </View>

        <Text style={styles1.title}>Comentarios</Text>
        { this.state.comentarios.length != 0 ?
         <FlatList style={styles1.flatList} data={this.state.comentarios} keyExtractor={(item) => item.id} 
        renderItem={({ item }) => <Text>{item.user}{item.descripcion}</Text> }/> :
        <Text>Aún no hay comentarios.</Text> 
        }
        
        <View style={styles1.formContainer} >
          <Text style={styles1.subtitle}>Agrega tu comentario!</Text>
        <TextInput style={styles1.input}
          placeholder="Deja tu comentario acá.."
          onChangeText={(text) => this.setState({ comentario: text })}
          keyboardType="default"
          value={this.state.comentario}
        />
        <Pressable style={styles1.button} onPress={() => this.crearComentario()}>
          <Text style={styles1.buttonText}>Enviar Comentario</Text>
        </Pressable>
        </View>
      </View>
    );
  }
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7fa',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
    width: '70%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f5b6c2',
  },
  flatList: {
    width: '100%',
    marginTop: 15,
  },
  postCard: {
    backgroundColor: '#fffafc',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
  },
  input: {
    width: "80%",
    height: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 3,
    marginVertical: 10,
    textAlignVertical: "top",
  },
    button: {
    backgroundColor: '#f5b6c2',
    paddingVertical: 12,
    borderRadius: 3,
    alignItems: "center",
    width: "100%",
  },
    buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});