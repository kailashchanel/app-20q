import React from "react";
import {
  View,
  StyleSheet
} from "react-native";

import colors from "../config/colors";
import Icon from "../components/Icon";
import ListItem from "../components/lists/ListItem";
import Screen from "../components/Screen";
import Text from "../components/Text";

function ListDetailsScreen({ route }) {
  const user = route.params;

  return (
    <Screen>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>
            {user.name}
          </Text>
          <Text style={styles.subTitle}>
            {user.percent}%
          </Text>
            <ListItem
              IconComponent={<Icon name="snapchat" iconColor={colors.black} backgroundColor="#FFFC00" />}
              title={user.socials.snap}
            />
            <ListItem 
              IconComponent={<Icon name="instagram" backgroundColor="#dc2743"/>}
              title={user.socials.insta}
            />
            <ListItem 
              IconComponent={<Icon name="email"/>}
              title={user.email}
            />
        </View>
      </Screen>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontWeight: "500",
    fontSize: 24,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 20,
    color: colors.secondary,
    marginBottom: 10,
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListDetailsScreen;
