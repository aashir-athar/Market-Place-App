import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "./Screen";
import CustomCard from "../components/CustomCard";
import { colors } from "../utils/colors";
import AuthStore from "../store/AuthStore";
import DB from "../api/DB";

const ListingsScreen = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [serverConnection, setServerConnection] = useState(false);



  // if (serverConnection) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: "center",
  //         alignItems: "center",
  //         gap: 20,
  //       }}
  //     >
  //       <Text style={{ fontSize: 24 }}>Loading...</Text>
  //     </View>
  //   );
  // }

  useEffect(() => {
  
    const getListings = async () => {
      const idToken = await AuthStore.getAuthToken();
      console.log(idToken);
      setServerConnection(prev => !prev);
      const response = await DB.get(`/posts.json?auth=${idToken}`);
      console.log(response);
      if (!response.ok) {
        console.log(response.data.error);
        return;
      }
      const listings = [];
      for (let property in response.data) {
        let newObj = {
          postId: response.data[property].postId,
          date: response.data[property].date,
          image: response.data[property].image,
          title: response.data[property].title,
          price: parseInt(response.data[property].price),
          description: response.data[property].description,
          userId: response.data[property].userId,
          userName: response.data[property].userName,
        };

        listings.push(newObj);
        console.log(newObj.image);
      }
      console.log(listings);
      setData(listings);
      setServerConnection(false);
    };

    getListings();
  }, []);

  return (
    <Screen style={{ backgroundColor: colors.tWhite, paddingHorizontal: 10 }}>
      <FlatList
        style={{ paddingHorizontal: 10 }}
        data={data}
        renderItem={({ item }) => {
          const price = item.price;
          const formattedPrice = (balance) => {
            return balance.toLocaleString("en-US", {
              style: "currency",
              currency: "PKR",
            });
          };

          console.log(formattedPrice(price));
          return (
            <CustomCard
              func={() => {
                navigation.navigate("Card-Details", {
                  postId: item.postId,
                  date: item.date,
                  image: item.image,
                  title: item.title,
                  subtitle: formattedPrice(price),
                  description: item.description,
                  userId: item.userId,
                  name: item.userName,
                });
              }}
              image={item.image}
              title={item.title}
              subtitle={formattedPrice(price)}
            />
          );
        }}
        keyExtractor={(item, index) => item.postId}
      />
    </Screen>
  );
};

export default ListingsScreen;

const styles = StyleSheet.create({});
