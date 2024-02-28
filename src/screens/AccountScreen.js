import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // For seamless transitions
import { Entypo, FontAwesome5 } from '@expo/vector-icons'; // For user-friendly icons
import Screen from './Screen';
import CustomCard from '../components/CustomCard';
import AuthContext from '../auth/context';
import CustomButton from '../components/CustomButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AuthStore from '../store/AuthStore'
import { colors } from '../utils/colors';

const AccountScreen = () => {
  const userData = useContext(AuthContext);

  return (
    <Screen style={styles.container}>
      <LinearGradient
        colors={[colors.tWhite, '#fdfbfb']} // Create a gradient background
        style={styles.gradientContainer}
      >
        <View style={styles.header}>
          {/* <Image
            source={{ uri: userData.user[0].avatar }} // Display user's avatar
            style={styles.avatar}
          /> */}
          <Text style={styles.username}>{userData.user[0].name}</Text>
        </View>
        <View style={styles.content}>
          <CustomCard title="Email">
            <Text style={styles.cardText}>{userData.user[0].email}</Text>
          </CustomCard>
          <CustomCard title="Edit Profile">
            <Text style={styles.cardText}>Manage your account details</Text>
            <Entypo
              name="chevron-right"
              size={24}
              color="#aaa"
              style={styles.cardIcon}
            />
          </CustomCard>
          <CustomCard title="Help & Support">
            <Text style={styles.cardText}>Get answers to your questions</Text>
            <MaterialCommunityIcons
              name="chat-question-outline"
              size={24}
              color="#aaa"
              style={styles.cardIcon}
            />
          </CustomCard>
          <CustomButton
            style={styles.logoutButton}
            func={() => {
              userData.setUser(null);
              AuthStore.removeAuthToken();
            }}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </CustomButton>
        </View>
      </LinearGradient>
    </Screen>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the entire screen
    backgroundColor: '#fff', // Set a white background
  },
  gradientContainer: {
    flex: 1, // Make the gradient fill the entire container
    overflow: 'hidden', // Prevent content from clipping
  },
  header: {
    alignItems: 'center',
    justifyContent: "center",
    padding: 20,
    width: "100%"
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35, // Make the avatar circular
    marginRight: 20,
  },
  username: {
    fontSize: 24,
    color: colors.black,
    fontWeight: 'bold',
    textAlign: "center"
  },
  content: {
    marginTop: 40, // Add spacing after the header
    paddingHorizontal: 20,
  },
  cardText: {
    fontSize: 16,
    color: '#aaa',
  },
  cardIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  logoutButton: {
    marginTop: 20, // Add spacing after cards
    backgroundColor: colors.error, // Use a red color for logout
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
