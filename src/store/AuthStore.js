import * as SecureStore from "expo-secure-store";

const storeAuthToken = async (authToken) => {
    try {
        await SecureStore.setItemAsync("authToken", authToken);
        console.log("Success!");
    } catch (error) {
        console.log(error);
    }
}

const getAuthToken = async () => {
    try {
        const response = await SecureStore.getItemAsync("authToken");
        return response;
    } catch (error) {
        console.log(error);
    }
}

const removeAuthToken = async () => {
    try {
        await SecureStore.deleteItemAsync("authToken");
        console.log("Successfully deleted!");
    } catch (error) {
        console.log(error);
    }
}

export default { storeAuthToken, getAuthToken, removeAuthToken }