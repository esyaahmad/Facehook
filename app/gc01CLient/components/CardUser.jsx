import { useMutation } from "@apollo/client";
import { Image, ImageBackground, Pressable, Text, TouchableHighlight, View } from "react-native";
import { FOLLOW } from "../queries";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";


const CardUser = ({post, navigation, refetch}) => {
    const [follow, setFollow] = useState(false)
  const [dispatcher, { data, error, loading }] = useMutation(FOLLOW)
  async function handleFollow (followingId) {
    // console.log(data);

    await dispatcher({
      variables: {
        followingId
      }
    })
    if(data?.follow.message === "success following") {
      setFollow(false)
    } else if (data?.follow.message === "Unfollowed") {
      setFollow(true)
    }
    refetch()
    // navigation?.navigate("DetailPost", {userId: post._id })
  }
  

    return(
        <>
        <View style={{backgroundColor:"white"}}>
        <View
          style={{
            flexDirection: "row",
            paddingTop: 25,
            alignItems: "center",
          }}
        >
          <View style={{ width: "20%" }}>
            <Image
              src="https://source.unsplash.com/100x100/?portrait"
              style={{
                width: 45,
                height: 45,
                borderRadius: 13,
              }}
            />
          </View>
          <View
            style={{
              width: "60%",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#044244",
              }}
            >
              {post.name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#9ca1a2",
              }}
            >
              {post.username}
            </Text>
            <Pressable onPress={() => handleFollow(post._id)} style={{ position: "absolute", marginVertical: 15,right:5}}>
              {follow ? <Text>Unfollow <Ionicons name="heart" size={10} color="red" /></Text>: <Text>Follow <Ionicons name="heart-outline" size={10} /></Text>}
            </Pressable>
          </View>
          </View>
          </View>

        </>
    )
}
export default CardUser;
