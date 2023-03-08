import {FlatList, Text, View, StyleSheet, Pressable, ActivityIndicator, Alert} from "react-native";

import CartListItem from "../components/CartListItem";
import {useDispatch, useSelector} from "react-redux";
import {cartSlice, selectDeliveryPrice, selectSubtotal, selectTotal} from "../store/cartSlice";
import {useCreateOrderMutation, useCreatePaymentIntentMutation} from "../store/apiSlice";
import {useStripe} from "@stripe/stripe-react-native";

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
        const [createPaymentIntent] = useCreatePaymentIntentMutation();

        const {initPaymentSheet, presentPaymentSheet} = useStripe();

        const onCheckout = async () => {
            // 1. Create a payment intent
            const response = await createPaymentIntent({
                amount: Math.floor(total * 100),   //*100 for cents
            });
            // console.log(response);
            if (response.error) {
                Alert.alert('Something went wrong', response.error);
                return;
            }
            // 2. Initialize the Payment sheet
            const initResponse = await initPaymentSheet({
                merchantDisplayName: 'Kate, Inc.',
                paymentIntentClientSecret: response.data.paymentIntent,
                // defaultBillingDetails: {
                //     name: 'Jane Doe',
                //     address: "Chicago"
                // },
            });
            if (initResponse.error) {
                // console.log(initResponse.error)
                Alert.alert('Something went wrong');
                return;
            }

            // 3. Present the Payment Sheet from Stripe
            const {error: paymentError} = await presentPaymentSheet();
            if (paymentError) {
                Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
                return;
            }

            // 4. If payment ok -> create the order
            onCreateOrder();
        };

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
                <Pressable onPress={onCheckout} style={styles.button}>
                    <Text style={styles.buttonText}>
                        {isLoading && <ActivityIndicator/>}
                        Checkout
                    </Text>
                </Pressable>
            </>
        );
    }
;

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
