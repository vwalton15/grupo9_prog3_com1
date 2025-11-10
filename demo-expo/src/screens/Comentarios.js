import React, { Component } from "react";
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from "react-native";
import firebase from "firebase";
import { db, auth } from "../firebase/config";
import Comments from '../components/Comments'

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
        <Text style={styles1.title}>Post</Text>
        <View style={styles1.post}>
          <Text style={styles1.owner}>{this.state.owner}</Text>
          <Text style={styles1.postText}>{this.state.post}</Text>
        </View>
       
        <Text style={styles1.title}>Comentarios</Text>
        { this.state.comentarios.length != 0 ?
         <FlatList style={styles1.flatList} data={this.state.comentarios}
          keyExtractor={(item) => item.createdAt + item.user} 
          renderItem={({ item }) => (
          <Comments data={item} />
        )}/> :
        <Text>Aún no hay comentarios.</Text> 
        }
         <Text style={styles1.subtitle}>Agrega tu comentario!</Text>
        <View style={styles1.formContainer} >
        <TextInput 
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
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    marginBottom: 2,
    marginTop: 4
  },
  formContainer: {
    width: '75%',
    backgroundColor: '#fffef8',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f5b6c2',
    marginTop: 20,
    alignSelf: 'center',
    maxHeight: 120, 
    marginBottom: 50
   
  },
  flatList: {
    width: '100%',
    marginTop: 15,
  },

  input: {
    width: '100%',
    height: 44,
    backgroundColor: '#fff3f4',
    borderWidth: 1,
    borderColor: '#f5b6c2',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
    button: {
    backgroundColor: '#f5b6c2',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 20
  },
    buttonText: {
      color: '#4a2f2f',
    fontWeight: '700',
    fontSize: 16,
  },
  owner: { fontWeight: "20" , fontSize: 12},
  post: { marginTop: 7, 
    fontSize: 18 ,     
    backgroundColor: '#fffafc',   
    borderWidth: 3,
    borderColor: '#f5b6c2',
    borderRadius: 16,
    padding: 17,
    marginBottom: 12,
  width: '85%'},
    comentarios:{
      marginTop: 7,
      marginLeft: 10,
       fontSize: 13 ,       
      borderRadius: 18,
      padding: 10,
      marginBottom: 12, 
      fontWeight: "60",
      width: '75%',
    },
  desc: { color: "#555", marginTop: 4 },
  commentBox: {
    borderWidth: 1,
    borderColor: '#f5b6c2',
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 5,
    marginVertical: 5,
    width: '65%',
    alignSelf: 'center',
  },
  subtitle:{
    marginTop: 10
  },
});