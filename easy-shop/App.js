import { LogBox } from "react-native";
import Header from "./Shared/Header";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";

//redux
import { Provider } from "react-redux";
import store from "./Redux/store";

//Context API
import Auth from "./Context/store/Auth";

//Navigators
import Main from "./Navigators/Main";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <PaperProvider>
      <Auth>
        <Provider store={store}>
          <NavigationContainer>
            <Header />
            <Main />
            <Toast
            // ref={(ref) => Toast.setRef(ref)}
            />
          </NavigationContainer>
        </Provider>
      </Auth>
    </PaperProvider>
  );
}
