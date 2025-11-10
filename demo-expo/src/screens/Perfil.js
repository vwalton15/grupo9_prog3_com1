import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import { db, auth } from '../firebase/config';
import { Component } from 'react';
import firebase from "firebase";
import Post from '../components/Post'

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
                        data: doc.data()
                    });
                });
                console.log(posteosDoc, 'aca')
                this.setState({ posteos: posteosDoc });
            });
        });
    }

    render() {
        console.log('state usuario', this.state.usuario)
        return (
            <View style={styles.container}>
                <Text style={styles.sectionTitle}>Mi perfil</Text>
                {
                    this.state.usuario.length > 0 ?
                        <View><Text style={styles.user}> @{this.state.usuario[0].user}</Text></View>
                    : null
                }
                <Text style={styles.sectionTitle2}>Mis Posteos:</Text>

                {this.state.posteos.length > 0 ? (
                    <FlatList
                        data={this.state.posteos}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (<Post data={item.data} id={item.id} />)
                        }
                    />)  : (<Text style={styles.text}>No hay posteos aún</Text>)}
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
        justifyContent: 'flex-start'
    },
    card: {
        backgroundColor: '#fffafc',
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#f5b6c2',
      },
    title: {
        fontSize: 24,
        color: '#222',
    },
    user: {
        fontSize: 27,
        color: '#111',
        textAlign: 'center',
        margin: 8,
        fontWeight: '300',
        fontFamily: 'Georgia',
        
    },
    sectionTitle: {
        fontSize: 30,
        color: '#111',
        textAlign: 'center',
        margin: 8,
        fontWeight: '500',
        marginTop: 60
    },
    sectionTitle2: {
        fontSize: 25,
        color: '#111',
        textAlign: 'center',
        marginBottom: 12,
        fontWeight: '400',
        marginTop: 0
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