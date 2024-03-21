import { useMutation } from "@apollo/client";
import React, { Component } from "react";
import { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import { ADD_POST, GET_POSTS } from "../queries";
import Button from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";


const AddPostPage = ({ navigation }) => {
    const [content, setContent] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [tags, setTags] = useState("");

    const [dispatcher, { data, error, loading }] = useMutation(ADD_POST,  {
        onCompleted: async (res) => {
        navigation.navigate("Home")
      },
      refetchQueries: [
        GET_POSTS
      ]
    })

    const onPostPress = async () => {
    
        //cek error dsini ga
        try {
          await dispatcher({
            variables: {
                payload: {
                    content,
                    tags,
                    imgUrl,
                  },
            },
          });
        } catch (error) {
          console.log(error, "<<< error");
        }
      };

  return (
    <>
     <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <View style={{ flex: 1, marginHorizontal: 22 }}>
            <View style={{ marginVertical: 22 }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  marginVertical: 12,
                  color: "black",
                }}
              >
                How is Your Day,
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                }}
              >
                what's on your mind?
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
                Content
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
                  placeholder="Write Here"
                  placeholderTextColor={"black"}
                  style={{
                    width: "100%",
                  }}
                  value={content}
                  onChangeText={setContent}
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
                Image Url
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
                  placeholder="Enter your Image url"
                  placeholderTextColor={"black"}
                  style={{
                    width: "100%",
                  }}
                  value={imgUrl}
                  onChangeText={setImgUrl}
                />
              </View>


              <View style={{ marginBottom: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                }}
              >
                Tags
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
                  placeholder="Write Here"
                  placeholderTextColor={"black"}
                  style={{
                    width: "100%",
                  }}
                  value={tags}
                  onChangeText={setTags}
                />
              </View>
            </View>


            </View>

            <Button
              title="Post"
              filled
              style={{
                marginTop: 18,
                marginBottom: 4,
              }}
              onPress={onPostPress}
              
            />

           
          </View>

        </SafeAreaView>
    </>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddPostPage;
