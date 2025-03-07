import { FlatList, Image, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Props } from "../navigation/props";
import { useGrocery } from "../contexts/GroceryContext";
import { LinearGradient } from "expo-linear-gradient"; // use react-native-linear-gradient if ain't workin lol

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { groceries, addToCart, cart } = useGrocery();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grocery Store</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={groceries.filter((item) => item.quantity > 0)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const isInCart = cart.some((cartItem) => cartItem.id === item.id);
            return (
              <View style={styles.itemContainer}>
                <Image style={styles.itemImage} source={item.image} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemText}>₱{item.price.toFixed(2)}</Text>
                  <Text style={styles.itemText}>Stock: {item.quantity}</Text>
                </View>
                <Pressable
                  style={[styles.addButton, isInCart && styles.disabledButton]}
                  onPress={() => {
                    if (!isInCart) {
                      addToCart(item);
                    }
                  }}
                  disabled={isInCart}
                >
                  <Text style={styles.addButtonText}>
                    {isInCart ? "In Cart" : "Add to Cart"}
                  </Text>
                </Pressable>
              </View>
            );
          }}
        />
        
        <LinearGradient
          colors={['transparent', '#f8f8f8']}
          style={styles.fade}
          pointerEvents="none"
        />
        
      </View>
      <View>
        <Pressable
          style={[styles.button, cart.length === 0 && styles.disabledButton]}
          onPress={() => cart.length > 0 && navigation.navigate("Cart")}
          disabled={cart.length === 0}
        >
          <Text style={styles.buttonText}>Go to Cart</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
    position: "relative",
  },
  fade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 40, 
  },
  itemContainer: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  itemText: {
    fontSize: 14,
    color: "#555",
  },
  addButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#F7B733",
    minWidth: "30%",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
