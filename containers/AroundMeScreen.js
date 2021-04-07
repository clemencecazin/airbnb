import React from "react";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
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
            console.log(status); // granted or denied
            try {
                if (status === "granted") {
                    // console.log("Permission acceptée");

                    // Obtenir les coordonnées GPS
                    const location = await Location.getCurrentPositionAsync();
                    // console.log(location);

                    // On stock les coords dans un state latitude et longitude pour ensuite utiliser ces données afin de centrer la MapView sur la positiob de l'utilisateur
                    // C'est asynchrone alors les states ne sont pas à jour tout de suite
                    setLatitude(location.coords.latitude);
                    setLongitude(location.coords.longitude);

                    // En query on passe le chemin de latitude et longitude car state ne sont pas à jour
                    // On cherche les rooms proche de la localisation de l'utilisateur
                    const response = await axios.get(
                        `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
                    );
                    // console.log(response.data);

                    setData(response.data);

                    // console.log(data);
                } else {
                    const response = await axios.get(
                        `https://express-airbnb-api.herokuapp.com/rooms/around`
                    );
                    console.log(response.data);

                    console.log("Permission refusée");
                }
                setIsLoading(false);
            } catch (error) {
                alert("An error occurred");
                console.log(error.response);
            }
        };

        askPermissionAndGetLocation();
    }, []);

    return isLoading ? ( // step 1
        <ActivityIndicator size="large" color="tomato" /> // step 2
    ) : (
        <View>
            <MapView
                style={styles.mapView}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
                showsUserLocation={true}
            >
                {data.map((item, index) => {
                    // console.log(item.location);
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
        height: "100%",
        width: "100%",
    },
});
