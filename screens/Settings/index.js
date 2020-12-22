import * as React from 'react';

import { ActivityIndicator, Button, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        // alert(props.userLocation)
        this.state = {
            formIncomplete: true,
            name: '',
            email: '',
            coordinates: props.navigation.getParam('region'),
            address: props.navigation.getParam('userLocation'),
        };
    }

    componentWillMount() {

    }
    updateFormState = () => {
        if (!this.state.name || !this.state.email || !this.state.address || !this.state.coordinates) {
            this.state.formIncomplete === false ? this.setState({ formIncomplete: true }) : null
            return;
        }

        this.state.formIncomplete === true ? this.setState({ formIncomplete: false }) : null
        return;

    }

    onSave = () => {
        alert(JSON.stringify(this.state))
    }
    render() {
        let formIncomplete = (!this.state.name || !this.state.email || !this.state.address || !this.state.coordinates) ? true : false
        if (this.state.loading) {
            return (
                <View style={styles.spinnerView}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>

                    <View style={styles.body}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 50 }}>Settings</Text>
                        <Text style={{ fontSize: 10, color: "#999" }}>Name</Text>
                        <TextInput value={this.state.name} style={styles.input} onChangeText={name => this.setState({ name })}></TextInput>
                        <Text style={{ fontSize: 10, color: "#999" }} >Email</Text>
                        <TextInput value={this.state.email} style={styles.input} onChangeText={email => this.setState({ email })}></TextInput>
                        <Text style={{ fontSize: 10, color: "#999" }}>Co-ordinates</Text>

                        <Text

                            style={styles.input}

                            numberOfLines={4}
                        >{this.state.coordinates}</Text>
                        <Text style={{ fontSize: 10, color: "#999" }}>Address</Text>

                        <Text

                            style={styles.input}

                            numberOfLines={4}
                        >{this.state.address}</Text>
                    </View>
                    <View style={styles.btnContainer}>
                        <Button
                            title="Save Profile"
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