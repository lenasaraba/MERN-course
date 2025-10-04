import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, List, Avatar } from "react-native-paper";

const CartItem = (props) => {
  const data = props.item.item.product;
  const [quantity, setQuantity] = useState(props.item.quantity);

  return (
    <List.Item
      style={styles.listItem}
      key={Math.random()}
      // avatar
      left={(props) => (
        <Avatar.Image
          {...props}
          source={{
            uri: data.image
              ? data.image
              : "https://static1.squarespace.com/static/5a51022ff43b55247f47ccfc/5a567854f9619a96fd6233bb/5b74446c40ec9afbc633e555/1534346950637/Husqvarna+545FR+%282%29.png?format=1500w",
          }}
        />
      )}
      title={data.name}
      right={(props) => <Text {...props}>$ {data.price}</Text>}
    ></List.Item>
  );
};

const styles = StyleSheet.create({
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "white",
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default CartItem;
