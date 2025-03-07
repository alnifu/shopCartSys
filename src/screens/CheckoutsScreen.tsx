import React from "react";
import { View, Text, FlatList, StyleSheet, Alert, Image } from "react-native";
import { Props } from "../navigation/props";
import { useGrocery } from "../contexts/GroceryContext";

const CheckoutScreen: React.FC<Props> = ({ navigation }) => {
    const { cart, groceries, updateCartQuantity, updateGroceryQuantity } = useGrocery();

    const totalCost = cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);

    const handleCheckout = () => {
        cart.forEach((item) => {
            updateGroceryQuantity(item.id, -item.cartQuantity);
            updateCartQuantity(item.id, -item.cartQuantity);
        });
        Alert.alert("Success", "Your purchase was completed!", [{ text: "OK", onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Home' }] }) }]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Checkout</Text>
            <FlatList
                data={cart}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Image style={styles.itemImage} source={item.image} />
                        <Text style={styles.itemName}>{item.name} x {item.cartQuantity}</Text>
                        <Text style={styles.itemText}>₱{(item.price * item.cartQuantity).toFixed(2)}</Text>
                    </View>
                )}
            />
            <Text style={styles.totalText}>Total: ₱{totalCost.toFixed(2)}</Text>
            <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
                <Text style={styles.buttonText}>Confirm Purchase</Text>
            </Pressable>
        </View>
    );
};

export default CheckoutScreen;

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
    totalText: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 20,
    },
    checkoutButton: {
        backgroundColor: "green",
        paddingVertical: 15,
        width: "100%",
        alignItems: "center",
        borderRadius: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});