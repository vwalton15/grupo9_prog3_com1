import React, { Component } from 'react'
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      error: '',
    };
  }
  onSubmit(email, password) {
    console.log("Guardando los valores", { email, password });

    if (!(email.includes("@"))) {
      this.setState({ error: 'Email mal formateado' })
      return
    };
    if (password.length < 6) {
      this.setState({ error: 'La password debe tener al menos 6 caracteres' })
      return
    }

    auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.props.navigation.navigate('TabNavigator')
      })
      .catch(error => {
        this.setState({ error: 'Credenciales inválidas.' })
      })

  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <Pressable
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}>No tenes cuenta? Registrate </Text>
        </Pressable>

        <View style={styles.box}>
          <Text style={styles.title}>Iniciá sesión</Text>

          <TextInput
            style={styles.input}
            keyboardType="default"
            onChangeText={(text) => this.setState({ email: text })}
            value={this.state.email}
            placeholder="email"
          />
          <TextInput
            style={styles.input}
            keyboardType="default"
            onChangeText={(text) => this.setState({ password: text })}
            secureTextEntry={true}
            placeholder="password"
            value={this.state.password}
          />

          <Pressable
            style={styles.button}
            onPress={() => this.onSubmit(this.state.email, this.state.password, this.state.error)}
          >
            <Text style={styles.buttonText}>Inicia sesión</Text>
          </Pressable>
          <Text>{this.state.error}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 12, textAlign: "center" },
  box: { gap: 12, padding: 16, borderWidth: 1, borderColor: "#ddd", borderRadius: 8 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 10 },
  button: { backgroundColor: "#222", padding: 12, borderRadius: 6, marginTop: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600" },
  buttonSecondary: { padding: 10, alignItems: "center" },
  buttonTextSecondary: { color: "#007aff" },
})