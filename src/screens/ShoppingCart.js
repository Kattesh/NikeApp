import {FlatList, Text, View, StyleSheet, Pressable} from "react-native";

import CartListItem from "../components/CartListItem";
import {useSelector} from "react-redux";
import {selectDeliveryPrice, selectSubtotal, selectTotal} from "../store/cartSlice";

const ShoppingCartTotals = () => {

    const subtotal = useSelector(selectSubtotal)
    const deliveryFee = useSelector(selectDeliveryPrice)
    const total = useSelector(selectTotal)

    return (
        <View style={styles.totalsContainer}>
            <View style={styles.row}>
                <Text style={styles.text}>Subtotal</Text>
                <Text style={styles.text}>{subtotal} $</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.text}>Delivery</Text>
                <Text style={styles.text}>{deliveryFee} $</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.textBold}>Total</Text>
                <Text style={styles.textBold}>{total} $</Text>
            </View>
        </View>
    )
}

const ShoppingCart = () => {

    const cartItems = useSelector((state) => state.cart.items);
    return (
        <>
            <FlatList
                data={cartItems}
                renderItem={({item}) => <CartListItem cartItem={item}/>}
                ListFooterComponent={ShoppingCartTotals}
            />
            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Checkout</Text>
            </Pressable>
        </>
    );
};

const styles = StyleSheet.create({
    totalsContainer: {
        margin: 20,
        paddingTop: 10,
        borderColor: "gainsboro",
        borderTopWidth: 1,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 3,
    },
    text: {
        fontSize: 17,
        color: "gray",
    },
    textBold: {
        fontSize: 17,
        fontWeight: "500",
    },
    button: {
        backgroundColor: 'black',
        position: 'absolute',
        bottom: 30,
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 100,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default ShoppingCart
