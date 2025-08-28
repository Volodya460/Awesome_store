import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, Text, TextInput, View } from 'react-native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { Layout } from 'src/shared/components/layout/Layout';
import { styles } from '../product-inf/product-inf.screen.styles';
import { useState } from 'react';
import { showToast } from 'src/shared/utils/toast';
import { Button } from 'src/shared/components/button/button.component';
import { useCartStore } from 'src/store/cart/cart.store';

type EditCartRouteProp = RouteProp<
	RootStackParamList,
	typeof NAVIGATION_KEYS.EDITCART
>;
interface EditCartProps {
	navigation: NativeStackNavigationProp<RootStackParamList>;
}

export const EditCart = ({ navigation }: EditCartProps) => {
	const route = useRoute<EditCartRouteProp>();
	const id = route.params?.order_detail_id;
	const product = route.params?.product;
	const quantity = route.params?.quantity;
	const updateCartItem = useCartStore((state) => state.updateCartItem);
	const removeCartItem = useCartStore((state) => state.removeCartItem);

	const [amount, setAmount] = useState(quantity);

	const handleAdd = () => {
		if (amount < product.quantity) {
			setAmount((prev) => prev + 1);
		}
		if (amount === product.quantity) {
			return showToast('This is all', 'info');
		}
	};

	const handleDelete = () => {
		if (amount > 1) {
			setAmount((prev) => prev - 1);
		}
	};
	const deleteItem = async (id: string) => {
		await removeCartItem(id);
		showToast('Item removed from cart', 'success');
		navigation.navigate(NAVIGATION_KEYS.PROCUTCART);
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
								keyboardType="numeric"
								style={styles.amountInput}
							/>
							<Button
								title="+"
								onPress={handleAdd}
								style={styles.amountButton}
							/>
						</View>
					</View>
					<Pressable onPress={() => deleteItem(id)}>
						<Text style={styles.textDelete}>
							Remove from the cart
						</Text>
					</Pressable>
				</View>
				<Button
					title="Save"
					onPress={() => updateCartItem(id, { quantity: amount })}
				></Button>
			</View>
		</Layout>
	);
};
