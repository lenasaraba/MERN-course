import React, { useEffect, useState, useContext } from "react";
import { Text, View, Button } from "react-native";
import { Icon } from "react-native-vector-icons/FontAwesome";
import FormContainer from "../../../Shared/Form/FormContainer";
import Input from "../../../Shared/Form/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { connect } from "react-redux";
import { Menu, Button as Button2, Text as Text2 } from "react-native-paper";
import AuthGlobal from "../../../Context/store/AuthGlobal";
import Toast from "react-native-toast-message";

const countryList = require("../../../assets/countries.json");

const Checkout = (props) => {
  const [orderItems, setOrderItems] = useState();
  const [address, setAdress] = useState();
  const [address2, setAdress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [user, setUser] = useState();

  const context = useContext(AuthGlobal);

  useEffect(() => {
    setOrderItems(props.cartItems);

    if (context.stateUser.isAuthenticated) {
      console.log("sub " + context.stateUser.user.userId);
      setUser(context.stateUser.user.userId);
    } else {
      props.navigation.navigate("Cart");
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please login to checkout",
        text2: "",
      });
    }

    return () => {
      setOrderItems();
    };
  }, []);

  const checkout = () => {
    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      status: "3",
      user,
      zip,
    };

    props.navigation.navigate("Payment", { order });
  };

  const [visible, setVisible] = useState(false);
  // const [country, setCountry] = useState(null);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Shipping Address"}>
        <Input
          placeholder={"Phone"}
          name={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Shipping Address 1"}
          name={"ShippingAddress1"}
          value={address}
          onChangeText={(text) => setAdress(text)}
        />
        <Input
          placeholder={"Shipping Address 2"}
          name={"ShippingAddress2"}
          value={address2}
          onChangeText={(text) => setAdress2(text)}
        />

        <Input
          placeholder={"City"}
          name={"city"}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={"Zip Code"}
          name={"zip"}
          value={zip}
          keyboardType={"numeric"}
          onChangeText={(text) => setZip(text)}
        />

        {/* <Item picker>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
            style={{width:undefined1

            }}
            selectedValue={country}
            placeholder="Select your country"
            placeholderSTyle={{color:"#007aff"}}
            placeholderIconColor="#077aff"
            onValueCHange={(e)=>setCountry(e)}
          >
            {countryList.map((c)=>{
return <Picker.Item key={c.code} label={c.name} value={c.name} />;
            })}

          </Picker>
        </Item> */}

        <View style={{ margin: 20 }}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <Button2 mode="outlined" onPress={openMenu}>
                {country || "Select your country"}
              </Button2>
            }
          >
            {countryList.map((c) => (
              <Menu.Item
                key={c.code}
                onPress={() => {
                  setCountry(c.name);
                  closeMenu();
                }}
                title={c.name}
              />
            ))}
          </Menu>

          {country && (
            <Text2 style={{ marginTop: 10 }}>Selected: {country}</Text2>
          )}
        </View>

        <View style={{ width: "80%", alignItems: "center" }}>
          <Button title="Confirm" onPress={() => checkout()} />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  console.log("Cart items: \n", cartItems);
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps)(Checkout);
