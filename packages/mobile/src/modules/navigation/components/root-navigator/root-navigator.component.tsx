import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavContainer } from '../nav-container/nav-container.component';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from '../../types/navigation.type';
import { SCREEN_OPTIONS } from '../../constants';
import { LoginScreen } from '../../../auth/screens/login/login.screen';
import { RegisterScreen } from 'src/modules/auth/screens/register/register.screen';
import { VerifyScreen } from 'src/modules/auth/screens/verify/verify.screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { OredersScreen } from 'src/modules/pages/screens/orders/orders.screen';
import { ProductsScreen } from 'src/modules/pages/screens/products/products.screen';
import { SettingsScreen } from 'src/modules/pages/screens/settings/setting.screen';
import { COLORS } from 'src/shared/styles';
import ProductsIcon from '../../../../../assets/images/product.svg';
import OrederIcon from '../../../../../assets/images/order.svg';
import { getTabBarStyleFor } from 'src/shared/utils/tabBarFtyleFor';
import { ResendCode } from 'src/modules/pages/screens/resend-password/resend-code/resend-code.screen';
import { ResendPassword } from 'src/modules/pages/screens/resend-password/resend-password/resend-password.screen';
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

type RootNavigatorProps = {
	isLoggedIn: boolean;
};

export const RootNavigator = ({ isLoggedIn }: RootNavigatorProps) => {
	const screens = React.useMemo(() => {
		return (
			<>
				<Stack.Screen
					name={NAVIGATION_KEYS.LOGIN}
					component={LoginScreen}
					options={SCREEN_OPTIONS}
				/>
				<Stack.Screen
					name={NAVIGATION_KEYS.REGISTER}
					component={RegisterScreen}
					options={SCREEN_OPTIONS}
				/>
				<Stack.Screen
					name={NAVIGATION_KEYS.VERIFY}
					component={VerifyScreen}
					options={SCREEN_OPTIONS}
				/>
				<Stack.Screen
					name={NAVIGATION_KEYS.RESENDVERIFYCODE}
					component={ResendCode}
					options={SCREEN_OPTIONS}
				/>
				<Stack.Screen
					name={NAVIGATION_KEYS.RESENDPASSWORD}
					component={ResendPassword}
					options={SCREEN_OPTIONS}
				/>
			</>
		);
	}, []);

	const MainTabs = () => (
		<Tab.Navigator
			screenOptions={() => ({
				tabBarShowLabel: true,
				headerShown: false,
				tabBarActiveTintColor: COLORS.blue,
				headerBackTitleVisible: false,
				tabBarStyle: {
					height: 80,
					paddingTop: 10,
				},
			})}
		>
			<Tab.Screen
				name={NAVIGATION_KEYS.PRODUCTS}
				component={ProductsScreen}
				options={({ route }) => ({
					headerBackTitle: '',
					headerBackTitleVisible: false,
					headerTitleAlign: 'center',
					tabBarIcon: ({ color, size }) => (
						<ProductsIcon
							width={size}
							height={size}
							stroke={color}
						/>
					),
					tabBarStyle: getTabBarStyleFor(
						route,
						NAVIGATION_KEYS.PRODUCTLIST,
					),
				})}
			/>
			<Tab.Screen
				name={NAVIGATION_KEYS.ORDERS}
				component={OredersScreen}
				options={({ route }) => ({
					title: 'Orders',
					headerTitleAlign: 'center',
					tabBarIcon: ({ color, size }) => (
						<OrederIcon width={size} height={size} stroke={color} />
					),
					tabBarStyle: getTabBarStyleFor(
						route,
						NAVIGATION_KEYS.ORDERSLIST,
					),
				})}
			/>
			<Tab.Screen
				name={NAVIGATION_KEYS.SETTINGS}
				component={SettingsScreen}
				options={({ route }) => ({
					title: 'Settings',
					headerTitleAlign: 'center',
					tabBarIcon: ({ color, size }) => (
						<Ionicons
							name="settings-outline"
							size={size}
							color={color}
						/>
					),
					tabBarStyle: getTabBarStyleFor(
						route,
						NAVIGATION_KEYS.SETTINGSLIST,
					),
				})}
			/>
		</Tab.Navigator>
	);

	return (
		<NavContainer>
			{isLoggedIn ? (
				<MainTabs />
			) : (
				<Stack.Navigator initialRouteName={NAVIGATION_KEYS.REGISTER}>
					{screens}
				</Stack.Navigator>
			)}
		</NavContainer>
	);
};
