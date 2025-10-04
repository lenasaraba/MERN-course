import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
} from "react-native";
import { Surface, Text as PaperText } from "react-native-paper";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
import Toast from "react-native-toast-message";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import TrafficLight from "../../Shared/StyledComponents/TrafficLight";

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvilability] = useState(null);
  const [availabilityText, setAvilabilityText] = useState("");

  useEffect(() => {
    if (props.route.params.item.countInStock == 0) {
      setAvilability(<TrafficLight unavailable></TrafficLight>);
      setAvilabilityText("Unavailable");
    } else if (props.route.params.item.countInStock <= 5) {
      setAvilability(<TrafficLight limited></TrafficLight>);
      setAvilabilityText("Limited Stock");
    } else {
      setAvilability(<TrafficLight available></TrafficLight>);
      setAvilabilityText("Available");
    }

    return () => {
      setAvilability(null);
      setAvilabilityText("");
    };
  }, []);

  return (
    <Surface style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 4 }}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.image
                ? item.image
                : "https://static1.squarespace.com/static/5a51022ff43b55247f47ccfc/5a567854f9619a96fd6233bb/5b74446c40ec9afbc633e555/1534346950637/Husqvarna+545FR+%282%29.png?format=1500w",
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <PaperText variant="headlineLarge" style={styles.contentHeader}>
            {item.name}
          </PaperText>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>

        <View style={styles.availabilityContainer}>
          <View style={styles.availability}>
            <Text style={{ marginRight: 10 }}>
              Availability: {availabilityText}
            </Text>
            {availability}
          </View>
          <Text>{item.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.left}>
          <Text style={styles.price}>${item.price}</Text>
        </View>
        <View style={styles.right}>
          <EasyButton
            primary
            medium
            onPress={() => {
              //on napisao ovo ali nastaje problem jer props sadzi i ovu novu fju additemtocart, a ona nije serializable
              // props.addItemToCart(props);
              //zato koristimo
              props.addItemToCart(item);
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: `${item.name} added to Cart`,
                text2: "Go to your cart to complete order",
              });
            }}
          >
            <Text style={{ color: "white" }}>Add</Text>
          </EasyButton>
        </View>
      </View>
    </Surface>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) => {
      dispatch(actions.addToCart({ quantity: 1, product }));
    },
  };
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
    elevation: 0, // uklanja sjenu
    backgroundColor: "transparent", // nema default pozadine
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: "red",
  },
  left: {
    flex: 1, // zauzima lijevu stranu
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 0,
  },
  right: {
    flex: 1, // zauzima lijevu stranu
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 2,
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  availability: {
    flexDirection: "row",
    marginBottom: 10,
  },
});

export default connect(null, mapDispatchToProps)(SingleProduct);
