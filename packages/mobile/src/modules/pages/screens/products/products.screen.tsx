import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NAVIGATION_KEYS } from 'src/modules/navigation/types';
import { COLORS } from 'src/shared/styles';
import { ProductList } from './nestedScreens/product-list/product-list.screen';
import { ProductInf } from './nestedScreens/product-inf/product-inf.screen';
import { ProductCart } from './nestedScreens/product-cart/product-cart.screen';
import { EditCart } from './nestedScreens/edit-cart/edit-cart.screen';
import { Text, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { useCartStore } from 'src/store/cart/cart.store';
import { styles } from './products-screen.styles';

const Stack = createNativeStackNavigator();
export const ProductsScreen = () => {
	const getCart = useCartStore((state) => state.getCart);
	const cart = useCartStore((state) => state.cart);
	useEffect(() => {
		getCart();
	}, []);
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: COLORS.backgroundColor },
				headerShadowVisible: false,
				headerTitleAlign: 'center',
				headerTitleStyle: {
					fontFamily: 'Poppins',
					fontSize: 24,
					fontWeight: 700,
					color: COLORS.black,
				},
			}}
		>
			<Stack.Screen
				name={NAVIGATION_KEYS.PRODUCTLIST}
				component={ProductList}
				options={({ navigation }) => ({
					headerBackTitle: '',
					headerBackTitleVisible: false,
					title: 'Products',
					headerRight: () => (
						<TouchableOpacity
							onPress={() =>
								navigation.navigate(NAVIGATION_KEYS.PROCUTCART)
							}
							style={styles.cartSvgBox}
						>
							<Ionicons
								name="cart-outline"
								size={24}
								color="black"
								style={{ marginRight: 16 }}
							/>
							<Text style={styles.cartNumber}>{cart.length}</Text>
						</TouchableOpacity>
					),
				})}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.PRODUCTINF}
				component={ProductInf}
				options={({ navigation }) => ({
					headerBackTitle: '',
					headerBackTitleVisible: false,
					title: 'Product information',
					headerRight: () => (
						<TouchableOpacity
							onPress={() =>
								navigation.navigate(NAVIGATION_KEYS.PROCUTCART)
							}
							style={styles.cartSvgBox}
						>
							<Ionicons
								name="cart-outline"
								size={24}
								color="black"
								style={{ marginRight: 16 }}
							/>
							<Text style={styles.cartNumber}>{cart.length}</Text>
						</TouchableOpacity>
					),
				})}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.PROCUTCART}
				component={ProductCart}
				options={({ navigation }) => ({
					headerBackTitle: '',
					headerBackTitleVisible: false,
					title: 'Cart',
					headerRight: () => (
						<TouchableOpacity
							onPress={() =>
								navigation.navigate(NAVIGATION_KEYS.PROCUTCART)
							}
							style={styles.cartSvgBox}
						>
							<Ionicons
								name="cart-outline"
								size={24}
								color="black"
								style={{ marginRight: 16 }}
							/>
							<Text style={styles.cartNumber}>{cart.length}</Text>
						</TouchableOpacity>
					),
				})}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.EDITCART}
				component={EditCart}
				options={({ navigation }) => ({
					headerBackTitle: '',
					headerBackTitleVisible: false,
					title: 'Edit cart item',
					headerRight: () => (
						<TouchableOpacity
							onPress={() =>
								navigation.navigate(NAVIGATION_KEYS.PROCUTCART)
							}
							style={styles.cartSvgBox}
						>
							<Ionicons
								name="cart-outline"
								size={24}
								color="black"
								style={{ marginRight: 16 }}
							/>
							<Text style={styles.cartNumber}>{cart.length}</Text>
						</TouchableOpacity>
					),
				})}
			/>
		</Stack.Navigator>
	);
};
