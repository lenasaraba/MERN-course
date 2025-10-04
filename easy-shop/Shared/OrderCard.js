import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import TrafficLight from "./StyledComponents/TrafficLight";
import EasyButton from "./StyledComponents/EasyButton";
import Toast from "react-native-toast-message";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../assets/common/baseURL";

import {
  Button,
  Menu,
  Divider,
  Provider,
  Text as PaperText,
} from "react-native-paper";

const codes = [
  { name: "pending", code: "3" },
  { name: "shipped", code: "2" },
  { name: "delivered", code: "1" },
];

const OrderCard = (props) => {
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useEffect(() => {
    if (props.editMode) {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));
    }

    if (props.status == "3") {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText("pending");
      setCardColor("#e74c3c");
    } else if (props.status == "2") {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText("shipped");
      setCardColor("#f1c40f");
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setStatusText("delivered");
      setCardColor("#2ecc71");
    }

    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    };
  }, []);

  const updateOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const order = {
      city: props.city,
      country: props.country,
      dateOrdered: props.dateOrdered,
      id: props.id,
      orderItems: props.orderItems,
      phone: props.phone,
      shippingAddress1: props.shippingAddress1,
      shippingAddress2: props.shippingAddress2,
      status: statusChange,
      totalPrice: props.totalPrice,
      user: props.user,
      zip: props.zip,
    };
    // const fixedOrder = {
    //   ...order,
    //   orderItems: order.orderItems.map((item) => {
    //     console.log("item         ", item);
    //     return {
    //       product: item.product.id, // uzmi samo ID
    //       quantity: item.quantity,
    //     };
    //   }),
    // };

    axios
      .put(`${baseURL}orders/${props.id}`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order updated",
            text2: "",
          });
          setTimeout(() => {
            props.navigation.navigate("Products");
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
    <View style={[{ backgroundColor: cardColor }, styles.container]}>
      <View style={styles.container}>
        <Text>Order Number: #{props.id}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>
          Status:{statusText} {orderStatus}
        </Text>

        <Text>
          Address:{props.shippingAddress1} {props.shippingAddress2}
        </Text>
        <Text>City:{props.city}</Text>
        <Text>Country:{props.country}</Text>
        <Text>Date ordered:{props.dateOrdered.split("T")[0]}</Text>
        <View style={styles.priceContainer}>
          <Text>Price: </Text>
          <Text style={styles.price}>${props.totalPrice}</Text>
        </View>

        {/* <Picker
            mode="dropdown"
            iosIcon={<Icon color={"#007aff"} name={"arrow-down"}/>}
            style={{width:undefined}}
            selectedValue={statusChange}
            placeholder="Change status"
            placeholderIconColor={{color:"#007aff"}}
            onValueChange={(e)=>setStatusChange(e)}
        >
            {codes.map((c)=>{
                return (
                    <Picker.Item key={c.code} label={c.name} value={c.code}/>
                )
            })}

        </Picker> */}
        {props.editMode ? (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <Button mode="outlined" onPress={openMenu}>
                  {statusChange
                    ? codes.find((c) => c.code === statusChange)?.name
                    : "Change status"}
                </Button>
              }
            >
              {codes.map((c) => (
                <Menu.Item
                  key={c.code}
                  onPress={() => {
                    setStatusChange(c.code);
                    closeMenu();
                  }}
                  title={c.name}
                />
              ))}
            </Menu>
            <EasyButton secondary large onPress={() => updateOrder()}>
              <Text style={{ color: "white" }}>Update</Text>
            </EasyButton>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    backgroundColor: "#62b1f6",
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  price: {
    color: "white",
    fontWeight: "bold",
  },
});

export default OrderCard;
