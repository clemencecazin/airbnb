import React from "react";
import { Image, StyleSheet } from "react-native";

const Logo = ({ size }) => {
    return (
        <Image
            style={size === "small" ? styles.smallLogo : styles.largeLogo}
            source={require("../assets/logo.png")}
            resizeMode="contain"
        />
    );
};

export default Logo;

const styles = StyleSheet.create({
    largeLogo: {
        height: 120,
        width: 120,
    },
    smallLogo: {
        height: 30,
        width: 30,
    },
});
