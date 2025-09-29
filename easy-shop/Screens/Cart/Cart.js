import {
  View,
  Dimensions,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
// import {Container, Text, Left, Right, H1, ListItem, Thumbnail, Body} from 'react-native-base';
import {
  Surface,
  Text,
  List,
  Avatar,
  Icon,
  IconButton,
} from "react-native-paper";
import { SwipeListView } from "react-native-swipe-list-view";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
import CartItem from "./CartItem";

var { height, width } = Dimensions.get("window");
const Cart = (props) => {
  var total = 0;
  props.cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });
  return (
    <>
      {props.cartItems.length ? (
        <Surface style={{ height: "100%" }}>
          <Text variant="headlineLarge" style={styles.contentHeader}>
            Cart
          </Text>
          <SwipeListView
            data={props.cartItems}
            renderItem={(data) => {
              return <CartItem item={data} />;
            }}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  // onPress={() => props.removeFromCart(data.item)}
                >
                  <IconButton
                    icon="trash-can" // iz MaterialCommunityIcons
                    size={30}
                    iconColor="white"
                    onPress={() => props.removeFromCart(data.item)}
                    style={{
                      margin: 0,
                      padding: 0,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-100}
          />
          {/* <View style={styles.bottomContainer}>
            <Left>
              <Text style={styles.price}>$ {total}</Text>
            </Left>
            <Right>
              <Button title="Clear" />
            </Right>
            <Right>
              <Button
                title="Checkout"
                onPress={() => props.navigation.navigate("Checkout")}
              />
            </Right>
          </View> */}
          <Surface style={styles.bottomContainer}>
            <Text style={styles.price}>$ {total}</Text>

            <View style={{ flexDirection: "row", gap: 20 }}>
              <Button
                mode="outlined"
                onPress={() => props.clearCart()}
                title="Clear"
              />

              <Button
                mode="contained"
                onPress={() => props.navigation.navigate("Checkout")}
                title="Checkout"
              />
            </View>
          </Surface>
        </Surface>
      ) : (
        <Surface style={styles.emptyContainer}>
          <Text>Looks like your cart is empty.</Text>
          <Text>Add products to your cart to get started.</Text>
        </Surface>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: height - 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    margin: 0,
    padding: 0,
  },
  contentHeader: {
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
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
  // bottomContainer: {
  //   flexDirection: "row",
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   backgroundColor: "white",
  //   elevation: 20,
  // },
  // price: {
  //   fontSize: 15,
  //   margin: 20,
  //   color: "red",
  // },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "white",
    elevation: 4, // Paper koristi elevation za shadow
  },
  price: {
    fontSize: 15,
    marginHorizontal: 10,
    color: "red",
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: "100%",
    width: width / 1.2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
