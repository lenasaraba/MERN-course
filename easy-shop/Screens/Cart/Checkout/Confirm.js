import React, { act } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/cartActions";
import { formatDiagnostic } from "typescript";
import { Avatar, List, Text } from "react-native-paper";
import Toast from "react-native-toast-message";
import axios from "axios";
import baseURL from "../../../assets/common/baseURL";

var { height, width } = Dimensions.get("window");

const Confirm = (props) => {
  const finalOrder = props.route.params;

  const confirmOrder = () => {
    const order = finalOrder.order.order;

    console.log("Order     ", order);
    const fixedOrder = {
      ...order,
      orderItems: order.orderItems.map((item) => {
        // console.log("item         ", item);
        return {
          product: item.product.id, // uzmi samo ID
          quantity: item.quantity,
        };
      }),
    };
    axios
      .post(`${baseURL}orders`, fixedOrder)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order completed",
            text2: "",
          });
          setTimeout(() => {
            props.clearCart();
            props.navigation.navigate("Cart");
          }, 500);
        }
      })
      .catch((error) => {
        console.log(error);
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong.",
          text2: "Please try again",
        });
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirm Order</Text>
        {props.route.params ? (
          <View style={{ borderWidth: 1, borderColor: "orange" }}>
            <Text style={styles.title}>Shipping to:</Text>
            <View style={{ padding: 8 }}>
              <Text>Address:{finalOrder.order.order.shippingAddress1}</Text>
              <Text>Address2:{finalOrder.order.order.shippingAddress2}</Text>
              <Text>City:{finalOrder.order.order.city}</Text>
              <Text>Zip Code:{finalOrder.order.order.zip}</Text>
              <Text>Country:{finalOrder.order.order.country}</Text>
            </View>
            <Text style={styles.title}>Items:</Text>
            {/* {confirm.order.order.orderItems.map((x) => {
              return (
                <ListItem style={styles.listItem} key={x.product.name} avatar>
                  <Left>
                    <Thumbnail source={{ uri: x.product.image }} />
                  </Left>
                  <Body style={styles.body}>
                    <Left>
                      <Text>{x.product.name}</Text>
                    </Left>
                    <Right>
                      <Text>${x.product.price}</Text>
                    </Right>
                  </Body>
                </ListItem>
              );
            })} */}
            <View>
              {finalOrder.order.order.orderItems.map((x) => (
                <View
                  key={x.product.name}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "white",
                    marginVertical: 5,
                    padding: 10,
                    width: width / 1.2,
                  }}
                >
                  <Avatar.Image size={50} source={{ uri: x.product.image }} />
                  <Text style={{ flex: 1, marginLeft: 10 }}>
                    {x.product.name}
                  </Text>
                  <Text>${x.product.price}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}
        <View style={{ alignItems: "center", margin: 20 }}>
          <Button title={"Place order"} onPress={confirmOrder} />
        </View>
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

const styles = StyleSheet.create({
  container: {
    // height: height,
    flex: 1,
    padding: 8,
    alignContent: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  title: {
    alignSelf: "center",
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    width: width / 1.2,
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default connect(null, mapDispatchToProps)(Confirm);
