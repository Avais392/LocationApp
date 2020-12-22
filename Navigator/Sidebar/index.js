import { AsyncStorage, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';
import RNExitApp from 'react-native-exit-app';
import React from 'react';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Login' })],
});
function Item({ item, navigate }) {
    return (
        <TouchableOpacity style={styles.listItem} onPress={() => navigate()}>
            <Ionicons name={item.icon} size={15} />
            <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
    );
}

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            routes: [
                {
                    name: "Home",
                    icon: "ios-home"

                },
            ]
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <Image source={require("./assets/profile.jpg")} style={styles.profileImg} /> */}
                <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 10 }}>BlueEast</Text>
                <Text style={{ color: "gray", marginBottom: 10 }}>hello@BlueEast.com</Text>
                {/* <View style={styles.sidebarDivider}></View> */}
                <FlatList
                    style={{ width: "100%", marginLeft: 30 }}
                    data={this.state.routes}
                    renderItem={({ item }) => {
                        return <Item item={item} navigate={() => this.props.navigation.navigate(item.name)} />;
                    }}
                    keyExtractor={item => item.name}
                />
                <Item item={{ name: 'Log Out', icon: 'exit' }} navigate={() => {
                    AsyncStorage.clear()
                    this.props.navigation.dispatch(resetAction);
                }} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingTop: 40,
        alignItems: "center",
        flex: 1

    },
    listItem: {
        height: 60,
        alignItems: "center",
        flexDirection: "row",
    },
    title: {
        fontSize: 18,
        marginLeft: 20
    },
    header: {
        width: "100%",
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20
    },
    profileImg: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginTop: 20
    },
    sidebarDivider: {
        height: 1,
        width: "100%",
        backgroundColor: "lightgray",
        marginVertical: 10
    },
    listItem: {
        height: 60,
        alignItems: "center",
        flexDirection: "row",
    },
    title: {
        fontSize: 12,
        marginLeft: 20
    },
});