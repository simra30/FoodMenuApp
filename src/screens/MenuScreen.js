
// import React, { useContext, useState } from "react";
// import { FlatList, TextInput, View, StyleSheet } from "react-native";
// import { MenuContext } from "../context/MenuContext";
// import MenuItem from "../components/MenuItem";

// const MenuScreen = ({ navigation }) => {
//   const { menuItems } = useContext(MenuContext);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Filter menu items based on the search query
//   const filteredItems = menuItems.filter((item) =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const renderItem = ({ item }) => (
//     <MenuItem
//       item={item}
//       onPress={() => navigation.navigate("ItemDetail", { item })}
//     />
//   );

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <TextInput
//         style={styles.searchBar}
//         placeholder="Search menu..."
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//       />

//       {/* FlatList to display filtered menu items */}
//       <FlatList
//         data={filteredItems}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor:'#fff'
//   },
//   searchBar: {
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 16,
//   },
// });

// export default MenuScreen;


import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { MenuContext } from "../context/MenuContext";
import MenuItem from "../components/MenuItem";
import Header from "../components/Header";

const MenuScreen = ({ navigation }) => {
  const { menuItems } = useContext(MenuContext);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default to "All"
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique categories from menu items
  const categories = ["All", ...new Set(menuItems.map((item) => item.category))];

  // Filter menu items based on the selected category and search query
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Render each menu item
  const renderItem = ({ item }) => (
    <MenuItem
      item={item}
      onPress={() => navigation.navigate("ItemDetail", { item })}
    />
  );

  return (
    <View style={{ flex: 1 }}>
    <Header
      title="Home" 
     
    />
    
    <View style={styles.container}>
     
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search menu..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Category Tabs (Horizontal Scroll) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryTabs}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryTab,
              selectedCategory === category && styles.selectedCategoryTab,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryTabText,
                selectedCategory === category && styles.selectedCategoryTabText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* FlatList to display menu items */}
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.menuList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items found.</Text>
        }
      />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 16,
  },
  categoryTabs: {
    flexGrow: 0, 
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 4,
    // flex:1,
    // backgroundColor:"pink",
    height:60
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    
  },
  selectedCategoryTab: {
    backgroundColor: "tomato",
    // marginTop:10
  },
  categoryTabText: {
    fontSize: 16,
    color: "#333",
  },
  selectedCategoryTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  menuList: {
    padding: 16,
    
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
});

export default MenuScreen;