import React, { Component } from 'react'
import { View , Text, TextInput, Pressable} from 'react-native'
import firebase from "firebase";
import { db, auth } from '../firebase/config';

export default class Comentarios extends Component {
  constructor(props){
    super(props)
    this.state = {
      comentarios: [],
      post: '',
      comentario: '',
    }
  }
  componentDidMount(){
     const postId = this.props.route.params.id;

     db.collection('posts')
     .doc(postId)
     .onSnapshot((doc) => {
      this.setState({
        post: doc.data(),
        comentarios: data.comentarios ? data.comentarios : [],
      })
     })
  }
  crearComentario() {
    if (this.state.comentario !== "") {
      db.collection("posts")
      .doc(postId)
      .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion({
          user: auth.currentUser.email,
          descripcion: this.state.comentario,
          createdAt: Date.now()
        })
      })
      .then((resp) => this.setState({comentario: ''}))
      .catch((err) => console.log(err));
    }
  }
  
  render() {
    return (
      <View>
        <Text>Agrega tu comentario!</Text>
        <TextInput
          placeholder="Deja tu comentario acá.."
          onChangeText={(text) => this.setState({ comentario: text })}
          keyboardType="default"
          value={this.state.comentario}/>
        <Pressable
          onPress={() => this.crearComentario()}>
          <Text>Enviar Comentario</Text>
        </Pressable>
      </View>
    );
  }
}
