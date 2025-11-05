import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import firebase from "firebase";
import { db, auth } from "../firebase/config";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeado: false,
      valorLikes: 0,
    };
  }
  componentDidMount() {
    db.collection("posts")
      .doc(this.props.id)
      .onSnapshot((doc) => {
        const data = doc.data()
        const likes = data.likes ? data.likes : [];
        const likeado = likes.includes(auth.currentUser.email)
        this.setState({
          likeado: likeado,
          cantLikes: likes.length
        })
      })
    }
  agregarLike() {
    db.collection("posts")
      .doc(this.props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() =>
        this.setState({
          likeado: true
        })
      );
  }
  sacarLike() {
    db.collection("posts")
      .doc(this.props.id)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
      })
      .then(() =>
        this.setState({
          likeado: false
        })
      );
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.owner}>{this.props.data.owner}</Text>
        <Text style={styles.post}>{this.props.data.post}</Text>
        <Text>{this.props.data.descripcion}</Text>
        <View style={styles.botones}>
        {this.state.likeado ? (
          <Pressable style={styles.button} onPress={() => this.sacarLike(this.props.id)}>
            <Text style={styles.buttonText}>Dislike</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.button} onPress={() => this.agregarLike(this.props.id)}>
            <Text style={styles.buttonText}>Like</Text>
          </Pressable>
        )}
        <Text>{this.state.cantLikes} ❤️</Text>
        <Pressable
        style={styles.button}
          onPress={() => this.props.navigation.navigate("Comentarios", { id: this.props.id}) }>
          <Text style={styles.buttonText}>Comentar</Text>
        </Pressable>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {  
    backgroundColor: '#fffafc',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f5b6c2',
  },
  botones: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 8
  
  },
  button: {
    backgroundColor: '#f9c5c8',
    width: '20%',
    alignItems: 'center',
    padding: 3,
    borderRadius: 10, 
 
},
buttonText: {
    fontSize: 10,
    color: '#4a2f2f',
    fontWeight: '600',
},
  owner: { fontWeight: "20" , fontSize: 12},
  post: { marginTop: 7, fontSize: 18 },
  desc: { color: "#555", marginTop: 4 },
});
