import React from "react";
import {
    Button,
    Text,
    TextInput,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Platform,
} from "react-native";
import { useState } from "react";
import Constants from "expo-constants";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Logo from "../components/Logo";
import MainTitle from "../components/MainTitle";
import Input from "../components/Input";
import LargeInput from "../components/LargeInput";
import ConnectionButton from "../components/ConnectionButton";
import RedirectButton from "../components/RedirectButton";
const axios = require("axios");

export default function SignUpScreen({ setToken, setId }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const submit = async () => {
        // setErroMessage(null);

        if (email && username && description && password && confirmedPassword) {
            if (password === confirmedPassword) {
                try {
                    const response = await axios.post(
                        "https://express-airbnb-api.herokuapp.com/user/sign_up",
                        {
                            email: email,
                            username: username,
                            description: description,
                            password: password,
                        }
                    );

                    if (response.status === 200) {
                        const userToken = response.data.token;
                        const userId = response.data.id;
                        // console.log(userToken);
                        // console.log(userId);

                        // console.log(response.data.id);
                        alert("Success");
                        setToken(userToken);
                        setId(userId);
                    } else {
                        setErrorMessage("An error occurred");
                    }
                } catch (error) {
                    console.log(error.response.data.error);

                    const message = error.response.data.error;

                    if (message === "This email already has an account.") {
                        setErrorMessage(message);
                    } else if (
                        message === "This username already has an account."
                    ) {
                        setErrorMessage(message);
                    }
                }
            } else {
                setErrorMessage("Les 2 MDP doivent etre identiques");
            }
        } else {
            setErrorMessage("Tous les champs doivent être remplis");
        }
    };

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
                        <Text>{email}</Text>
                        <Input
                            placeholder="Username"
                            setFunction={setUsername}
                        />
                        <Text>{username}</Text>
                        <LargeInput
                            placeholder="Description"
                            setFunction={setDescription}
                        />
                        <Text>{description}</Text>
                        <Input
                            placeholder="Password"
                            setFunction={setPassword}
                            secure={true}
                        />
                        <Text>{password}</Text>
                        <Input
                            placeholder="Confirmed Password"
                            setFunction={setConfirmedPassword}
                            secure={true}
                        />
                        <Text>{confirmedPassword}</Text>
                        <ConnectionButton
                            text="Sign UP"
                            submitFunction={submit}
                        />
                        <RedirectButton
                            text="Aller sur écran sign in"
                            screen="SignIn"
                        />
                        {/* <Text>Email: </Text>
                        <TextInput
                            placeholder="Email"
                            onChangeText={(textEmail) => {
                                setEmail(textEmail);
                            }}
                        />
                        <Text>Username: </Text>
                        <TextInput
                            placeholder="Username"
                            onChangeText={(textUsername) => {
                                setUsername(textUsername);
                            }}
                        />
                        <Text>Describe yourself in a few words...</Text>
                        <TextInput
                            multilines={true}
                            numberOfLines={4}
                            placeholder="description"
                            onChangeText={(textDescription) => {
                                setDescription(textDescription);
                            }}
                        />
                        <Text>Password: </Text>
                        <TextInput
                            placeholder="Password"
                            onChangeText={(textPassword) => {
                                setPassword(textPassword);
                            }}
                            secureTextEntry={true}
                        />
                        <Text>Confirmed Password: </Text>
                        <TextInput
                            placeholder="Confirmed Password"
                            onChangeText={(textConfirmedPassword) => {
                                setConfirmedPassword(textConfirmedPassword);
                            }}
                            secureTextEntry={true}
                        /> */}
                        <Text>{errorMessage}</Text>
                        {/* <TouchableOpacity
                            style={styles.button}
                            title="Sign up"
                            onPress={handleSignIn}
                        ></TouchableOpacity> */}
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
    input: {
        padding: 4,
        borderBottomColor: "red",
        borderStyle: "solid",
    },
    button: {
        alignItems: "center",
        padding: 20,
        borderColor: "red",
        borderWidth: 4,
        color: "black",
    },
    bg: {
        backgroundColor: "white",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
