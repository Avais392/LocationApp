import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Home from '../screens/Home'
import { Ionicons } from '@expo/vector-icons';
import Login from '../screens/Login'
import React from 'react';
import Settings from '../screens/Settings'
import Sidebar from './Sidebar'
// import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from "react-navigation-stack"

const Drawer = createDrawerNavigator(
    {
        Home: { screen: Home },
        // Profile: { screen: Profile },
        Settings: { screen: Settings }

    },
    {
        initialRouteName: "Home",
        unmountInactiveRoutes: true,
        headerMode: "none",
        contentComponent: props => <Sidebar {...props} />
    }
)

const AppNavigator = createStackNavigator(
    {
        Home: { screen: Drawer },
        Login: { screen: Login }

    },
    {
        initialRouteName: "Login",
        headerMode: "none",
        unmountInactiveRoutes: true
    }
)

export default AppNavigator
