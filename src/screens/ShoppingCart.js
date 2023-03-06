import {FlatList, Text, View, StyleSheet, Pressable, ActivityIndicator, Alert} from "react-native";

import CartListItem from "../components/CartListItem";
import {useDispatch, useSelector} from "react-redux";
import {cartSlice, selectDeliveryPrice, selectSubtotal, selectTotal} from "../store/cartSlice";
import {useCreateOrderMutation} from "../store/apiSlice";

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
    const subtotal = useSelector(selectSubtotal)
    const deliveryFee = useSelector(selectDeliveryPrice)
    const total = useSelector(selectTotal)
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch()
    const [createOrder, {data, error, isLoading}] = useCreateOrderMutation()

    const onCreateOrder = async () => {
        const result = await createOrder({
            items: cartItems,
            subtotal,
            deliveryFee,
            total,
            customer: {
                name: "Kate",
                address: "My address",
                email: "kate.sh@icloud.com"
            }
        });

        if (result.data?.status === 'OK') {
            // console.log(result.data);
            Alert.alert(
                'Order has been submitted',
                `Your order reference is: ${result.data.data.ref}`
            );
            dispatch(cartSlice.actions.clear());
        }
    };
    return (
        <>
            <FlatList
                data={cartItems}
                renderItem={({item}) => <CartListItem cartItem={item}/>}
                ListFooterComponent={ShoppingCartTotals}
            />
            <Pressable onPress={onCreateOrder} style={styles.button}>
                <Text style={styles.buttonText}>
                    {isLoading && <ActivityIndicator/>}
                    Checkout
                </Text>
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
