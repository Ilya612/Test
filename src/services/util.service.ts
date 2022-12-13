import NetInfo from "@react-native-community/netinfo";

class Util {
  async checkIsNetworkEnabled() {
    return await NetInfo.fetch().then((res) => res.isConnected);
  }
}
export default new Util();
