import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native'
import { db, auth } from '../firebase/config';
import { Component } from 'react';
import firebase from "firebase";


export default class Comentarios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: [],
            posteos: [],
        }
    }
    componentDidMount() {

        db.collection("users").where('email', '==', auth.currentUser.email).onSnapshot((docs) => {
            let usuarioDoc = []
            docs.forEach((doc) => {
                usuarioDoc.push({
                    id: doc.id,
                    email: doc.data().email,
                    user: doc.data().user,
                });
            });
            this.setState({ usuario: usuarioDoc });
            console.log(this.state.usuario);

            db.collection("posts").where('owner', '==', auth.currentUser.email).onSnapshot((docs) => {
                let posteosDoc = []
                docs.forEach((doc) => {
                    posteosDoc.push({
                        id: doc.id,
                        owner: doc.data().owner,
                        createdAt: doc.data().createdAt,
                        post: doc.data().post,
                    });
                });
                this.setState({ posteos: posteosDoc });
                console.log(this.state.posteos);

            });
        });
    }
    eliminarPost(id) {
            db.collection("users")
                .doc(auth.currentUser.email)
                .update({
                    posteos: firebase.firestore.FieldValue.arrayRemove(id),
                })
                .then(() => console.log("Posteo eliminado"))
                .catch((error) => console.log(error));
                
        }
    render() {
        return (
            <View>
                <Text>Usuario:</Text>
                <FlatList
                    data={this.state.usuario}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Text>{item.user}</Text>}
                />
                <Text>Mis Posteos:</Text>
                {this.state.posteos.length != 0 ? (
                    <FlatList
                    data={this.state.posteos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => ( <Text>{item.post}</Text> 
                    )

                }
                />) : (<Text>No hay posteos aun</Text>)}
                <Pressable onPress={() => auth.signOut()}>
                    <Text>Desloguearse</Text>
                </Pressable>
                <Pressable onPress={() => this.eliminarPost(posteo)}>
                      <Text>Eliminar Post</Text>
                </Pressable>
            </View>
        )
    }
}