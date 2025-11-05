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
        <Text>{this.props.data.owner}</Text>
        <Text>{this.props.data.post}</Text>
        <Text>{this.props.data.descripcion}</Text>
        {this.state.likeado ? (
          <Pressable onPress={() => this.sacarLike(this.props.id)}>
            <Text>Dislike</Text>
          </Pressable>
        ) : (
          <Pressable onPress={() => this.agregarLike(this.props.id)}>
            <Text>Like</Text>
          </Pressable>
        )}
        <Text>{this.state.cantLikes} Likes</Text>
        <Pressable
          onPress={() => this.props.navigation.navigate("Comentarios", { id: this.props.id}) }>
          <Text>Comentar</Text>
        </Pressable>
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
  owner: { fontWeight: "600" },
  post: { marginTop: 6 },
  desc: { color: "#555", marginTop: 4 },
});
