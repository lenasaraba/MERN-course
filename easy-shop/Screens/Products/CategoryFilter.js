import React from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { List, Badge, Text } from "react-native-paper";

const CategoryFilter = (props) => {
  return (
    // <ScrollView
    //   bounces={true}
    //   horizontal={true}
    //   style={{
    //     backgroundColor: "#f2f2f2",
    //   }}
    // >
    //   {/* <List.Item style={{ margin: 0, padding: 0, borderRadius: 0 }}> */}
    //   <TouchableOpacity
    //     key={1}
    //     style={{ margin: 0, padding: 0, borderRadius: 0 }}

    //     //onPress
    //   >
    //     <Badge style={[styles.center, { margin: 5 }]}>
    //       <Text style={{ color: "white" }}>name</Text>
    //     </Badge>
    //   </TouchableOpacity>
    //   {/* </List.Item> */}
    // </ScrollView>

    <ScrollView horizontal style={{ backgroundColor: "#f2f2f2", padding: 10 }}>
      <TouchableOpacity
        key={1}
        style={[
          styles.center,
          {
            marginHorizontal: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          },
          props.active == -1 ? styles.active : styles.inactive,
        ]}
        onPress={() => {
          props.categoryFilter("all"), props.setActive(-1);
        }}
      >
        <Text style={{ color: "white" }}>All</Text>
      </TouchableOpacity>
      {props.categories.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.center,
            {
              marginHorizontal: 5,
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            },
            props.active == props.categories.indexOf(item)
              ? styles.active
              : styles.inactive,
          ]}
          onPress={() => {
            props.categoryFilter(item.id),
              props.setActive(props.categories.indexOf(item));
          }}
        >
          <Text style={{ color: "white" }}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#03bafc",
  },
  inactive: {
    backgroundColor: "#a0e1eb",
  },
});

export default CategoryFilter;
