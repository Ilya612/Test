import remoteConfig from "@react-native-firebase/remote-config";
import { getCarrierNameAsync } from "expo-cellular";
import * as Device from "expo-device";
import { defaultRemoteConfig, FETCH_INTERVAL } from "../configs/firebaseConfig";

class FireBase {
  async fetchRemoteConfig() {
    remoteConfig().setDefaults(defaultRemoteConfig);
    const fetch = remoteConfig().fetch(FETCH_INTERVAL);
    return await fetch
      .then(() => {
        remoteConfig().fetchAndActivate();
      })
      .then(() => {
        return remoteConfig().getAll();
      })
      .then((snapshot) => {
        console.log(snapshot);
        return snapshot.url.asString();
      })
      .catch((error) => {
        console.log(error);

        return error?.message;
      });
  }

  checkIsItErrorString(value: string) {
    const urlPattern =
      /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    return urlPattern.test(value);
  }
  async checkResult(value: string | null): Promise<boolean> {
    //console.log(`value: ${value}`);
    //console.log(value === "");
    //console.log(`value: ${value}`);
    const isDivice = Device.isDevice;
    const isSim = await getCarrierNameAsync();
    // console.log(`isDivice: ${isDivice}`);
    // console.log(`isSim: ${isSim}`);
    if (!isSim || !isDivice || value === "") {
      return true;
    }
    return false;
  }
}

export default new FireBase();
