import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList,Pressable } from 'react-native';
import { db } from '../firebase/config';
import Post from '../components/Post';


export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      postsRecuperados: []
    }
  }

  componentDidMount(){
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
          keyExtractor={item => item.id}
          renderItem={({item}) => <Post data={item.data} id={item.id} navigation={this.props.navigation}/>}/>
         
        </View>
        
      </View>
    )
  }
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    paddingTop: 40,
   
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginBottom: 10,
  },
  
  formContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    
  },
  
})