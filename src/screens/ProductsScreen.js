import {ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {productsSlice} from "../store/productsSlice";
import {useGetProductsQuery} from "../store/apiSlice";

const ProductsScreen = ({navigation}) => {
    // const navigation = useNavigation()
    const dispatch = useDispatch()

    // const products = useSelector(state => state.products.products)

    const {data, error, isLoading} = useGetProductsQuery();
    if (isLoading) {
        return <ActivityIndicator/>;
    }
    if (error) {
        return <Text>Error fetching products:{error.error} </Text>
    }


    return (
        <FlatList
            data={data.data}
            renderItem={({item}) => (
                <Pressable
                    onPress={() => {
                        // dispatch(productsSlice.actions.setSelectedProduct(item.id))

                        navigation.navigate("Product Details", {id: item._id})
                    }}
                    style={styles.itemContainer}>
                    <Image source={{uri: item.image}} style={styles.image}/>
                </Pressable>
            )}
            numColumns={2}
        />

    )
}

const styles = StyleSheet.create({
    itemContainer: {
        width: "50%",
        padding: 1,
    },
    image: {
        width: "100%",
        aspectRatio: 1,
    },
});

export default ProductsScreen

