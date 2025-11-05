import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
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
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.sectionTitle}>Usuario:</Text>
                <FlatList
                    data={this.state.usuario}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <View style={styles.card}><Text style={styles.text}>{item.user}</Text></View>}
                />
                <Text style={styles.sectionTitle}>Mis Posteos:</Text>
                {this.state.posteos.length != 0 ? (
                    <FlatList
                        data={this.state.posteos}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (<View style={styles.card}><Text style={styles.text}>{item.post}</Text></View>
                        )

                        }
                    />) : (<Text>No hay posteos aun</Text>)}
                <Pressable style={styles.boton} onPress={() => auth.signOut()}>
                    <Text style={styles.botonText}>Desloguearse</Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff7fa',
        padding: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#222',
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
    boton: {
        backgroundColor: '#f9c5c8',
        borderRadius: 25,
        padding: 10,
        width: '80%',
        alignItems: 'center',
    },
    botonText: {
        fontSize: 16,
        color: '#000',
    },
});