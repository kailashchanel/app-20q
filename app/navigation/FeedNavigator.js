import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ViewUsersScreen from "../screens/ViewUsersScreen";
import ViewUserDetailsScreen from "../screens/ViewUserDetailsScreen";

const Stack = createStackNavigator();
const FeedNavigator = () => (
  <Stack.Navigator
    initialRouteName="View"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="View" component={ViewUsersScreen} />
    <Stack.Screen name="UserDetails" component={ViewUserDetailsScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
