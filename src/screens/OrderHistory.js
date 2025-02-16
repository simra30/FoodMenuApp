import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";

const OrderHistoryScreen = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedOrders = await AsyncStorage.getItem("orders");
        if (storedOrders) {
          setOrders(JSON.parse(storedOrders));
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);


  
  return (
    <View style={{ flex: 1 }}>
      <Header title="Order History" />
      <View style={styles.container}>
        {orders.length === 0 ? (
          <Text style={styles.emptyText}>No orders found.</Text>
        ) : (
          <FlatList
            data={orders}
            renderItem={({ item }) => (
              <View key={item.id} style={styles.orderItem}>
                <Text style={styles.orderDate}>
                  {new Date(item.date).toLocaleString()}
                </Text>
                <Text style={styles.orderTotal}>Total: ${item.total.toFixed(2)}</Text>
                <FlatList
                  data={item.items}
                  renderItem={({ item }) => (
                    <View key={item.id} style={styles.item}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemQuantity}>x{item.quantity}</Text>
                    </View>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
  orderItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  orderTotal: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  itemName: {
    fontSize: 14,
  },
  itemQuantity: {
    fontSize: 14,
    color: "#888",
  },
});

export default OrderHistoryScreen;