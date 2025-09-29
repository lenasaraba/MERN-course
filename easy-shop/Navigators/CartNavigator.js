import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Cart from "../Screens/Cart/Cart";
import CheckoutNavigator from "./CheckoutNavigator";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutNavigator}
        options={{
          title: "Checkout",
          // headerStyle: {
          //   height: 70,
          // },
          // headerTitleStyle: {
          //   fontSize: 20, // veličina teksta
          //   lineHeight: 24, // sprječava da ga "odsiječe"
          // },
          headerStatusBarHeight: 0, // uklanja prazninu iznad
        }}
      />
    </Stack.Navigator>
  );
}

export default function CartNavigator() {
  return <MyStack />;
}
