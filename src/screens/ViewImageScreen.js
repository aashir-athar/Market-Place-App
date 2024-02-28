import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ViewImageScreen = ({ route, navigation }) => {
  const { image } = route.params;

  return (
    <ImageBackground
      style={styles.viewImageContainer}
      resizeMode="contain"
      source={image}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 60,
          right: 20,
        }}
      >
        <MaterialCommunityIcons
          name="close"
          color={"#fff"}
          size={40}
          onPress={() => navigation.goBack()}
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default ViewImageScreen;

const styles = StyleSheet.create({
  viewImageContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
});
