import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import colors from "../config/colors";
import Icon from "../components/Icon";
import ListItem from "../components/lists/ListItem";
import Screen from "../components/Screen";
import Text from "../components/Text";
import useAuth from "../auth/useAuth";
import userApi from "../api/user";

function AccountScreen() {
  const {
    user: { name, email },
    logOut,
  } = useAuth();

  const {
    request: loadSocials,
    data: userSocials,
    loading,
    error
  } = useApi(userApi.getMyInfo);

  useEffect(() => {
    loadSocials();
  }, [])

  const renderSocials = () => {
    if (userSocials.length) return (
      <>
        <ListItem 
          title={userSocials[0].socials.snap}
          IconComponent={<Icon name="snapchat" iconColor={colors.black} backgroundColor="#FFFC00" />}
        />
        <ListItem 
          title={userSocials[0].socials.insta}
          IconComponent={<Icon name="instagram" backgroundColor="#dc2743"/>}
        />
      </>
    );
  }

  return (
    <>
    <ActivityIndicator visible={loading}/>
    <Screen style={styles.screen}>
        {error && (
          <>
            <Text>Couldn't retrieve the data.</Text>
            <Button title="Retry" onPress={loadSocials} />
          </>
        )}
      <View style={styles.container}>
        <ListItem
          title={name}
          subTitle={email}
          image={require("../assets/logo.png")}
        />
      </View>
      {renderSocials()}
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      />
    </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
