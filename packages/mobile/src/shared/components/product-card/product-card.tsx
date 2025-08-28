import { View, Text, Pressable } from 'react-native';
import { Product } from 'src/store/product/types/product.types';
import { styles } from './product-card.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';

interface ProductCardProps {
	item: Product;
	navigation: NativeStackNavigationProp<RootStackParamList>;
}

export const ProductCard = ({ item, navigation }: ProductCardProps) => {
	const { name, price, category, id } = item;

	const goToProductInfo = () => {
		navigation.navigate(NAVIGATION_KEYS.PRODUCTINF, { id });
	};
	return (
		<Pressable onPress={goToProductInfo} style={styles.cardBox}>
			<View style={styles.priceBox}>
				<Text>{name}</Text>
				<View style={styles.categoryBox}>
					<Text style={styles.productTitle}>Price:</Text>
					<Text style={styles.productText}>${price}</Text>
				</View>
			</View>
			<View style={styles.categoryBox}>
				<Text style={styles.productTitle}>Category:</Text>
				<Text style={styles.productText}>{category}</Text>
			</View>
		</Pressable>
	);
};
