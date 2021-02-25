import React from "react";
import { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
const axios = require("axios");

export default function AroundMeScreen() {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [coords, setCoords] = useState();
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [data, setData] = useState("");

    useEffect(() => {
        const askPermissionAndGetLocation = async () => {
            console.log("Permission");

            // Demande d'autorisation d'accès à la localisation de l'appareil
            const { status } = await Location.requestPermissionsAsync();
            console.log(status);
            try {
                if (status === "granted") {
                    console.log("Permission acceptée");

                    // Obtenir les coordonnées GPS
                    const location = await Location.getCurrentPositionAsync();
                    // console.log(location);
                    setLatitude(location.coords.latitude);
                    setLongitude(location.coords.longitude);

                    const response = await axios.get(
                        `https://express-airbnb-api.herokuapp.com/rooms/around`
                    );
                    console.log(response.data);

                    setData(response.data);

                    // console.log(data);
                    setIsLoading(false);
                } else {
                    console.log("Permission refusée");
                    setError(true);
                }
            } catch (error) {
                console.log(error.response);
            }
        };

        askPermissionAndGetLocation();
    }, []);

    return isLoading ? ( // step 1
        <Text>Chargement...</Text> // step 2
    ) : error ? ( // step 3
        <Text>Permission refusée</Text> // step 4
    ) : (
        <View>
            <MapView
                style={styles.mapView}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 48.856614,
                    longitude: 2.3522219,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                showsUserLocation={true}
            >
                {data.map((item, index) => {
                    console.log(item.location);
                    return (
                        <MapView.Marker
                            key={index}
                            coordinate={{
                                latitude: item.location[1],
                                longitude: item.location[0],
                            }}
                        />
                    );
                })}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    mapView: {
        // height: height,
        // width: width,
        height: 500,
        width: "100%",
    },
});
