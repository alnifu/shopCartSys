import React from "react";
import { View, Text, FlatList, StyleSheet, Pressable, Alert } from "react-native";
import { Props } from "../navigation/props";
import { useGrocery } from "../contexts/GroceryContext";




const CartScreen: React.FC<Props> = ({ navigation }) => {
    const { cart, updateCartQuantity, clearCart } = useGrocery();

    const confirmClearCart = () => {
        Alert.alert(
            "Clear Cart",
            "Are you sure you want to remove all items from the cart?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Clear", onPress: clearCart, style: "destructive" },
            ]
        );
    };

    const handleQuantityChange = (id: number, change: number) => {
        updateCartQuantity(id, change);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cart</Text>
            {cart.length === 0 ? (
                <Text style={styles.emptyText}>Your cart is empty.</Text>
            ) : (
                <FlatList
                    data={cart}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text>₱{(item.price * item.cartQuantity).toFixed(2)}</Text>
                            </View>
                            <View style={styles.quantityControls}>
                                <Pressable onPress={() => handleQuantityChange(item.id, -1)} style={styles.button}>
                                    <Text style={styles.buttonText}>-</Text>
                                </Pressable>
                                <Text>{item.cartQuantity}</Text>
                                <Pressable
                                    onPress={() => item.cartQuantity < item.quantity && handleQuantityChange(item.id, 1)}
                                    style={[styles.button, item.cartQuantity >= item.quantity && styles.disabledButton]}
                                >
                                    <Text style={styles.buttonText}>+</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                />
            )}
            <Pressable
                style={[styles.checkoutButton, cart.length === 0 && styles.disabledButton]}
                onPress={() => navigation.navigate("Checkout")}
                disabled={cart.length === 0}
            >
                <Text style={styles.buttonText}>Proceed to Checkout</Text>
            </Pressable>
            <Pressable
                style={[styles.clearButton, cart.length === 0 && styles.disabledButton]}
                onPress={confirmClearCart}
                disabled={cart.length === 0}
            >
                <Text style={styles.buttonText}>Clear Cart</Text>
            </Pressable>
        </View>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    emptyText: {
        fontSize: 16,
        color: "gray",
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
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
    quantityControls: {
        flexDirection: "row",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#F7B733",
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    disabledButton: {
        backgroundColor: "gray",
    },
    checkoutButton: {
        backgroundColor: "green",
        paddingVertical: 15,
        width: "100%",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20,
    },
    clearButton: {
        backgroundColor: "red",
        paddingVertical: 15,
        width: "100%",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 10,
    },

});