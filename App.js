import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import RoomScreen from "./containers/RoomScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import AroundMeScreen from "./containers/AroundMeScreen";
import SignUpScreen from "./containers/SignUpScreen";
import SettingsScreen from "./containers/SettingsScreen";
import Logo from "./components/Logo";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    const setToken = async (token) => {
        if (token) {
            AsyncStorage.setItem("userToken", token);
        } else {
            AsyncStorage.removeItem("userToken");
        }

        setUserToken(token);
    };

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            // We should also handle error for production apps
            const userToken = await AsyncStorage.getItem("userToken");

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            setIsLoading(false);
            setUserToken(userToken);
        };

        bootstrapAsync();
    }, []);

    return (
        <NavigationContainer>
            {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
                // No token found, user isn't signed in
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name="SignIn"
                        options={{ animationEnabled: false }}
                    >
                        {() => <SignInScreen setToken={setToken} />}
                    </Stack.Screen>
                    <Stack.Screen name="SignUp">
                        {() => <SignUpScreen setToken={setToken} />}
                    </Stack.Screen>
                </Stack.Navigator>
            ) : (
                // User is signed in
                <Stack.Navigator
                // screenOptions={{
                //     headerBackTitleVisible: false,
                //     headerTintColor: "#fff",
                //     headerTitle: <Logo size="small"></Logo>,
                // }}
                >
                    <Stack.Screen
                        name="Tab"
                        options={{
                            headerStyle: {
                                backgroundColor: "##fff",
                            },
                            headerBackTitleVisible: false,

                            headerTintColor: "#fff",
                        }}
                    >
                        {() => (
                            // Navigation du bas
                            <Tab.Navigator
                                tabBarOptions={{
                                    activeTintColor: "tomato",
                                    inactiveTintColor: "gray",
                                }}
                            >
                                <Tab.Screen
                                    token={userToken}
                                    name="Home"
                                    options={{
                                        tabBarLabel: "Home",
                                        tabBarIcon: ({ color, size }) => (
                                            <Ionicons
                                                name={"ios-home"}
                                                size={size}
                                                color={color}
                                            />
                                        ),
                                    }}
                                >
                                    {() => (
                                        <Stack.Navigator
                                            screenOptions={{
                                                headerTitle: () => (
                                                    <Logo size="small" />
                                                ),
                                            }}
                                        >
                                            <Stack.Screen
                                                name="Home"
                                                // options={{
                                                //     title: "My App",
                                                //     headerStyle: {
                                                //         backgroundColor: "red",
                                                //     },
                                                //     headerTitleStyle: {
                                                //         color: "white",
                                                //     },
                                                // }}
                                            >
                                                {(props) => (
                                                    <HomeScreen {...props} />
                                                )}
                                            </Stack.Screen>

                                            {/* <Stack.Screen
                                                name="Profile"
                                                options={{
                                                    title: "User Profile",
                                                }}
                                            >
                                                {(props) => (
                                                    <ProfileScreen {...props} />
                                                )}
                                            </Stack.Screen> */}

                                            <Stack.Screen name="Room">
                                                {(props) => (
                                                    <RoomScreen {...props} />
                                                )}
                                            </Stack.Screen>
                                            {/* On assigne un nom et on appelle la page en passant les props de la navigation -> suite voir HomeScreen */}
                                        </Stack.Navigator>
                                    )}
                                </Tab.Screen>
                                <Tab.Screen
                                    name="Around me"
                                    options={{
                                        tabBarLabel: "Around me",
                                        tabBarIcon: ({ color, size }) => (
                                            <MaterialCommunityIcons
                                                name="map-marker"
                                                size={24}
                                                color={color}
                                            />
                                        ),
                                    }}
                                >
                                    {() => (
                                        <Stack.Navigator>
                                            <Stack.Screen
                                                name="Around me"
                                                options={{
                                                    title: "Around me",
                                                    tabBarLabel: "Around me",
                                                }}
                                            >
                                                {() => <AroundMeScreen />}
                                            </Stack.Screen>
                                        </Stack.Navigator>
                                    )}
                                </Tab.Screen>
                                <Tab.Screen
                                    name="Settings"
                                    options={{
                                        tabBarLabel: "Settings",
                                        tabBarIcon: ({ color, size }) => (
                                            <Ionicons
                                                name={"ios-options"}
                                                size={size}
                                                color={color}
                                            />
                                        ),
                                    }}
                                >
                                    {() => (
                                        <Stack.Navigator>
                                            <Stack.Screen
                                                name="Settings"
                                                options={{
                                                    title: "Settings",
                                                    tabBarLabel: "Settings",
                                                }}
                                            >
                                                {() => (
                                                    <SettingsScreen
                                                        setToken={setToken}
                                                    />
                                                )}
                                            </Stack.Screen>
                                        </Stack.Navigator>
                                    )}
                                </Tab.Screen>
                            </Tab.Navigator>
                        )}
                    </Stack.Screen>
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}
