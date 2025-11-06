import React, { Component } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";

export default class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: "",
    };
  }
  crearPost(descripcion) {
    if (descripcion !== "") {
      db.collection("posts")
        .add({
          owner: auth.currentUser.email,
          post: descripcion,
          createdAt: Date.now(),
          likes: [],
          comentarios: []
        })
        .then((resp) => this.props.navigation.navigate("StackNavigator2", { screen: "Home" }))
        .catch((err) => console.log(err));
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Crea tu posteo..</Text>
        <View style={styles.box}>
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Escribe tu comentario.."
            onChangeText={(text) => this.setState({ post: text })}
            value={this.state.post} />
          <Pressable
            style={styles.button}
            onPress={() => this.crearPost(this.state.post)} >
            <Text style={styles.buttonText}>Publicar Post</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  box: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 4,
    padding: 15,
    shadowColor: "#000",
    shadowRadius: 3,
    alignItems: "center",
  },

  input: {
    width: "100%",
    height: 100,
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
