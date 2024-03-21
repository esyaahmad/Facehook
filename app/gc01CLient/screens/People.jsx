import { useQuery } from '@apollo/client';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  FlatList
} from 'react-native';
import { GET_USERS } from '../queries';
import CardUser from '../components/CardUser';


const PeoplePage = ({ navigation }) => {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
// console.log(data);

        return (
          <FlatList
          data={data?.getUsers}
          renderItem={({item}) => <CardUser post={item} navigation={navigation} refetch={refetch} />}
          keyExtractor={item => item._id}
        />
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
    

export default PeoplePage