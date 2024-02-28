import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import md5 from "react-native-md5";
import CustomTextInput from "../components/CustomTextInput";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "../components/CustomButton";
import { colors } from "../utils/colors";
import * as ImagePicker from "expo-image-picker";
import CustomModal from "../components/CustomModal";
import { uploadToFirebase } from "../../FirebaseConfig";
import AuthContext from "../auth/context";
import AuthStore from "../store/AuthStore";
import DB from "../api/DB";
import { format } from "date-fns";
import { ProgressBar } from "react-native-paper";
import Screen from "./Screen";
import CustomText from "../components/CustomText";

const AddNewItem = ({ navigation }) => {
  const userData = useContext(AuthContext);
  const [publisherData, setPublisherData] = useState(userData.user[0]);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [newItem, setNewItem] = useState({
    postId: 1000,
    date: new Date(),
    image: "",
    title: "",
    price: "",
    description: "",
    userId: "",
    userName: "",
  });

  if (progress > 0 && progress < 100) {
    return (
      <Screen>
        <ProgressBar
          progress={progress / 100}
          style={{ height: 30, backgroundColor: "rgba(11,79,108, 0.5)" }}
          color={colors.indigo}
          label={`${progress}% Complete`}
        />
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <ActivityIndicator size={100} color={colors.cyan} />
          <CustomText
            style={{ color: colors.coral, fontWeight: "bold", fontSize: 24 }}
          >{`${parseInt(progress)}%`}</CustomText>
          <CustomText
            style={{ color: colors.indigo, fontWeight: "bold", fontSize: 28 }}
          >
            Uploading...
          </CustomText>
        </View>
      </Screen>
    );
  }

  const accessCamera = async () => {
    const request = await ImagePicker.requestCameraPermissionsAsync();
    if (request.granted === false) {
      Alert.alert(
        "Permission denied",
        "You need permission to access camera.",
        [
          {
            text: "Cancel",
            type: "Cancel",
          },
          {
            text: "Open Settings",
            onPress: () => {
              Linking.openSettings();
            },
          },
        ]
      );
      return;
    }

    try {
      const image = await ImagePicker.launchCameraAsync({
        aspect: [4, 3],
        quality: 0.5,
        allowsEditing: true,
      });
      setImage(image.assets[0].uri);
      setNewItem((item) => {
        return {
          ...item,
          image: image.assets[0].uri,
        };
      });
      setModalVisible((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const accessGallery = async () => {
    const request = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (request.granted === false) {
      Alert.alert(
        "Permission denied",
        "You need permission to access gallery.",
        [
          {
            text: "Cancel",
            type: "Cancel",
          },
          {
            text: "Open Settings",
            onPress: () => {
              Linking.openSettings();
            },
          },
        ]
      );
      return;
    }

    try {
      const image = await ImagePicker.launchImageLibraryAsync({
        aspect: [4, 3],
        quality: 0.5,
        allowsEditing: true,
      });
      setImage(image.assets[0].uri);
      setModalVisible((prev) => !prev);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

  const listNewItem = async () => {
    const idToken = await AuthStore.getAuthToken();
    const newDate = new Date();
    const formattedDate = format(newDate, "h:mm - E - MMM dd, yyyy");

    try {
      const fileName = md5.hex_md5(newItem.title);
      const uploadResponse = await uploadToFirebase(image, fileName, (v) =>
        setProgress(v)
      );
      let obj = {
        postId: md5.hex_md5(newItem.title),
        date: formattedDate,
        image: uploadResponse.downloadURL,
        title: newItem.title,
        price: newItem.price,
        description: newItem.description,
        userId: publisherData.id,
        userName: publisherData.name,
      };
      const uniqueFolder = await DB.post(`/posts.json?auth=${idToken}`, obj);
      if (!uniqueFolder.ok) {
        console.log(uniqueFolder.data.error.message);
        return;
      }
    } catch (error) {
      console.log(error.message);
    }
    setImage(null);
    setProgress(0);
    setNewItem({
      postId: 1000,
      date: new Date(),
      image: "",
      title: "",
      price: "",
      description: "",
      userId: "",
      userName: "",
    });
    navigation.goBack();
  };

  return (
    <>
      <ImageBackground
        source={image ? { uri: image } : require("../assets/whiteBG.jpg")}
        style={styles.uploadContainer}
      >
        <CustomModal
          visible={modalVisible}
          onDismiss={() => setModalVisible((prev) => !prev)}
          accessCamera={accessCamera}
          accessGallery={accessGallery}
        />
        <CustomButton
          style={[
            styles.listButton,
            { width: "50%", backgroundColor: colors.cyan },
          ]}
          icon={"upload"}
          func={() => {
            setModalVisible((prev) => !prev);
          }}
        >
          Upload
        </CustomButton>
      </ImageBackground>
      <LinearGradient
        colors={["#fff", colors.tWhite]} // Create a gradient background
        style={styles.gradientContainer}
      >
        <CustomTextInput
          icon={"format-text"}
          placeholder="Enter yout item title"
          keyboardType="default"
          value={newItem.title}
          onChangeText={(title) =>
            setNewItem((item) => {
              return {
                ...item,
                title: title,
              };
            })
          }
        />
        <CustomTextInput
          icon={"cash"}
          placeholder="Enter price of your item"
          keyboardType="numeric"
          value={newItem.price}
          onChangeText={(price) =>
            setNewItem((item) => {
              return {
                ...item,
                price: price,
              };
            })
          }
        />
        <CustomTextInput
          icon={"information-variant"}
          placeholder="Explain about your item..."
          keyboardType="default"
          multiline={true}
          value={newItem.description}
          onChangeText={(description) =>
            setNewItem((item) => {
              return {
                ...item,
                description: description,
              };
            })
          }
        />
        <View style={{ width: "100%" }}>
          <CustomButton style={styles.listButton} func={listNewItem}>
            List
          </CustomButton>
        </View>
      </LinearGradient>
    </>
  );
};

export default AddNewItem;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
    gap: 15,
    width: "100%",
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  uploadContainer: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  listButton: {
    marginTop: 20,
    backgroundColor: colors.indigo,
  },
  listButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});
