import products from "../data/products";
import {Image, View} from "react-native";

const ProductDetailsScreen = () => {
    const product = products[0];

    return (
        <View>
            <Image
                source={{ uri: product.images[0] }}
                style={{ width: '100%', aspectRatio: 1 }}
            />

            {/* Title */}

            {/* Price */}

            {/* Description */}

            {/* Add to cart button */}

            {/* Navigation icon */}
        </View>
    );
};

const styles = StyleSheet.create({

});

export default ProductDetailsScreen;
