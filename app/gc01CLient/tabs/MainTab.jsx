import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PeoplePage from "../screens/People";
import HomePage from "../screens/Home";
import ProfilePage from "../screens/Profile";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
const Tab = createMaterialTopTabNavigator();

const TabHolder = () => {
  return (
    <>
    <SafeAreaView>

      <View style={{ backgroundColor: "white" }}>
        <Text
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: "#4267B2",
          }}
        >
          Facehook
        </Text>
      </View>
    </SafeAreaView>

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "HomePage") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "People") {
              iconName = focused ? "people" : "people-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={25} color={color} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarShowLabel: false,
          headerShown: false,
        })}
      >
        <Tab.Screen name="HomePage" component={HomePage} />
        <Tab.Screen name="People" component={PeoplePage} />
        <Tab.Screen name="Profile" component={ProfilePage} />
      </Tab.Navigator>
    </>
  );
};

export default TabHolder;
