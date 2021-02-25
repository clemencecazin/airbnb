import React from "react";
import { Text, StyleSheet } from "react-native";

const MainTitle = ({ text }) => {
    return <Text style={styles.text}>{text}</Text>;
};

export default MainTitle;

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: "center",
        color: "#808080",
        fontWeight: "bold",
    },
});
