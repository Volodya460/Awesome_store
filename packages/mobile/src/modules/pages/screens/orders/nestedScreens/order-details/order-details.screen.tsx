import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { CartCard } from 'src/shared/components/cart-card/cart-card';
import { Layout } from 'src/shared/components/layout/Layout';
import { styles } from './order-details-screen.styles';
import { useOrderStore } from 'src/store/order/order.store';
import { OrderDetail } from 'src/store/cart/types';
import { Button } from 'src/shared/components/button/button.component';
import Pay from '../../../../../../../assets/images/pay.svg';
import { CreatePaymentDto } from 'src/store/order/types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { showToast } from 'src/shared/utils/toast';

type OrderDetailsRouteProps = RouteProp<
	RootStackParamList,
	typeof NAVIGATION_KEYS.ORDERDETAILS
>;

export const OrderDetails = () => {
	const route = useRoute<OrderDetailsRouteProps>();
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const orderId = route.params?.order_id;
	const payment_status = route.params?.payment_status;
	const delivery_status = route.params?.delivery_status;
	const getOrderDetails = useOrderStore((state) => state.getOrderDetails);
	const createPayment = useOrderStore((state) => state.createPayment);
	const [details, setDetails] = useState<OrderDetail[]>([]);

	const fetchDetails = async () => {
		const data = await getOrderDetails(orderId);
		setDetails(data);
	};
	useEffect(() => {
		fetchDetails();
	}, [orderId]);

	const totalAmount = useMemo(() => {
		return details.reduce((sum, item) => {
			return sum + item.quantity * item.price_at_purchase;
		}, 0);
	}, [details]);

	const handlePayment = async () => {
		const dto: CreatePaymentDto = {
			order_id: orderId,
		};
		try {
			const response = await createPayment(dto);
			if (response.payment_status === 'SUCCESS') {
				navigation.navigate(NAVIGATION_KEYS.SUCCESSSCREEN);
			} else {
				showToast(response.message, 'error');
			}
		} catch (error) {
			showToast('Payment error', 'error');
		}
	};

	return (
		<Layout style={styles.layaout}>
			<FlatList
				data={details}
				onEndReachedThreshold={0.5}
				renderItem={({ item }) => (
					<CartCard
						item={item}
						payment_status={payment_status}
						delivery_status={delivery_status}
						space="Orders"
					/>
				)}
				keyExtractor={(item) => item.order_detail_id}
				contentContainerStyle={styles.container}
				ListHeaderComponent={
					<View style={styles.cartTitleBox}>
						<Text style={styles.cartTitle}>Total amount:</Text>
						<Text style={styles.cartTitle}>
							${totalAmount.toFixed(2)}
						</Text>
					</View>
				}
			/>

			<Button
				title="Pay"
				icon={<Pay />}
				style={styles.buttonPay}
				onPress={handlePayment}
				disabled={payment_status === 'COMPLETE'}
			/>
		</Layout>
	);
};
