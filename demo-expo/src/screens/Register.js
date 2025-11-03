import React, { Component } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { db , auth } from "../firebase/config";


export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      error: "",
    };
  }

  onSubmit(username, password, email) {
    console.log("creando usuario con los valores", {
      username,
      email,
      password,
    });

    if (username.length < 3) {
      this.setState({ error: "el usuario debe tener al menos 3 caracteres" });
      return;
    }

    if (!email.includes("@")) {
      this.setState({ error: "el mail debe contener @" });
      return;
    }
    if (password.length < 6) {
      this.setState({
        error: "La contraseña debe tener al menos 6 caracteres",
      });
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        db.collection("users").add({
          email: email,
          user: username,
          createdAt: Date.now(),
        });
      })
      .then((user) => {
        this.props.navigation.navigate("TabNavigator");
      })
      .catch((error) => {
        this.setState({ error: "Credenciales inválidas." });
        console.log(error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <Pressable
          style={styles.button2}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.buttonText2}>Tenes cuenta? Inicia Sesión </Text>
        </Pressable>

        <View style={styles.box}>
          <Text style={styles.title}>Registrá tu usuario</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-adress"
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
            placeholder="email"
          />

          <TextInput
            style={styles.input}
            keyboardType="default"
            onChangeText={(text) => this.setState({ username: text })}
            value={this.state.username}
            placeholder="username"
          />

          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
          />

          <Text>{this.state.error}</Text>

          <Pressable
            style={styles.button}
            onPress={() =>
              this.onSubmit(
                this.state.username,
                this.state.password,
                this.state.email
              )
            }
          >
            <Text style={styles.buttontext}>Enviar registro</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles= StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: "center" },
    title: { fontSize: 24, fontWeight: "600", marginBottom: 12, textAlign: "center" },
    box: { gap: 12, padding: 16, borderWidth: 1, borderColor: "#ddd", borderRadius: 8 },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 10 },
    button: { backgroundColor: "#222", padding: 12, borderRadius: 6, marginTop: 8, alignItems: "center" },
    buttonText: { color: "#fff", fontWeight: "600" },
    buttonSecondary: { padding: 10, alignItems: "center" },
    buttonTextSecondary: { color: "#007aff" },
})