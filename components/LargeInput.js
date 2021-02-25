import React from "react";
import { TextInput, StyleSheet } from "react-native";

const LargeInput = ({ placeholder, setFunction }) => {
    return (
        <>
            <TextInput
                style={styles.largeInput}
                placeholder={placeholder}
                multiline={true}
                onChangeText={(text) => {
                    setFunction(text);
                }}
            ></TextInput>
        </>
    );
};

export default LargeInput;

const styles = StyleSheet.create({
    largeInput: {
        height: 60,
    },
});
