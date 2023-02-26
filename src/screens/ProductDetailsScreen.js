import products from "../data/products";
import {FlatList, Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View} from "react-native";


const ProductDetailsScreen = () => {
    //use it to make the image full-width.
    const {width} = useWindowDimensions();
    const addToCart=()=>{
        console.warn('Add to cart')
    }

    const product = products[0];
    return (
        <View>
            <ScrollView>
                {/* Image Carousel */}
                <FlatList
                    data={product.images}
                    renderItem={({item}) => (
                        <Image
                            source={{uri: item}}
                            style={{width, aspectRatio: 1}}/>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    //to center the image in carousel
                    pagingEnabled
                />
                <View style={{padding: 20}}>
                    {/* Title */}
                    <Text style={styles.title}>{product.name}</Text>

                    {/* Price */}
                    <Text style={styles.price}>${product.price}</Text>

                    {/* Description */}

                    <Text style={styles.description}>{product.description}</Text>
                </View>
            </ScrollView>

            {/* Add to cart button */}
            <Pressable style={styles.button} onPress={addToCart} >
                <Text style={styles.buttonText}>Add to cart</Text>
            </Pressable>
            {/* Navigation icon */}
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        fontWeight: "500",
        marginVertical: 10,
    },
    price: {
        fontWeight: "500",
        fontSize: 16,
        letterSpacing: 1.5,
    },
    description: {
        marginVertical: 10,
        fontSize: 18,
        lineHeight: 30,
        fontWeight: "300",
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

export default ProductDetailsScreen;
