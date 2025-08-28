import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { FlatList, Pressable, RefreshControl, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Layout } from 'src/shared/components/layout/Layout';
import { OrderCard } from 'src/shared/components/order-card/order-card';
import { useOrderStore } from 'src/store/order/order.store';
import { RootStackParamList } from 'src/modules/navigation/types';
import {
	DeliveryStatus,
	FilterOrderDto,
	PaymentStatus,
} from 'src/store/order/types/types';
import { styles } from './orders-list-screen.styles';
import {
	FilterSheetContent,
	FilterType,
} from 'src/shared/components/bottomSheet-content/bottomSheet-content';
import { EmtyComponent } from 'src/shared/components/emty-component/emty-component';

type ProductListNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
	navigation: ProductListNavigationProp;
}

export const OrdersList = ({ navigation }: Props) => {
	const orders = useOrderStore((state) => state.orders);
	const fetchOrders = useOrderStore((state) => state.fetchOrders);
	const [refreshing, setRefreshing] = useState(false);
	const [paymentFilter, setPaymentFilter] = useState<
		PaymentStatus | undefined
	>(undefined);
	const [deliveryFilter, setDeliveryFilter] = useState<
		DeliveryStatus | undefined
	>(undefined);
	const [orderByDate, setOrderByDate] = useState<'asc' | 'desc'>('desc');
	const [currentFilterType, setCurrentFilterType] =
		useState<FilterType>(null);

	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ['40%'], []);

	useEffect(() => {
		const localFilters: FilterOrderDto = {
			payment: paymentFilter,
			delivery: deliveryFilter,
			orderByDate,
		};
		fetchOrders(localFilters);
	}, [paymentFilter, deliveryFilter, orderByDate]);

	const handleRefresh = async () => {
		setRefreshing(true);
		const localFilters: FilterOrderDto = {
			payment: paymentFilter,
			delivery: deliveryFilter,
			orderByDate,
		};
		await fetchOrders(localFilters);
		setRefreshing(false);
	};
	const openFilterSheetFor = useCallback((type: FilterType) => {
		setCurrentFilterType(type);
		bottomSheetRef.current?.expand();
	}, []);

	const handleSelectPayment = (value?: PaymentStatus) => {
		setPaymentFilter(value);
		bottomSheetRef.current?.close();
	};

	const handleSelectDelivery = (value?: DeliveryStatus) => {
		setDeliveryFilter(value);
		bottomSheetRef.current?.close();
	};

	const handleSelectDate = (value: 'asc' | 'desc') => {
		setOrderByDate(value);
		bottomSheetRef.current?.close();
	};

	const paymentText = paymentFilter ? paymentFilter : 'All';
	const deliveryText = deliveryFilter ? deliveryFilter : 'All';

	return (
		<Layout>
			<FlatList
				data={orders}
				onEndReachedThreshold={0.5}
				renderItem={({ item }) => (
					<OrderCard item={item} navigation={navigation} />
				)}
				keyExtractor={(item) => item.order_id}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={handleRefresh}
					/>
				}
				contentContainerStyle={styles.container}
				ListHeaderComponent={
					<View>
						<Text style={styles.cartTitle}>Filter by</Text>
						<View style={styles.filterBox}>
							<Pressable
								onPress={() => openFilterSheetFor('payment')}
							>
								<Text style={styles.cartTitle}>Payment:</Text>
								<Text style={styles.textFilter}>
									{paymentText}
								</Text>
							</Pressable>
							<Pressable
								onPress={() => openFilterSheetFor('delivery')}
							>
								<Text style={styles.cartTitle}>Delivery:</Text>
								<Text style={styles.textFilter}>
									{deliveryText}
								</Text>
							</Pressable>
							<Pressable
								onPress={() => openFilterSheetFor('date')}
							>
								<Text style={styles.cartTitle}>Date:</Text>
								<Text style={styles.textFilter}>
									{orderByDate}
								</Text>
							</Pressable>
						</View>
					</View>
				}
				ListEmptyComponent={<EmtyComponent text={'No orders'} />}
			/>
			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				snapPoints={snapPoints}
				enablePanDownToClose
			>
				<FilterSheetContent
					currentFilterType={currentFilterType}
					handleSelectPayment={handleSelectPayment}
					handleSelectDelivery={handleSelectDelivery}
					handleSelectDate={handleSelectDate}
				/>
			</BottomSheet>
		</Layout>
	);
};
