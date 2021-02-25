import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const RedirectButton = ({ text, screen }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate(screen);
            }}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

export default RedirectButton;

const styles = StyleSheet.create({});
