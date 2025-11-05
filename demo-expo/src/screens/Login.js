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
        <Text style={styles.title2}>Login</Text>
        <Text>¿No tenes cuenta? </Text>
        <Pressable
          style={styles.button2}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={styles.buttonText2}>Registrate </Text>
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
    input: { 
        borderWidth: 1, 
        borderColor: '#f9c5c8', 
        borderRadius: 6, 
        padding: 10 ,
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
        width: 280,
        height: 280,
        marginTop: 50
    },
    container: {flex: 1,
    backgroundColor: '#fff7fa',
    padding: 16,
    alignItems: 'center',
    gap: 12,
    },
    title: {
        fontSize: 22,
        color: '#222',
        fontWeight: "600",
        marginBottom: 12, 
        textAlign: "center",
        marginTop: 15
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
        width: '92%',
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
        marginTop: 20,  
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