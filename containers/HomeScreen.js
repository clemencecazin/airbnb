import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
    Button,
    Text,
    View,
    Image,
    ScrollView,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";

const axios = require("axios");

export default function HomeScreen({ navigation }) {
    const [data, setData] = useState("");
    const [isLoading, setIsLoading] = useState(true);

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
                    "https://express-airbnb-api.herokuapp.com/rooms"
                );

                setData(response.data);
                setIsLoading(false);
                // console.log(data);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, []);

    return isLoading ? (
        <ActivityIndicator size="large" color="black" />
    ) : (
        <View>
            {/* <Button
                    title="Go to Profile"
                    onPress={() => {
                        navigation.navigate("Profile", { userId: 123 });
                    }}
                /> */}

            <FlatList
                data={data}
                renderItem={({ item }) => {
                    // console.log(item.title);
                    // console.log(item.photos);
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Room", {
                                    id: item._id,
                                });
                            }}
                        >
                            <View style={styles.containers}>
                                <View style={styles.photo}>
                                    <Image
                                        source={{ uri: item.photos[0].url }}
                                        style={styles.annoncePhoto}
                                    />
                                    <Text style={styles.price}>
                                        {item.price} €
                                    </Text>
                                </View>
                                <View style={styles.details}>
                                    <View style={styles.titleRating}>
                                        <Text
                                            style={styles.title}
                                            numberOfLines={1}
                                        >
                                            {item.title}
                                        </Text>
                                        <View style={styles.rating}>
                                            <Text style={styles.stars}>
                                                {displayStars(item.ratingValue)}
                                            </Text>
                                            <Text style={styles.reviews}>
                                                {item.reviews} reviews
                                            </Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Image
                                            source={{
                                                uri:
                                                    item.user.account.photo.url,
                                            }}
                                            style={styles.profil}
                                        />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item) => item._id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    containers: {
        borderBottomColor: "#f6f5f5",
        borderBottomWidth: 0.2,
        alignItems: "center",
        borderBottomColor: "grey",
        marginVertical: 10,
        marginHorizontal: 30,
    },
    photo: {
        position: "relative",
    },
    annoncePhoto: { height: 200, width: 380 },
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
        marginTop: 10,
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
});
