import { initializeApp } from "firebase/app";
import AppContainer from "./src/app-container";

import NavigationContainer from "./src/navigation-container";

export default function App() {
  return (
    <AppContainer>
      <NavigationContainer />
    </AppContainer>
  );
}
