import { FlatList, View, Text, StyleSheet, Pressable, Image, ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";

const HomePage = ({ navigation }) => {
  const { loading, error, data,refetch } = useQuery(GET_POSTS);

  const { setIsLoggedIn } = useContext(LoginContext);

  const logoutOnPressHandler = async () => {
    // console.log("Logout Pressed");

    await SecureStore.deleteItemAsync("token");

    setIsLoggedIn(false);
  };


  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!loading && error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!loading && data) {
    // console.log(data.getPosts.content);

    return (
      <>
        <View style={{ borderWidth: 1, margin: 10, borderRadius: 20, backgroundColor: "white" }}>
          <Text
            style={{
              fontSize: 18,
              marginVertical: 20,
              marginLeft:20,
              color: "black",
            }}
            onPress={()=> {navigation.navigate("AddPost")}}
          >
            What's on your mind?
          </Text>
            <Ionicons style={{ position: "absolute", marginVertical: 15,right: 20 }} name="images" size={24} onPress={()=> {navigation.navigate("AddPost")}}/>
        </View>

        <FlatList
        data={data?.getPosts}
        renderItem={({item}) => <Card post={item} navigation={navigation} refetch={refetch} />}
        keyExtractor={item => item._id}
      />


        {/* <View style={styles.container}>
            {data.getPosts.map((post) => (
              <View key={post._id} style={{ height: "50%", borderBottomWidth: 5 }}>
                {post.author.map((author) => (
                  <Text style={{ margin: 5 }}>{author.name}</Text>
                ))}
                <Image style={{ width: "100%", height: 300, resizeMode: "stretch" }} src={post.imgUrl} />
              </View>
            ))}
          </View> */}
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

export default HomePage;
