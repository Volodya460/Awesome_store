import {
	ActivityIndicator,
	Platform,
	Text,
	TextInput,
	View,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Layout } from 'src/shared/components/layout/Layout';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { useProductStore } from 'src/store/product/product.store';
import { Product } from 'src/store/product/types/product.types';
import { useEffect, useState } from 'react';
import { Button } from 'src/shared/components/button/button.component';

import { showToast } from 'src/shared/utils/toast';
import { styles } from './product-inf.screen.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCartStore } from 'src/store/cart/cart.store';

type ProductInfRouteProp = RouteProp<
	RootStackParamList,
	typeof NAVIGATION_KEYS.PRODUCTINF
>;
interface ProductInfProps {
	navigation: NativeStackNavigationProp<RootStackParamList>;
}

export const ProductInf = ({ navigation }: ProductInfProps) => {
	const getById = useProductStore((state) => state.getById);
	const isLoading = useProductStore((state) => state.isLoading);
	const addToCart = useCartStore((state) => state.addToCart);
	const [amount, setAmount] = useState(1);
	const route = useRoute<ProductInfRouteProp>();
	const id = route.params?.id;
	const [product, setProduct] = useState<Product | null>();

	useEffect(() => {
		if (!id) return;
		const fetchProduct = async () => {
			const data = await getById(id);
			setProduct(data);
		};

		fetchProduct();
	}, [id]);

	if (isLoading) {
		return (
			<Layout>
				<ActivityIndicator size="large" />
			</Layout>
		);
	}

	const handleAdd = () => {
		if (product && amount < product.quantity) {
			setAmount((prev) => prev + 1);
		}
		if (product && amount === product.quantity) {
			return showToast('This is all', 'info');
		}
	};

	const handleDelete = () => {
		if (amount > 1) {
			setAmount((prev) => prev - 1);
		}
	};

	const handleAddToCart = async () => {
		if (!product) return;
		try {
			await addToCart({ product_id: product.id, quantity: amount });
			showToast('Product added to cart', 'success');
			navigation.navigate(NAVIGATION_KEYS.PROCUTCART);
		} catch (error) {
			showToast('Error adding product to cart', 'error');
		}
	};
	return (
		<Layout>
			<View style={styles.cardBox}>
				<View>
					<View style={styles.cardItem}>
						<Text style={styles.cardTitle}>Name:</Text>
						<Text>{product?.name}</Text>
					</View>
					<View style={styles.cardItem}>
						<Text style={styles.cardTitle}>Description:</Text>
						<Text>{product?.description}</Text>
					</View>
					<View style={styles.cardItem}>
						<Text style={styles.cardTitle}>In stock:</Text>
						<Text>{product?.quantity}</Text>
					</View>
					<View style={styles.cardItem}>
						<Text style={styles.cardTitle}>Price:</Text>
						<Text>${product?.price}</Text>
					</View>
					<View style={styles.cardItem}>
						<Text style={styles.cardTitle}>Catergory:</Text>
						<Text>{product?.category}</Text>
					</View>
					<View>
						<Text style={styles.cardTitle}>Amount:</Text>
						<View style={styles.amountBox}>
							<Button
								title="-"
								onPress={handleDelete}
								style={styles.amountButton}
							/>
							<TextInput
								value={String(amount)}
								keyboardType={
									Platform.OS === 'android'
										? 'number-pad'
										: 'numeric'
								}
								style={styles.amountInput}
							/>
							<Button
								title="+"
								onPress={handleAdd}
								style={styles.amountButton}
							/>
						</View>
					</View>
				</View>
				<Button title="Add card" onPress={handleAddToCart}></Button>
			</View>
		</Layout>
	);
};
