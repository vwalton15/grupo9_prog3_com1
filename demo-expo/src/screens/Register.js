import React, { Component } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";


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

    if (!(email.includes("@"))) {
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
        <Text style={styles.title2}>¡Bienvenido! Crea tu cuenta</Text>
        <Text>¿Ya tenes cuenta?</Text>
        <Pressable
          style={styles.button2}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.buttonText2}> Inicia Sesión </Text>
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
            <Text style={styles.buttonText}>Enviar registro</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#f9c5c8',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#fefcf8',
    fontWeight: "400"

  },

  box: {
    backgroundColor: '#fff7fa',
    padding: 10,
    alignItems: 'center',
    gap: 12,
    borderWidth: 3,
    borderRadius: 8,
    borderColor: '#f9c5c8',
    width: 320,
    marginTop: 50
  },
  container: {
    flex: 1,
    backgroundColor: '#fff7fa',
    padding: 16,
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 22,
    color: '#4a2f2f',
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },

  title2: {
    fontSize: 22,
    color: '#4a2f2f',
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 100
  },
  sectionTitle: {
    fontSize: 24,
    color: '#111',
    textAlign: 'center',
    margin: 8,
  },
  card: {
    backgroundColor: '#fff6fa',
    borderRadius: 12,
    padding: 10,
    alignItems: 'flex-start',
    margin: 6,
  },
  text: {
    fontSize: 16,
    color: '#222',
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#f9c5c8',
    width: '80%',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#4a2f2f',
    fontWeight: '600',
  },
  buttonText2: {
    fontSize: 16,
    fontWeight: "600",
    color: '#000',
    marginBottom: 10,
    alignItems: 'center',

  },
})