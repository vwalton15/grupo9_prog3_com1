import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import TabNavigator from './src/navigation/TabNavigator'
import { Component } from 'react';
import { auth } from "./src/firebase/config"

export default class App extends Component{
constructor(props){
  super(props);
  this.state= {
    user: '',
  }
}

componentDidMount(){
  auth.onAuthStateChanged( (user) => { user ? this.setState({user: user}) : this.setState({user: ''})
  })
  
}
 render(){
  return (
    <NavigationContainer>
    {this.state.user ? <TabNavigator /> : <StackNavigator />}
   </NavigationContainer>
  )
 }
  
}

