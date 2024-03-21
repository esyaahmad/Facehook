import { useState, useContext } from "react";
import { View, Text, TextInput, Pressable, TouchableOpacity } from "react-native";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries/";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";

import * as SecureStore from "expo-secure-store";
import { LoginContext } from "../contexts/LoginContext";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginPage = ({ navigation }) => {
  const { setIsLoggedIn } = useContext(LoginContext);

  const [email, setEmail] = useState("esya@mail.com");
  const [password, setPassword] = useState("123456");
  const [isPasswordShown, setIsPasswordShown] = useState(true);

  const [dispatcher, { data, error, loading }] = useMutation(LOGIN, {
    onCompleted: async (res) => {
      let token = null;
      // console.log(res, 'ini res');
      if (res && res.login && res.login && res.login.token) {
        token = res.login.token;
      }

      console.log("token", token);

      await SecureStore.setItemAsync("token", token);

      setIsLoggedIn(true);
    },
  });

  console.log("Error", error);

  const onLoginPress = async () => {
    // console.log(email, password, 'input email password');

    //cek error dsini ga
    try {
      // console.log({ email, password }, '<<< emai dan password')
      await dispatcher({
        variables: {
          email,
          password,
        },
      });
    } catch (error) {
      console.log(error, "<<< error");
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  // if (!loading && error) {
  //   return <Text style={{}}>Error: Invalid Password</Text>;
  // }

  if (!loading) {
    return (
      <>
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <View style={{ flex: 1, marginHorizontal: 22 }}>
            <View style={{}}>
              <Text
                style={{
                  fontSize: 36,
                  fontWeight: "bold",
                  marginHorizontal: "25%",
                  color: "#4267B2",
                }}
              >
                Facehook
              </Text>
            </View>
            <View style={{ marginVertical: 22 }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  marginVertical: 12,
                  color: "black",
                }}
              >
                Hi, Welcome Back!
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                }}
              >
                Hello again you have been missed!
              </Text>
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                }}
              >
                Email address
              </Text>
              {error && <Text style={{ fontSize: 16, color: "red", marginBottom: 12}}>Invalid Email/Password</Text>}

              <View
                style={{
                  width: "100%",
                  height: 48,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22,
                }}
              >
                <TextInput
                  placeholder="Enter your email address"
                  placeholderTextColor={"black"}
                  keyboardType="email-address"
                  style={{
                    width: "100%",
                  }}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                }}
              >
                Password
              </Text>

              <View
                style={{
                  width: "100%",
                  height: 48,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22,
                }}
              >
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor={"black"}
                  secureTextEntry={isPasswordShown}
                  style={{
                    width: "100%",
                  }}
                  value={password}
                  onChangeText={setPassword}
                />

                <TouchableOpacity
                  onPress={() => setIsPasswordShown(!isPasswordShown)}
                  style={{
                    position: "absolute",
                    right: 12,
                  }}
                >
                  {isPasswordShown == true ? <Ionicons name="eye-off" size={24} color={"black"} /> : <Ionicons name="eye" size={24} color={"black"} />}
                </TouchableOpacity>
              </View>
            </View>

            <Button
              title="Login"
              filled
              style={{
                marginTop: 18,
                marginBottom: 4,
              }}
              onPress={onLoginPress}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginVertical: 22,
              }}
            >
              <Text style={{ fontSize: 16, color: "black" }}>Don't have an account?</Text>
              <Pressable onPress={() => navigation.navigate("Register")}>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#4267B2",
                    fontWeight: "bold",
                    marginLeft: 6,
                  }}
                >
                  Register Here
                </Text>
              </Pressable>
            </View>
          </View>

          {/* <Text style={styles.text}>Login Page</Text>
          {error && <Text style={styles.textError}>Invalid Email/Password</Text>}

          // !! data is dynamic, so we cannot use console log, 
          {data && <Text>{JSON.stringify(data, null, 2)}</Text>}
          <TextInput style={styles.input} placeholder="Email" secureTextEntry={true} keyboardType="email-address" value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} keyboardType="visible-password" value={password} onChangeText={setPassword} />
          <Pressable style={styles.button} onPress={onLoginPress}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable> */}
        </SafeAreaView>
      </>
    );
  }
};

export default LoginPage;
