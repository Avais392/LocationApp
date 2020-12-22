import * as React from 'react';

import { ActivityIndicator, Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import MapView from 'react-native-maps';

export default class home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            region: {
                latitude: 10,
                longitude: 10,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            },
            isMapReady: false,
            marginTop: 1,
            userLocation: "",
            regionChangeProgress: false
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                };
                this.setState({
                    region: region,
                    loading: false,
                    error: null,
                });
            },
            (error) => {
                alert(error);
                this.setState({
                    error: error.message,
                    loading: false
                })
            },
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },
        );
    }

    onMapReady = () => {
        this.setState({ isMapReady: true, marginTop: 10 });
    }

    // Fetch location details as a JOSN from google map API
    fetchAddress = () => {
        // alert('k')
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.region.latitude + "," + this.state.region.longitude + "&key=" + "AIzaSyAaEI2emz34shXTHrwCQbRn_y3b_d6WAsg")
            .then((response) => response.json())
            .then((responseJson) => {
                // alert(JSON.stringify(responseJson))
                const userLocation = responseJson.results[0].formatted_address;
                this.setState({
                    userLocation: userLocation,
                    regionChangeProgress: false
                });
            });
    }

    // Update state on region change
    onRegionChange = region => {
        this.setState({
            region,
            regionChangeProgress: true
        }, () => this.fetchAddress());
    }

    // Action to be taken after select location button click
    onLocationSelect = () => alert(JSON.stringify(this.state.region));

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.spinnerView}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <View style={{ flex: 2 }}>
                        {!!this.state.region.latitude && !!this.state.region.longitude &&
                            <MapView
                                style={{ ...styles.map, marginTop: this.state.marginTop }}
                                initialRegion={this.state.region}
                                showsUserLocation={true}
                                onMapReady={this.onMapReady}
                                onRegionChangeComplete={this.onRegionChange}
                            >
                                <MapView.Marker
                                    coordinate={{ "latitude": this.state.region.latitude, "longitude": this.state.region.longitude }}
                                    title={"Your Location"}
                                    draggable
                                />
                            </MapView>
                        }

                        {/* <View style={styles.mapMarkerContainer}>
              <Text style={{ fontFamily: 'fontawesome', fontSize: 42, color: "#ad1f1f" }}>&#xf041;</Text>
            </View> */}
                    </View>
                    <View style={styles.deatilSection}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 20 }}>Move map for location</Text>
                        <Text style={{ fontSize: 10, color: "#999" }}>LOCATION</Text>
                        <Text numberOfLines={2} style={{ fontSize: 14, paddingVertical: 10, borderBottomColor: "silver", borderBottomWidth: 0.5 }}>
                            {!this.state.regionChangeProgress ? this.state.userLocation : "Identifying Location..."}</Text>
                        <View style={styles.btnContainer}>
                            <Button
                                title="PICK THIS LOCATION"
                                disabled={this.state.regionChangeProgress}
                                onPress={this.onLocationSelect}
                            >
                            </Button>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings', { region: JSON.stringify(this.state.region), userLocation: this.state.userLocation })} style={styles.tabBottom}><Text style={styles.tabTitle}>SETTINGS</Text></TouchableOpacity>
                    {/* <View ></View> */}
                </View >
            );
        }
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