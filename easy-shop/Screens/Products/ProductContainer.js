import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";
import ProductList from "./ProductList";
import { Appbar, IconButton, Searchbar } from "react-native-paper";
import SearchProducts from "./SearchProducts";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

import baseURL from "../../assets/common/baseURL";
import axios from "axios";

var { height } = Dimensions.get("window");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productCtg, setProductCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setFocus(false);
    setActive(-1);

    //products
    axios.get(`${baseURL}products`).then((res) => {
      setProducts(res.data);
      setProductsFiltered(res.data);
      setProductCtg(res.data);
      setInitialState(res.data);
    });

    //categories
    axios
      .get(`${baseURL}categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log("Api call error");
      });

    //return cisti stanje kada se komponenta unmountuje
    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setCategories([]);
      setActive();
      setInitialState();
    };
  }, []);

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  //Categories
  const changeCtg = (ctg) => {
    {
      ctg == "all"
        ? [setProductCtg(initialState), setActive(true)]
        : [
            setProductCtg(
              products.filter((i) => i.category._id == ctg),
              setActive(true)
            ),
          ];
    }
  };

  return (
    <View style={styles.container}>
      <>
        {/* dodala ja statusbarheight jer ima neki difoltni padding top u suprotnom */}
        <Appbar.Header statusBarHeight={0}>
          {/* <Appbar.BackAction onPress={() => {}} />
          <Appbar.Content title="Moja stranica" />
          <Appbar.Action icon="magnify" onPress={() => {}} /> */}
          <Searchbar
            style={{ paddingTop: 0 }}
            placeholder="Search..."
            onChangeText={(text) => searchProduct(text)}
            // value={searchQuery}
            onFocus={openList}
            right={
              focus
                ? (props) => (
                    <IconButton
                      {...props}
                      icon="close"
                      onPress={onBlur} // ovdje zatvori search ili makni fokus
                    />
                  )
                : null
            }
          />
        </Appbar.Header>
      </>
      {focus == true ? (
        <SearchProducts
          navigation={props.navigation}
          productsFiltered={productsFiltered}
        />
      ) : (
        <ScrollView>
          <View>
            <View>
              <Banner />
            </View>
            <View>
              <CategoryFilter
                categories={categories}
                categoryFilter={changeCtg}
                productCtg={productCtg}
                active={active}
                setActive={setActive}
              />
            </View>
            {productCtg.length > 0 ? (
              <View style={styles.listContainer}>
                {productCtg.map((item) => {
                  return (
                    <ProductList
                      navigation={props.navigation}
                      key={item.id}
                      item={item}
                    />
                  );
                })}
              </View>
            ) : (
              <View style={[styles.center, { height: height / 2 }]}>
                <Text>No products found.</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // po potrebi
    // padding: 16,
  },
  listContainer: {
    height: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductContainer;
