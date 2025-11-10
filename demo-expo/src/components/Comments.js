import React, { Component } from "react";
import { View, Text, StyleSheet } from 'react-native';

export default class Comentarios extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>{this.props.data.user}: {this.props.data.descripcion}</Text>
      </View>
    );
  }
}
