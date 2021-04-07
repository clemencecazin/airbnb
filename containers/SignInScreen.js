import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
    Button,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import { useState } from "react";
import Constants from "expo-constants";
import Logo from "../components/Logo";
import MainTitle from "../components/MainTitle";
import Input from "../components/Input";
import ConnectionButton from "../components/ConnectionButton";
import RedirectButton from "../components/RedirectButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const axios = require("axios");

export default function SignInScreen({ setToken, setId }) {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const loginSubmit = async () => {
        try {
            if (email && password) {
                const response = await axios.post(
                    "https://express-airbnb-api.herokuapp.com/user/log_in",
                    {
                        email: email,
                        password: password,
                    }
                );
                // console.log(response.data);
                // console.log(response.data.id);

                if (response.status === 200) {
                    const userToken = response.data.token;
                    const userId = response.data.id;
                    // console.log(userToken);

                    alert("Success");
                    setToken(userToken);
                    setId(userId);
                }
            } else {
                setErrorMessage("Please fill all fields");
            }
        } catch (error) {
            console.log(error.response);
        }
    };
    //     const userToken = "secret-token";
    //     setToken(userToken);
    // };
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
            >
                <View>
                    <Logo />
                    <MainTitle text="Sign up" />
                    <View>
                        <Input
                            style={styles.input}
                            placeholder="Email"
                            setFunction={setEmail}
                        />

                        <Input
                            placeholder="Password"
                            setFunction={setPassword}
                            secure={true}
                        />

                        {/* <Text>{confirmedPassword}</Text> */}
                        <ConnectionButton
                            text="Sign IN"
                            submitFunction={loginSubmit}
                        />

                        <Text>{errorMessage}</Text>

                        <RedirectButton
                            text="Aller sur écran sign up"
                            screen="SignUp"
                        />

                        {/* <View style={styles.bg}>
                    <Image
                        style={styles.logo}
                        source={require("../assets/logo.png")}
                        resizeMode="contain"
                    />
                    
                    <View>
                        <Text>Email: </Text>
                        <TextInput
                            placeholder="Email"
                            onChangeText={(textEmail) => {
                                setEmail(textEmail);
                                console.log(email);
                            }}
                        />
                        <Text>Password: </Text>
                        <TextInput
                            placeholder="Password"
                            onChangeText={(textPassword) => {
                                setPassword(textPassword);
                                console.log(password);
                            }}
                            secureTextEntry={true}
                        />
                        <Button title="Sign in" onPress={loginSubmit} />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                navigation.navigate("SignUp");
                            }}
                        >
                            <Text>{errorMessage}</Text>
                            <Text>No account ? Register</Text>
                        </TouchableOpacity>*/}
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
    },
    scrollView: {
        marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    },

    scrollViewContent: {
        alignItems: "center",
    },
    logo: {
        width: 100,
        height: 100,
        alignItems: "center",
    },
    button: {
        alignItems: "center",
        padding: 20,
        borderColor: "red",
        borderWidth: 4,
    },
    bg: {
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
    },
});
