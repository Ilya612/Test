import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Main } from "./main";
import { Spinner, VStack, Text, Center } from "native-base";
import firebaseUtil from "./utils/firebase.util";
import storageService from "./services/storage.service";
import utilService from "./services/util.service";
import { ConnectionPermission } from "./components/ConnectionPermission";
import { CustomWebView } from "./components/WebView/CustomWebView";

const Stack = createStackNavigator();

export default function Navigation() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(null);
  const [showError, setShowError] = useState<string | null>(null);
  const [isPlugOpen, setIsPlugOpen] = useState<boolean>(false);
  const [showPermission, setShowPermission] = useState<boolean>(false);
  const getData = useCallback(async () => {
    setIsLoading(true);
    await storageService.develop();
    const link = await storageService.getUrlFromStorage();
    // console.log("/////////////////");
    // console.log(`link: ${link}`);

    if (link) {
      const isConnected = await utilService.checkIsNetworkEnabled();

      if (isConnected) {
        setUrl(link);
        setIsPlugOpen(false);
        setShowPermission(false);
        setIsLoading(false);
        return;
      }
      setShowPermission(true);
      setIsLoading(false);
      return;
    }
    const res = await firebaseUtil.testOne();

    const isItErrorMessage = firebaseUtil.checkIsItErrorString(res);
    //  console.log(`res: ${res}`);

    if (!isItErrorMessage && res !== "") {
      setShowError(res);
      setIsLoading(false);
      return;
    }
    const isPlugShouldBeShown = await firebaseUtil.checkResult(res);
    // console.log(`isPlugShouldBeShown: ${isPlugShouldBeShown}`);
    setIsPlugOpen(isPlugShouldBeShown);
    if (!res) {
      setIsLoading(false);
      return;
    }
    // console.log(`isPlugShouldBeShown: ${isPlugShouldBeShown}`);
    if (!isPlugShouldBeShown && res) {
      //  console.log("записываю в стор");
      storageService.setUrlToStorage(res);
    }
    setUrl(res);
    setIsLoading(false);
  }, []);
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <>
        <NavigationContainer>
          {showError && (
            <>
              <VStack
                px={5}
                bg={"gray.800"}
                alignContent={"center"}
                flex={1}
                h={"100%"}
                w={"100%"}
              >
                <Center mt={"40%"}>
                  <Text color={"white"}>{showError}</Text>
                </Center>
              </VStack>
            </>
          )}
          {isLoading ? (
            <VStack
              px={5}
              bg={"gray.800"}
              alignContent={"center"}
              flex={1}
              h={"100%"}
              w={"100%"}
            >
              <Spinner mt={"40%"} />
            </VStack>
          ) : showPermission ? (
            <ConnectionPermission />
          ) : (
            <Stack.Navigator
              initialRouteName={isPlugOpen ? "a" : "b"}
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="a">{() => <Main />}</Stack.Screen>
              <Stack.Screen name="b">
                {() => <CustomWebView url={url} />}
              </Stack.Screen>
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </>
    </>
  );
}
