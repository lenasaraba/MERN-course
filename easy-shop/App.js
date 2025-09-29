import { LogBox } from "react-native";
import Header from "./Shared/Header";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

//redux
import { Provider } from "react-redux";
import store from "./Redux/store";

//Navigators
import Main from "./Navigators/Main";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <PaperProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          <Main />
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}
