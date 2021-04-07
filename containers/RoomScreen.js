import React from "react";
import { useNavigation } from "@react-navigation/core";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import {
    Text,
    View,
    Image,
    ScrollView,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";

const axios = require("axios");

export default function RoomScreen({ route }) {
    const [data, setData] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [displayFullText, setDisplayFullText] = useState(false);

    const id = route.params.id;
    // console.log(id);
    const displayStars = (ratingValue) => {
        const tab = [];

        for (let i = 1; i <= 5; i++) {
            if (ratingValue >= i) {
                tab.push(
                    <Entypo name="star" size={24} color="#f4b33f" key={i} />
                );
            } else {
                tab.push(
                    <Entypo
                        name="star-outlined"
                        size={24}
                        color="#f4b33f"
                        key={i}
                    />
                );
            }
        }

        return tab;
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://express-airbnb-api.herokuapp.com/rooms/${id}`
                );
                console.log(response.data);

                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, []);

    return isLoading ? (
        <ActivityIndicator size="large" color="black" />
    ) : (
        <ScrollView>
            {/* <Button
                    title="Go to Profile"
                    onPress={() => {
                        navigation.navigate("Profile", { userId: 123 });
                    }}
                /> */}

            <View style={styles.containers}>
                <View style={styles.photo}>
                    <Image
                        source={{ uri: data.photos[0].url }}
                        style={styles.annoncePhoto}
                    />
                    <Text style={styles.price}>{data.price} €</Text>
                </View>
                <View style={styles.details}>
                    <View style={styles.titleRating}>
                        <Text style={styles.title} numberOfLines={1}>
                            {data.title}
                        </Text>
                        <View style={styles.rating}>
                            <Text style={styles.stars}>
                                {displayStars(data.ratingValue)}
                            </Text>
                            <Text style={styles.reviews}>
                                {data.reviews} reviews
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Image
                            source={{
                                uri: data.user.account.photo.url,
                            }}
                            style={styles.profil}
                        />
                    </View>
                </View>
                <View>
                    <Text
                        numberOfLines={!displayFullText ? 3 : null}
                        onPress={() => {
                            setDisplayFullText(!displayFullText);
                        }}
                    >
                        {data.description}
                    </Text>
                </View>
            </View>
            <MapView
                style={styles.mapView}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: data.location[1],
                    longitude: data.location[0],
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                <MapView.Marker
                    coordinate={{
                        latitude: data.location[1],
                        longitude: data.location[0],
                    }}
                />
            </MapView>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    containers: {
        alignItems: "center",
        borderBottomColor: "grey",
        marginHorizontal: 30,
    },
    photo: {
        position: "relative",
    },
    annoncePhoto: { height: 250, width: 400 },
    price: {
        position: "absolute",
        bottom: 10,
        color: "white",
        padding: 12,
        backgroundColor: "#000",
        fontSize: 20,
        width: 90,
        textAlign: "center",
    },
    details: {
        flexDirection: "row",
        height: 100,
        justifyContent: "space-between",
        marginTop: 20,
        alignItems: "center",
    },
    titleRating: {
        flex: 1,
    },
    profil: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginLeft: 10,
    },
    rating: {
        flexDirection: "row",
        paddingVertical: 20,
    },
    reviews: {
        color: "grey",
        paddingVertical: 5,
        paddingLeft: 5,
    },
    title: {
        fontSize: 18,
    },

    mapView: {
        width: "100%",
        height: 300,
        marginTop: 30,
    },
});
