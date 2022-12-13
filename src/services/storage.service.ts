import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
  async develop() {
    await AsyncStorage.removeItem("url");
  }
  async setWebViewCookies(value: string) {
    await AsyncStorage.setItem("cookies", value).catch((error) => {
      console.log(error);
    });
  }
  async getWebViewCookies(): Promise<string> {
    return await AsyncStorage.getItem("cookies")
      .then((res): string => {
        if (res) {
          return res;
        }
        return "";
      })
      .catch((error) => {
        console.log(error);
        return "";
      });
  }
  async getUrlFromStorage(): Promise<string | null> {
    return await AsyncStorage.getItem("url")
      .then((res) => res)
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  async setUrlToStorage(value: string) {
    return await AsyncStorage.setItem("url", value)
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }
}

export default new Storage();
