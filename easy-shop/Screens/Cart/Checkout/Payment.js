import React, { useState } from "react";
import { View, Button as Button1 } from "react-native";
import {
  Appbar,
  Button,
  List,
  Menu,
  RadioButton,
  Text,
} from "react-native-paper";

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

const paymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "MasterCard", value: 3 },
  { name: "Other", value: 4 },
];

const Payment = (props) => {
  const order = props.route.params;
  console.log("order\n", order);
  const [visible, setVisible] = useState(false);

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  return (
    // <Container>
    //   <Header>
    //     <Body>
    //       <Title>
    //         Choose your payment method
    //       </Title>
    //     </Body>
    //   </Header>

    //   <Content>
    //     {methods.map((item,index)=>{
    //       return(
    //         <ListItem onPress={()=>setSelected(item.value)}>
    //             <Left>
    //               <Text>
    //                 {item.name}
    //               </Text>
    //             </Left>
    //         </ListItem>
    //       )
    //     })}
    //   </Content>
    // </Container>

    <View style={{ flex: 1 }}>
      {/* Header */}
      <Appbar.Header statusBarHeight={0}>
        <Appbar.Content
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          titleStyle={{
            fontSize: 18,
            fontWeight: "bold",
          }}
          title="Choose your payment method"
        />
      </Appbar.Header>

      {/* Content */}
      <View style={{ flex: 1, padding: 10 }}>
        <RadioButton.Group
          onValueChange={(value) => setSelected(value)}
          value={selected}
        >
          {methods.map((item, index) => (
            <List.Item
              key={index}
              title={item.name}
              onPress={() => setSelected(item.value)}
              right={() => (
                <RadioButton
                  value={item.value}
                  status={selected === item.value ? "checked" : "unchecked"}
                />
              )}
            />
          ))}
        </RadioButton.Group>

        {/* {selected==3?(
          <Picker mode="dropdown" iosIcon={<Icon name={"arrow-down"}/>}
          headerStyle={{backgroundColor:"orange"}}
          headerBackButtonTextStyle={{color:"#fff"}}
          headerTitleStyle={{color:"#fff"}}
          selectedValue={card}
          onValueChange={(x)=>setCard(x)}
          >
            {
            paymentCards.map((c,index)=>
                <Picker.Item label={c.name} value={c.name} /> )
            }
            

          </Picker>
        ) : null} */}
        {selected === 3 ? (
          <View style={{ margin: 10 }}>
            <Menu
              visible={visible}
              onDismiss={() => setVisible(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setVisible(true)}
                  contentStyle={{ justifyContent: "space-between" }}
                >
                  {card ? card : "Select a card"}
                </Button>
              }
            >
              {paymentCards.map((c, index) => (
                <Menu.Item
                  key={index}
                  onPress={() => {
                    setCard(c.name);
                    setVisible(false);
                  }}
                  title={c.name}
                />
              ))}
            </Menu>
          </View>
        ) : null}

        <View style={{ marginTop: 60, alignSelf: "center" }}>
          <Button1
            title={"Confirm"}
            onPress={() => props.navigation.navigate("Confirm", { order })}
          />
        </View>
      </View>

      {/* <Content>
       {methods.map((item,index)=>{
          return(
            <ListItem onPress={()=>setSelected(item.value)}>
                <Left>
                  <Text>
                    {item.name}
                  </Text>
                </Left>
                <Right>
                  <Radio selected={selected==item.valie }/>
                </Right>
            </ListItem>
          )
        })}
      </Content> */}
    </View>
  );
};

export default Payment;
