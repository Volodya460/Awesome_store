import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { Layout } from 'src/shared/components/layout/Layout';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'src/modules/navigation/types';
import { useProductStore } from 'src/store/product/product.store';
import { useEffect, useState } from 'react';
import { FilterProductDto } from 'src/store/product/types/product.types';
import { ProductCard } from 'src/shared/components/product-card/product-card';
import { useDebounceEffect } from 'src/shared/hooks/useDebounceEffect';
import Ionicons from '@expo/vector-icons/Ionicons';

import { showToast } from 'src/shared/utils/toast';
import { COLORS } from 'src/shared/styles';
import { styles } from './product-list.screen.styles';

type ProductListNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
	navigation: ProductListNavigationProp;
}

export const ProductList = ({ navigation }: Props) => {
	const fetchProducts = useProductStore((state) => state.fetchProducts);
	const products = useProductStore((state) => state.products);
	const lastPage = useProductStore((state) => state.lastPage);
	const [searchTerm, setSearchTerm] = useState('');
	const [isFetchingMore, setIsFetchingMore] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [filters, setFilters] = useState<FilterProductDto>({
		page: '1',
		limit: '10',
		sort: 'asc',
	});

	const [sortProduct, setSortProduct] = useState<'asc' | 'desc' | undefined>(
		undefined,
	);

	const defaultFilters: FilterProductDto = {
		page: '1',
		limit: '10',
		sort: 'asc',
	};

	useEffect(() => {
		fetchProducts(defaultFilters);
	}, []);

	useDebounceEffect(
		() => {
			const updatedFilters: FilterProductDto = {
				...filters,
				name: searchTerm,
				sort: sortProduct,
				page: '1',
			};
			setFilters(updatedFilters);
			fetchProducts(updatedFilters);
		},
		[searchTerm, sortProduct],
		500,
	);
	const handleLoadMore = async () => {
		const currentPage = parseInt(filters.page ?? '1', 10);

		if (lastPage === 1) {
			return;
		}
		if (isFetchingMore || currentPage >= lastPage) {
			return;
		}
		setIsFetchingMore(true);
		const nextPage = (currentPage + 1).toString();
		const updatedFilters = { ...filters, page: nextPage };
		setFilters(updatedFilters);
		await fetchProducts(updatedFilters);
		setIsFetchingMore(false);
	};
	const handleRefresh = async () => {
		setRefreshing(true);
		const refreshedFilters = { ...filters, page: '1' };
		setFilters(refreshedFilters);
		await fetchProducts(refreshedFilters);
		showToast('Refresh', 'info');
		setRefreshing(false);
	};

	return (
		<Layout>
			<FlatList
				style={{ flex: 1, width: '100%' }}
				data={products}
				renderItem={({ item }) => (
					<ProductCard item={item} navigation={navigation} />
				)}
				keyExtractor={(item) => item.id}
				onEndReached={handleLoadMore}
				onEndReachedThreshold={0.5}
				showsVerticalScrollIndicator={false}
				ListFooterComponent={
					isFetchingMore ? (
						<ActivityIndicator style={styles.loadingIndicator} />
					) : null
				}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={handleRefresh}
					/>
				}
				contentContainerStyle={styles.listContainer}
				ListHeaderComponent={
					<View style={{ marginVertical: 12 }}>
						<TextInput
							placeholder="Enter product name"
							value={searchTerm}
							onChangeText={setSearchTerm}
							style={styles.inputName}
						/>
						<View style={styles.sortBox}>
							<TouchableOpacity
								onPress={() => setSortProduct('desc')}
							>
								<Ionicons
									name="arrow-down"
									size={24}
									color={
										sortProduct === 'desc'
											? COLORS.blue
											: COLORS.black
									}
								/>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => setSortProduct('asc')}
							>
								<Ionicons
									name="arrow-up"
									size={24}
									color={
										sortProduct === 'asc'
											? COLORS.blue
											: COLORS.black
									}
								/>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => setSortProduct(undefined)}
							>
								<Ionicons
									name="close"
									size={24}
									color={
										sortProduct === undefined
											? COLORS.blue
											: COLORS.black
									}
								/>
							</TouchableOpacity>
						</View>
					</View>
				}
			/>
		</Layout>
	);
};
