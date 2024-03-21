import { useMutation } from "@apollo/client";
import { Image, ImageBackground, Pressable, Text, TouchableHighlight, View } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";


const CardProfile = ({profile, navigation, refetch}) => {
  
  console.log(profile);

    return(
        <>
        <View style={{backgroundColor:"white",}}>
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
              {profile.username}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#9ca1a2",
              }}
            >
              {profile.email}
            </Text>
           
          </View>
          </View>
          </View>

        </>
    )
}
export default CardProfile;
