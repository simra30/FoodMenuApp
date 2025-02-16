import React, { useState, useContext } from "react";
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { CartContext } from "../context/CartContext";
import Header from "../components/Header";

const ItemDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState("");
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(item, quantity, instructions);
    navigation.navigate("Cart")
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Item Detail"

      />
      <View style={styles.container}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TextInput
          style={styles.input}
          placeholder="Special instructions (optional)"
          value={instructions}
          onChangeText={setInstructions}
        />
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <View style={styles.quantityView} >
            <Text style={styles.quantity}>{quantity}</Text>
          </View>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => setQuantity(Math.min(10, quantity + 1))}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  price: {
    fontSize: 20,
    color: "#888",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
    color: 'white'
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityView: {
    backgroundColor: 'tomato',
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  addToCartButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginTop: 5
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default ItemDetailScreen;