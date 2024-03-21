import { useContext } from "react";
import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import { LoginContext } from "../contexts/LoginContext";
import Register from "../screens/Register";
import TabHolder from "../tabs/MainTab";
import AddPostPage from "../screens/AddPost";
import DetailPost from "../screens/DetailPost";

const Stack = createNativeStackNavigator();

const StackHolder = () => {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={TabHolder} options={{ headerShown: false }} />
            <Stack.Screen name="AddPost" component={AddPostPage} options={{ headerShown: false }} />
            <Stack.Screen name="DetailPost" component={DetailPost} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackHolder;
