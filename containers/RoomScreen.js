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
import { useState, useEffect } from "react";

const axios = require("axios");

export default function RoomScreen({ route }) {
    const [data, setData] = useState("");
    const id = route.params.id;
    // console.log(id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://express-airbnb-api.herokuapp.com/rooms/${id}`
                );

                setData(response.data);
                console.log(data);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View>
                <Text>{data.description}</Text>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
    },
});
