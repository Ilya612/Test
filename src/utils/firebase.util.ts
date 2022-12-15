import remoteConfig from "@react-native-firebase/remote-config";
import { getCarrierNameAsync } from "expo-cellular";
import * as Device from "expo-device";
import { defaultRemoteConfig, FETCH_INTERVAL } from "../configs/firebaseConfig";

class FireBase {
  async testOne() {
    // return "https://dzen.ru/?yredirect=true";
    return await remoteConfig()
      .setDefaults(defaultRemoteConfig)
      .then(() => remoteConfig().fetchAndActivate())
      .then((fetchedRemotely) => {
        if (fetchedRemotely) {
          console.log("Configs were retrieved from the backend and activated.");
        } else {
          console.log(
            "No configs were fetched from the backend, and the local configs were already activated"
          );
        }
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
  async fetchRemoteConfig() {
    await remoteConfig().setDefaults(defaultRemoteConfig);
    //  const fetch = remoteConfig().fetch(FETCH_INTERVAL);
    return await remoteConfig()
      .fetch(FETCH_INTERVAL)
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

    const access = this.checkDeviceManufacturerAccess(Device.manufacturer);
    const isSim = await getCarrierNameAsync();
    // console.log(`isDivice: ${isDivice}`);
    // console.log(`isSim: ${isSim}`);
    if (!isSim || !isDivice || value === "" || !access) {
      return true;
    }
    return false;
  }
  async checkDeviceManufacturerAccess(value: string | null) {
    if (!value || value.toLowerCase().includes("google")) {
      return false;
    }
    return true;
  }
}

export default new FireBase();
