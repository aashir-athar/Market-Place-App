import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { colors } from "../utils/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomModal = ({ visible, onDismiss, accessCamera, accessGallery }) => {
  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View
            style={{
              width: "100%",
              gap: 15,
              backgroundColor: colors.tWhite,
              height: 300,
              justifyContent: "center",
              borderRadius: 20,
              borderColor: colors.cyan,
              borderWidth: 1
            }}
          >
            <CustomButton
              style={[
                styles.listButton,
                { width: "35%", backgroundColor: colors.coral },
              ]}
              icon={"camera"}
              func={accessCamera}
            >
              Camera
            </CustomButton>
            <CustomButton
              style={[
                styles.listButton,
                ,
                { width: "35%", backgroundColor: colors.indigo },
              ]}
              icon={"file-image"}
              func={accessGallery}
            >
              Gallery
            </CustomButton>
          </View>
          <TouchableOpacity onPress={onDismiss} style={{position: "absolute", top: 40, right: 40}}>
            <MaterialCommunityIcons name="close" size={40} color={colors.black} />
        </TouchableOpacity>
        </View>
        
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: "100%",
  },
});
