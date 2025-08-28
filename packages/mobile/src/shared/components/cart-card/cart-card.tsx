import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { OrderDetail } from 'src/store/cart/types';
import { styles } from './cart-card.styles';
import Delete from '../../../../assets/images/Delete.svg';
import { useCartStore } from 'src/store/cart/cart.store';
import { showToast } from 'src/shared/utils/toast';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
interface CartCardProps {
	item: OrderDetail;
	payment_status?: string;
	delivery_status?: string;
	space?: string;
}

export const CartCard = ({
	item,
	payment_status,
	delivery_status,
	space,
}: CartCardProps) => {
	const { product, quantity, price_at_purchase, order_detail_id } = item;
	const removeCartItem = useCartStore((state) => state.removeCartItem);
	const navigation = useNavigation<NavigationProp>();
	const goToCartItem = () => {
		if (!product) {
			showToast('Product not found', 'error');
			return;
		}
		navigation?.navigate(NAVIGATION_KEYS.EDITCART, {
			order_detail_id,
			product,
			quantity,
			payment_status,
			delivery_status,
		});
	};

	const handleDelete = () => {
		removeCartItem(order_detail_id);

		if (space === 'Orders') {
			navigation.navigate(NAVIGATION_KEYS.ORDERSLIST);
		} else {
			navigation.navigate(NAVIGATION_KEYS.PRODUCTLIST);
		}
	};

	const isDeleteDisabled =
		payment_status === 'COMPLETE' ||
		delivery_status === 'IN_TRANSIT' ||
		delivery_status === 'DELIVERED';
	return (
		<Pressable onPress={goToCartItem}>
			<View style={styles.cardBox}>
				<View>
					<Text>{product?.name}</Text>
					<View style={styles.priceBox}>
						<View style={styles.infBox}>
							<Text style={styles.productTitle}>Total:$</Text>
							<Text>{price_at_purchase * quantity}</Text>
						</View>
						<View style={styles.amountBox}>
							<Text style={styles.productTitle}>Amount:</Text>
							<Text style={styles.productText}>{quantity}</Text>
						</View>
					</View>
				</View>
				<Pressable
					onPress={isDeleteDisabled ? undefined : handleDelete}
					disabled={isDeleteDisabled}
					style={isDeleteDisabled ? styles.disabledButton : undefined}
				>
					<Delete />
				</Pressable>
			</View>
		</Pressable>
	);
};
