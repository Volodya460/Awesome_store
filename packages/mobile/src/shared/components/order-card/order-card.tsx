import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, View, Text } from 'react-native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { Order } from 'src/store/order/types/types';
import { styles } from './order-card.styles';
import { formatDate } from 'src/shared/utils/formatDate';

interface OrderCardProps {
	item: Order;
	navigation: NativeStackNavigationProp<RootStackParamList>;
}

export const OrderCard = ({ item, navigation }: OrderCardProps) => {
	const {
		createdAt,
		delivery_status,
		order_id,
		payment_status,
		total_amount,
	} = item;

	const goToCartItem = () => {
		navigation.navigate(NAVIGATION_KEYS.ORDERDETAILS, {
			order_id,
			delivery_status,
			payment_status,
		});
	};

	return (
		<Pressable onPress={goToCartItem}>
			<View style={styles.cardBox}>
				<View style={styles.infBox}>
					<Text style={styles.infTitle}>Date:</Text>
					<Text style={styles.productText}>
						{formatDate(createdAt)}
					</Text>
				</View>
				<View style={styles.infBox}>
					<Text style={styles.infTitle}>ID:</Text>
					<Text style={styles.productText}>{order_id}</Text>
				</View>
				<View style={styles.infBox}>
					<Text style={styles.infTitle}>Payment Status:</Text>
					<Text style={styles.productText}>{payment_status}</Text>
				</View>
				<View style={styles.infBox}>
					<Text style={styles.infTitle}>Delivery Status:</Text>
					<Text style={styles.productText}>{delivery_status}</Text>
				</View>
				<View style={styles.infBox}>
					<Text style={styles.infTitle}>Total:</Text>
					<Text style={styles.productText}>${total_amount}</Text>
				</View>
			</View>
		</Pressable>
	);
};
