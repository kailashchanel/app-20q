import React, {useState} from 'react';
import {NavigationContainer} from "@react-navigation/native"
import AppLoading from 'expo-app-loading';

import AppNavigator from './app/navigation/AppNavigator';
import AuthContext from './app/auth/context';
import authStorage from "./app/auth/storage";
import LoginScreen from './app/screens/LoginScreen';
import { navigationRef } from './app/navigation/rootNavigation';
import navigationTheme from "./app/navigation/navigationTheme";
import OfflineNoticeBar from "./app/components/OfflineNoticeBar";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

    if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <OfflineNoticeBar />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <AppNavigator />: <LoginScreen />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
