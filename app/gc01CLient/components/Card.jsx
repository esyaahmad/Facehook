import { Image, ImageBackground, Pressable, Text, TouchableHighlight, View } from "react-native";
import DateConvert from "./DateConvert";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LIKE_POST } from "../queries";
import { Ionicons } from "@expo/vector-icons";


const Card = ({post, navigation, refetch}) => {
  const [like, setLike] = useState(false)
  const [dispatcher, { data, error, loading }] = useMutation(LIKE_POST)

  // console.log(data);
  async function handleDetail () {
    navigation?.navigate("DetailPost", {postId: post._id })
  }

  async function handleLike (likePostId) {
    // console.log(data);

    await dispatcher({
      variables: {
        likePostId
      }
    })
    if(data?.likePost.message === "Liked Post") {
      setLike(false)
    } else if (data?.likePost.message === "Unliked") {
      setLike(true)
    }
    refetch()
    // navigation?.navigate("DetailPost", {userId: post._id })

  }
  

  return (
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
              {post.author[0]?.name}
            </Text>

            <Text
              style={{
                fontSize: 12,
                color: "#9ca1a2",
              }}
            >
              {DateConvert(post.createdAt)}
            </Text>
          </View>
        </View>

<TouchableHighlight onPress={handleDetail}>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            paddingTop: 20,
          }}
        >
          <Image
            src={post.imgUrl}
            style={{
              width: "100%",
              height: 220,
              borderRadius: 30,
            }}
            
          >
            
          </Image>
        </View>
</TouchableHighlight>

          <View style={{flex:1, justifyContent:"space-around", flexDirection:"row", margin:10}}>
            <Pressable onPress={() => handleLike(post._id)}>
              {like ? <Text>Unlike <Ionicons name="heart" size={10} color="red" /></Text>: <Text>Like <Ionicons name="heart-outline" size={10} /></Text>}
            </Pressable>
            <Text>Comment</Text>
          </View>
      </View>
    </>
  );
};

export default Card;
