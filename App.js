import * as React from 'react';

import { ActivityIndicator, AsyncStorage, Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppNavigator from './Navigator'
import MapView from 'react-native-maps';
import { createAppContainer } from 'react-navigation'

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  constructor(props) {
    super(props);

  }

  async componentWillMount() {
    await AsyncStorage.setItem('user', 'AVais')
    let user = await AsyncStorage.getItem('user')
    alert(JSON.stringify(user))
  }

  render() {
    return <AppContainer />
  }

}

const styles = StyleSheet.create({
  container: {
    // display: "flex",
    // height: Dimensions.get("screen").height,
    // width: Dimensions.get("screen").width
    flex: 1,
    paddingTop: 10
  },
  map: {
    flex: 1
  },
  mapMarkerContainer: {
    left: '47%',
    position: 'absolute',
    top: '42%'
  },
  mapMarker: {
    fontSize: 40,
    color: "red"
  },
  deatilSection: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    display: "flex",
    justifyContent: "flex-start"
  },
  spinnerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btnContainer: {
    width: Dimensions.get("window").width - 20,
    position: "absolute",
    bottom: 50,
    left: 10
  },
  tabBottom: {
    height: '10%',
    width: '100%',
    backgroundColor: '#AAD8FF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabTitle: {
    fontSize: 15, color: '#fff', fontWeight: 'bold'
  }
});