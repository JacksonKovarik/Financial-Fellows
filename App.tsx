import React from "react";
import AppNavigation from "./src/Navigation/AppNavigation";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { LogBox } from "react-native";



function App() {
  LogBox.ignoreLogs(['Warning: ...', 'Error: ...']);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  )
};

export default App;