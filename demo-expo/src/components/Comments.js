import React, { Component } from "react";
import { View, Text, StyleSheet } from 'react-native';

export default class Comentarios extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles1.commentBox}>
        <Text style={styles1.owner}>{this.props.data.user}</Text>
        <Text style={styles1.desc}>{this.props.data.descripcion}</Text>
      </View>
    );
  }
}
const styles1 = StyleSheet.create({
  owner: { fontWeight: "20", fontSize: 12 },
  desc: { color: "#555", marginTop: 4 },
  commentBox: {
    borderWidth: 1,
    borderColor: '#f5b6c2',
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 5,
    marginVertical: 5,
    width: '85%',
    alignSelf: 'center',
  },
});