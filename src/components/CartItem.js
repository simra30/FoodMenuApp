import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleUpdateQuantity = () => {
    updateQuantity(item.id, quantity);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.instructions}</Text>
      <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => setQuantity(Math.max(1, quantity - 1))}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>    
            <TextInput
          style={styles.quantityInput}
          value={quantity.toString()}
          onChangeText={(text) => setQuantity(Number(text))}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => setQuantity(Math.min(10, quantity + 1))}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.updateButton]}
          onPress={handleUpdateQuantity}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.removeButton]}
          onPress={() => removeFromCart(item.id)}
        >
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth:1,
    borderRadius:10,
    borderBottomColor: "gray",
    backgroundColor:'white',
    marginBottom:7
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#888",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    width: 50,
    textAlign: "center",
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  updateButton: {
    backgroundColor: "#007BFF",
  },
  removeButton: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  roundButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartItem;