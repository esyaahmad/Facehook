import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity, ScrollView } from "react-native";
import { REGISTER } from "../queries";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(true);

  const [dispatcher, { data, error, loading }] = useMutation(REGISTER, {
    onCompleted: async (res) => {
      navigation.navigate("Login");
    },
  });
  const onRegisterPress = async () => {
    // console.log(email, password, username, name);
    await dispatcher({
      variables: {
        payload: {
          email,
          password,
          username,
          name,
        },
      },
    });
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!loading) {
    return (
      <>
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <ScrollView>
            <View style={styles.container}>
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
                    color: "#222222",
                  }}
                >
                  Create Account
                </Text>

                <Text
                  style={{
                    fontSize: 16,
                    color: "#222222",
                  }}
                >
                  Connect with your friend today!
                </Text>
              {error && <Text style={{ fontSize: 16, color: "red", marginBottom: 12}}>Your Info cannot be Empty & Password at least 5 characters length</Text>}

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

                <View
                  style={{
                    width: "100%",
                    height: 48,
                    borderColor: "#222222",
                    borderWidth: 1,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 22,
                  }}
                >
                  <TextInput
                    placeholder="Enter your email address"
                    placeholderTextColor="#222222"
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
                  Username
                </Text>

                <View
                  style={{
                    width: "100%",
                    height: 48,
                    borderColor: "#222222",
                    borderWidth: 1,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 22,
                  }}
                >
                  <TextInput
                    placeholder="Enter your username"
                    placeholderTextColor="#222222"
                    keyboardType="email-address"
                    style={{
                      width: "100%",
                    }}
                    value={username}
                    onChangeText={setUsername}
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
                  Full Name
                </Text>

                <View
                  style={{
                    width: "100%",
                    height: 48,
                    borderColor: "#222222",
                    borderWidth: 1,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 22,
                  }}
                >
                  <TextInput
                    placeholder="Enter your full name"
                    placeholderTextColor="#222222"
                    keyboardType="email-address"
                    style={{
                      width: "100%",
                    }}
                    value={name}
                    onChangeText={setName}
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
                    borderColor: "#222222",
                    borderWidth: 1,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 22,
                  }}
                >
                  <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor="#222222"
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
                    {isPasswordShown == true ? <Ionicons name="eye-off" size={24} color="#222222" /> : <Ionicons name="eye" size={24} color="#222222" />}
                  </TouchableOpacity>
                </View>
              </View>

              <Button
                title="Sign Up"
                filled
                style={{
                  marginTop: 18,
                  marginBottom: 4,
                }}
                onPress={onRegisterPress}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginVertical: 22,
                }}
              >
                <Text style={{ fontSize: 16, color: "#222222" }}>Already have an account?</Text>
                <Pressable onPress={() => navigation.navigate("Login")}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#4267B2",
                      fontWeight: "bold",
                      marginLeft: 6,
                    }}
                  >
                    Login
                  </Text>
                </Pressable>
              </View>

              {/* <Text style={styles.text}>Register Page</Text>
          {data && <Text>{JSON.stringify(data, null, 2)}</Text>}
          <TextInput style={styles.input} placeholder="Email" secureTextEntry={true} keyboardType="email-address" value={email} onChangeText={setEmail} />
          <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <Pressable style={styles.button} onPress={onRegisterPress}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onLoginPress}>
          <Text>Login Here</Text>
        </Pressable> */}
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 22,
    marginTop: 36,
  },
});
