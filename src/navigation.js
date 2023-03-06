import {NavigationContainer} from "@react-navigation/native";
import ProductsScreen from "./screens/ProductsScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ShoppingCart from "./screens/ShoppingCart";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Pressable, StyleSheet, Text} from "react-native";
import {FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import {useSelector} from "react-redux";
import {selectNumberOfItems} from "./store/cartSlice";
import TrackOrder from "./screens/TrackOrder";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const numberOfItems = useSelector(selectNumberOfItems)

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{contentStyle: styles.container}}>
                <Stack.Screen
                    name="Products"
                    component={ProductsScreen}
                    options={({navigation}) => ({
                        headerRight: () => (
                            <Pressable
                                style={{flexDirection: 'row'}}
                                onPress={() => navigation.navigate('Cart')}
                            >
                                <FontAwesome5 name="shopping-cart" size={18} color="gray"/>
                                <Text style={styles.cartItems}> {numberOfItems} </Text>
                            </Pressable>
                        ),
                        headerLeft: () => (
                            <MaterialCommunityIcons
                                onPress={() => navigation.navigate('Track Order')}
                                name="truck-delivery"
                                size={22}
                                color="gray"/>
                        ),
                    })}/>
                <Stack.Screen
                    name="Product Details"
                    component={ProductDetailsScreen}
                    options={{presentation: 'modal'}}/>
                <Stack.Screen
                    name="Cart"
                    component={ShoppingCart}/>
                <Stack.Screen
                    name="Track Order"
                    component={TrackOrder}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    cartItems: {
        marginLeft: 5,
        fontWeight: '500',
    },
    container: {
        backgroundColor: 'white'
    }

});

export default Navigation
