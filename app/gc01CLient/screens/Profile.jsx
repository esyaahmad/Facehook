import * as SecureStore from "expo-secure-store";
import { useQuery } from '@apollo/client';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button
} from 'react-native';
import {GET_USER_BY_LOGIN } from '../queries';
import CardProfile from '../components/CardProfile';
import { LoginContext } from "../contexts/LoginContext";
import { useContext } from "react";



const ProfilePage = ({ navigation }) => {
  const { setIsLoggedIn } = useContext(LoginContext);

  const logoutOnPressHandler = async () => {
    // console.log("Logout Pressed");

    await SecureStore.deleteItemAsync("token");

    setIsLoggedIn(false);
  };
  const { loading, error, data, refetch } = useQuery(GET_USER_BY_LOGIN);
  // console.log(data.getUserById);

    // if (loading) {
    //     return <Text>Loading...</Text>;
    //   }
    
    //   if (!loading && error) {
    //     return <Text>Error: {error.message}</Text>;
    //   }
    
      
        // console.log(JSON.stringify(data, null, 2));
    
        return (
          <>
{/*           
          <FlatList
          data={data?.getUserById}
          renderItem={({item}) => <CardProfile profile={item} navigation={navigation} />}
          keyExtractor={item => item._id}
        /> */}
          <View style={styles.container}>
            <Text>Ini Profile</Text>
            <StatusBar style="auto" />
            <Button
              title="Logout"
              filled
              style={{
                marginTop: 18,
                marginBottom: 4,
              }}
              onPress={logoutOnPressHandler}
            />
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
    

export default ProfilePage