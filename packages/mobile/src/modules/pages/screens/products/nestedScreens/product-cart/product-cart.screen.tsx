import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { CartCard } from 'src/shared/components/cart-card/cart-card';
import { Layout } from 'src/shared/components/layout/Layout';

import { useCartStore } from 'src/store/cart/cart.store';
import { styles } from './product-cart.screen.styles';
import { showToast } from 'src/shared/utils/toast';
import { Button } from 'src/shared/components/button/button.component';
import { useOrderStore } from 'src/store/order/order.store';
import { EmtyComponent } from 'src/shared/components/emty-component/emty-component';

type ProductListNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
	navigation: ProductListNavigationProp;
}

export const ProductCart = ({ navigation }: Props) => {
	const cart = useCartStore((state) => state.cart);
	const getCart = useCartStore((state) => state.getCart);
	const [refreshing, setRefreshing] = useState(false);
	const createOrder = useOrderStore((state) => state.createOrder);

	useEffect(() => {
		getCart();
	}, []);

	const totalAmount = useMemo(() => {
		return cart.reduce((sum, item) => {
			return sum + item.quantity * item.price_at_purchase;
		}, 0);
	}, [cart]);

	const handleRefresh = async () => {
		setRefreshing(true);
		await getCart();
		showToast('Refresh', 'info');
		setRefreshing(false);
	};

	const handleCreateOrder = async () => {
		try {
			await createOrder({ payment_status: 'PENDING' });
			showToast('Order created successfully!', 'success');
			navigation.navigate(NAVIGATION_KEYS.ORDERS);
		} catch (error) {
			showToast('Error creating order', 'error');
		}
	};

	return (
		<Layout style={styles.layoutstyle}>
			<FlatList
				data={cart}
				onEndReachedThreshold={0.5}
				renderItem={({ item }) => <CartCard item={item} />}
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
				ListEmptyComponent={<EmtyComponent text={'No product'} />}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={handleRefresh}
					/>
				}
			/>
			<Button
				title="Create Order"
				onPress={handleCreateOrder}
				disabled={totalAmount === 0}
				style={{ opacity: totalAmount === 0 ? 0.5 : 1 }}
			/>
		</Layout>
	);
};
