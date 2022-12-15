import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import { BackHandler, NativeSyntheticEvent } from "react-native";
import WebView from "react-native-webview";
import { WebViewMessage } from "react-native-webview/lib/WebViewTypes";
import storageService from "../../services/storage.service";

interface CustomWebViewProps {
  url: string | null;
}

export const CustomWebView = ({ url }: CustomWebViewProps) => {
  const [initial, setInitial] = useState<boolean>(false);
  const [cookies, setCookies] = useState<string | null>(null);
  const [currentURI, setURI] = useState<string | null>(url);
  const webviewRef = useRef<WebView | null>(null);
  const backButtonHandler = () => {
    if (webviewRef.current) {
      webviewRef.current.goBack();
      return true;
    }
    return false;
  };
  const getCookies = async () => {
    const res = await storageService.getWebViewCookies();
    setCookies(res);
    console.log("////////////////////");
    setInitial(true);
  };
  const setCookiesToStorage = async (value: string) => {
    if (value !== cookies)
      await storageService.setWebViewCookies(`${cookies}; ${value}`);
  };

  useFocusEffect(
    useCallback(() => {
      console.log(url);
      getCookies();
      BackHandler.addEventListener("hardwareBackPress", backButtonHandler);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
      };
    }, [])
  );
  const CHECK_COOKIE: string = `
  ReactNativeWebView.postMessage(document.cookie);
  window.document.cookie = "${cookies}";
  true;
`;

  const changeUri = (value: string) => {
    if (value !== currentURI) {
      console.log("меняю урлу");
      setURI(value);
    }
  };

  const injectable = () => {
    if (webviewRef.current) webviewRef.current.injectJavaScript(CHECK_COOKIE);
  };

  useFocusEffect(
    useCallback(() => {
      injectable();
    }, [currentURI])
  );

  const onMessage = (event: NativeSyntheticEvent<WebViewMessage>) => {
    const { data } = event.nativeEvent;
    setCookiesToStorage(data);
  };
  return (
    <>
      <>
        {url && initial && (
          <WebView
            onMessage={onMessage}
            ref={(value) => (webviewRef.current = value)}
            sharedCookiesEnabled={true}
            thirdPartyCookiesEnabled={true}
            onLoadProgress={({ nativeEvent }) => changeUri(nativeEvent.url)}
            source={{
              uri: url,
              Cookies: cookies,
            }}
            injectedJavaScriptBeforeContentLoaded={CHECK_COOKIE}
            javaScriptEnabled={true}
          />
        )}
      </>
    </>
  );
};
