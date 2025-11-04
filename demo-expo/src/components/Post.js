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
    const likes = this.props.data.likes ? this.props.data.length : 0;
    const likeado =
      this.props.data.likes &&
      this.props.data.likes.includes(auth.currentUser.email);
    this.setState({
      cantLikes: likes,
      likeado: likeado,
    });
  }
  agregarLike() {
    db.collection("posts")
      .doc(docId)
      .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
      })
      .then(() =>
        this.setState({
          likeado: true,
          cantLikes: this.state.cantLikes + 1,
        })
      );
  }
  sacarLike() {
    db.collection("posts")
      .doc(docId)
      .update({
        likes: firebase.firestore.FieldValue.arrayRemove(
          auth.currentUser.email
        ),
      })
      .then(() =>
        this.setState({
          likeado: true,
          cantLikes: this.state.cantLikes - 1,
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
        <Text>{this.state.cantLikes}</Text>
        <Pressable style={styles.button} onPress={() => this.props.navigation.navigate("Comentarios") } >
          <Text>Comentar</Text>
        </Pressable>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { padding: 12 },
  owner: { fontWeight: '600' },
  post: { marginTop: 6 },
  desc: { color: '#555', marginTop: 4 },
});
