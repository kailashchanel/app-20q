import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import compareApi from "../api/compare";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import Text from "../components/Text";
import useApi from "../hooks/useApi";

function ViewUsersScreen({ navigation }) {
  const {
    request: loadComparisons,
    data: comparisons,
    loading,
    error,
    preConditionFailed,
  } = useApi(compareApi.getAllComparisons);

  // useEffect(() => {
  //   loadComparisons();
  // }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadComparisons();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        {error && (
          <>
            <Text>Couldn't retrieve the data.</Text>
            <Button title="Retry" onPress={loadComparisons} />
          </>
        )}
        {preConditionFailed && (
          <>
            <Text style={styles.text}>
              Take the survey to see your recommendations!
            </Text>
            <Button
              title="Take me to the survey!"
              onPress={() => navigation.navigate(routes.SURVEY)}
            />
            <Button
              color="secondary"
              title="Press me when you're done!"
              onPress={loadComparisons}
            />
          </>
        )}
        {comparisons && (
          <>
            <Text style={styles.text}>Recommended For You</Text>
            <FlatList
              data={comparisons.sort((a, b) => a.percent < b.percent)}
              keyExtractor={(data) => data.userId.toString()}
              renderItem={({ item }) => (
                <Card
                  name={item.name}
                  percent={item.percent}
                  onPress={() => navigation.navigate(routes.DETAILS, item)}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
  text: {
    fontSize: 25,
    marginBottom: 20,
  },
});

export default ViewUsersScreen;
