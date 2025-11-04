import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { db } from '../firebase/config';
import Post from '../components/Post';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postsRecuperados: []
    }
  }

  componentDidMount() {
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot((docs) => {
      let postsDocs = []

      docs.forEach((doc) => {
        postsDocs.push({
          id: doc.id,
          data: doc.data()
        })
      })

      this.setState({
        postsRecuperados: postsDocs
      })
    })
  }

  render() {
    return (
      <View style={styles1.container}>
        <Text style={styles1.title}>Home</Text>

        <View style={styles1.formContainer}>
          <FlatList
            data={this.state.postsRecuperados}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Post data={item.data} id={item.id} navigation={this.props.navigation} />
            )}
          />
        </View>

      </View>
    )
  }
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7fa',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#000',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f5b6c2',
  },
  flatList: {
    width: '100%',
    marginTop: 15,
  },
  postCard: {
    backgroundColor: '#fffafc',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
  },
  postText: {
    fontSize: 16,
    color: '#3a3a3a',
  },
});