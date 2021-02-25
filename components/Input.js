import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = ({ placeholder, setFunction, secure }) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            onChangeText={(text) => {
                setFunction(text);
            }}
            secureTextEntry={secure ? true : false}
        />
    );
};

export default Input;

const styles = StyleSheet.create({
    input: {
        fontSize: 20,
        borderBottomColor: "grey",
        borderBottomWidth: 3,
        marginTop: 30,
        height: 40,
    },
});
