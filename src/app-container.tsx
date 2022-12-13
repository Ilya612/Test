import React from "react";
import { NativeBaseProvider } from "native-base";

interface AppContainerProps {
  children: React.ReactNode;
}

export default function AppContainer(props: AppContainerProps) {
  return <NativeBaseProvider>{props.children}</NativeBaseProvider>;
}
