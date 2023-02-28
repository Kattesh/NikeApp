import {NavigationContainer} from "@react-navigation/native";
import ProductsScreen from "./screens/ProductsScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ShoppingCart from "./screens/ShoppingCart";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Pressable, StyleSheet, Text} from "react-native";
import {FontAwesome5} from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ contentStyle: styles.container }}>
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
                                <Text style={styles.cartItems}> 1 </Text>
                            </Pressable>
                        )
                    })}/>
                <Stack.Screen
                    name="Product Details"
                    component={ProductDetailsScreen}
                    options={{presentation: 'modal'}}/>
                <Stack.Screen
                    name="Cart"
                    component={ShoppingCart}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    cartItems: {
        marginLeft: 5,
        fontWeight: '500',
    },
    container:{
        backgroundColor:'white'
    }

});

export default Navigation
