import React, { useContext, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import Header from "../components/Header";

const CartScreen = ({ navigation }) => {
  const { cart, updateInstructions, updateQuantity, removeFromCart, clearCart } =
    useContext(CartContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add items to place an order.");
      return;
    }
    setIsModalVisible(true);
  };

 


  const confirmOrder = async () => {
    setIsModalVisible(false);
    const order = {
      id: Date.now().toString(), 
      items: cart, 
      total: totalPrice, 
      date: new Date().toISOString(), 
    };
  
    try {
      const existingOrders = await AsyncStorage.getItem("orders");
      const orders = existingOrders ? JSON.parse(existingOrders) : [];
      orders.unshift(order);
  
      await AsyncStorage.setItem("orders", JSON.stringify(orders));
    } catch (error) {
      console.error("Failed to save order:", error);
    }
  
    clearCart(); 
    navigation.navigate("Menuu", { screen: "orderhistory"}); 
  };
  return (
    <View style={{ flex: 1 }}>
      <Header title="Cart" />
      <View style={styles.container}>
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              updateInstructions={updateInstructions}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Your cart is empty.</Text>
          }
        />

        <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>

        <View style={styles.btns}>
          <TouchableOpacity
            style={[styles.button, styles.clearButton]}
            onPress={clearCart}
          >
            <Text style={styles.buttonText}>Clear Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.placeOrderButton]}
            onPress={handlePlaceOrder}
          >
            <Text style={styles.buttonText}>Place Order</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={isModalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirm Order</Text>
              <Text style={styles.modalText}>
                Are you sure you want to place this order?
              </Text>
              <View style={styles.modalButtons}>
                <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
                <Button title="Confirm" onPress={confirmOrder} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  btns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  clearButton: {
    backgroundColor: "#FF3B30",
  },
  placeOrderButton: {
    backgroundColor: "#34C759",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default CartScreen;