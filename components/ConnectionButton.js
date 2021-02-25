import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const ConnectionButton = ({ text, submitFunction }) => {
    return (
        <TouchableOpacity
            style={styles.btn}
            onPress={() => {
                submitFunction();
            }}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

export default ConnectionButton;

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
    },
    btn: {
        height: 50,
        width: "50%",
        borderColor: "red",
        borderWidth: 3,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
});
