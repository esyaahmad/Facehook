import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';
import { GET_POST_ID } from '../queries';
import { useQuery } from '@apollo/client';
import DateConvert from '../components/DateConvert';


const DetailPost = ({ route, navigation }) => {
 const {postId} = route.params
//  console.log(postId);
const { loading, error, data } = useQuery(GET_POST_ID, {
  variables: {postId}
});

const post = data?.findPostById
// console.log(post);


    
     
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
                  {post?.author.username}
                </Text>
    
                <Text
                  style={{
                    fontSize: 12,
                    color: "#9ca1a2",
                  }}
                >
                  {DateConvert(post?.createdAt)} 
                </Text>
              </View>
            </View>
    
    
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                paddingTop: 20,
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1611157817797-ed7184b2a12d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                style={{
                  width: "100%",
                  height: 220,
                  borderRadius: 30,
                }}
                
              >
                
              </Image>
            </View>
              <Text>
                Description: {post?.content}
              </Text>
              <Text>
                Tags: {post?.tags}
              </Text>
          {post?.comments.map((item) => (
            <>
            <Text style={{color:"black"}}>{item.content}</Text>
            <Text>{item.username}</Text>
            </>

            ))}
          </View>
        </>
          
        );
      }
    
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
    });
    

export default DetailPost