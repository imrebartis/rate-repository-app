import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
    this.accessTokenKey = `${this.namespace}:accesstoken`;
  }

  async getAccessToken() {
    try {
      const rawAccessToken = await AsyncStorage.getItem(this.accessTokenKey);
      return rawAccessToken ? JSON.parse(rawAccessToken) : null;
    } catch (error) {
      console.error('Failed to get access token:', error);
      return null;
    }
  }

  async setAccessToken(accessToken) {
    try {
      await AsyncStorage.setItem(
        this.accessTokenKey,
        JSON.stringify(accessToken)
      );
    } catch (error) {
      console.error('Failed to set access token:', error);
    }
  }

  async removeAccessToken() {
    try {
      await AsyncStorage.removeItem(this.accessTokenKey);
    } catch (error) {
      console.error('Failed to remove access token:', error);
    }
  }
}

export default AuthStorage;
