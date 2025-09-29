import React from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions } from "react-native";
import { Avatar, List } from "react-native-paper";

var { width } = Dimensions.get("window");

const SearchProducts = (props) => {
  const { productsFiltered } = props;

  //   console.log(productsFiltered.map((p) => p));

  return (
    <ScrollView style={styles.content}>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => (
          <List.Item
            onPress={() =>
              props.navigation.navigate("Product Detail", { item: item })
            }
            key={item.id}
            left={(props) => (
              <Avatar.Image
                {...props}
                source={{
                  uri: item.image
                    ? item.image
                    : "https://static1.squarespace.com/static/5a51022ff43b55247f47ccfc/5a567854f9619a96fd6233bb/5b74446c40ec9afbc633e555/1534346950637/Husqvarna+545FR+%282%29.png?format=1500w",
                }}
              />
            )}
            title={item.name}
            description={item.description}
          ></List.Item>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: "center" }}>
            No products match the selected criteria.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16, // isto što NativeBase Content radi
    backgroundColor: "#fff",
    width: width,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchProducts;
