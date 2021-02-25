import React from "react";
import { Image, StyleSheet } from "react-native";

const Logo = ({ size }) => {
    return (
        <Image
            style={styles.logo}
            source={require("../assets/logo.png")}
            resizeMode="contain"
        />
    );
};

export default Logo;

const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 100,
    },
});
