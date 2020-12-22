import * as React from 'react';

import { ActivityIndicator, AsyncStorage, Button, Dimensions, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
});


export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        // alert(props.userLocation)
        this.state = {
            formIncomplete: true,
            name: '',
            email: '',

        };
    }

    componentWillMount() {
        let user = {}

        AsyncStorage.getItem('USER').then((response) => {
            alert(response)
            user = response

        }).catch((error) => {

            alert(error)



        })
        if (!user) return

        if ((user?.email)?.toLowerCase() === 'user@ogc.com' && (user?.password) === '123456') {

            this.props.navigation.dispatch(resetAction);
        }

    }
    updateFormState = () => {
        if (!this.state.password || !this.state.email) {
            this.state.formIncomplete === false ? this.setState({ formIncomplete: true }) : null
            return;
        }

        this.state.formIncomplete === true ? this.setState({ formIncomplete: false }) : null
        return;

    }

    onSave = async () => {
        const user = await AsyncStorage.getItem('USER')

        if ((this.state?.email)?.toLowerCase() === 'user@ogc.com' && (this.state?.password) === '123456') {
            let email = this.state.email?.toLowerCase()
            let password = this.state.password
            AsyncStorage.setItem('USER', {

                email,
                password

            }, error => alert(error)).then(res => alert(JSON.stringify(res))).catch(err => alert(JSON.stringify(err)))
            this.props.navigation.dispatch(resetAction);
        }
        else {
            alert('Either invalid email or password!')
        }
    }
    render() {
        let formIncomplete = (!this.state.password || !this.state.email) ? true : false
        // this.updateFormState()
        if (this.state.loading) {
            return (
                <View style={styles.spinnerView}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <KeyboardAvoidingView >
                        <View style={styles.body}>

                            <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 50 }}>WELCOME ABOARD!</Text>

                            <Text style={{ fontSize: 10, color: "#999" }} >Email</Text>
                            <TextInput value={this.state.email} style={styles.input} onChangeText={email => this.setState({ email })}></TextInput>
                            <Text style={{ fontSize: 10, color: "#999" }}>Password</Text>
                            <TextInput value={this.state.password} style={styles.input} onChangeText={password => this.setState({ password })} secureTextEntry ></TextInput>

                        </View>
                    </KeyboardAvoidingView>
                    <View style={styles.btnContainer}>
                        <Button
                            title="Start Application"
                            disabled={formIncomplete}
                            onPress={this.onSave}
                        >
                        </Button>
                    </View>

                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        padding: 20
    },
    body: {

    },
    input:
        { padding: 5, marginBottom: 20, borderColor: '#ddd', borderWidth: 1 },
    btnContainer: {
        bottom: 50,
        position: 'absolute',
        width: '100%',
        alignSelf: 'center'
    }


});