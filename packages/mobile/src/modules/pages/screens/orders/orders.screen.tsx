import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION_KEYS } from 'src/modules/navigation/types';
import { OrdersList } from './nestedScreens/orders-list/orders-list.screen';
import { COLORS } from 'src/shared/styles';
import { OrderDetails } from './nestedScreens/order-details/order-details.screen';
import { EditCardOrder } from './nestedScreens/edit-card-order/edit-card-order.screen';
import { SuccessScreen } from './nestedScreens/success-screen/success.screen';

const Stack = createNativeStackNavigator();
export const OredersScreen = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: COLORS.backgroundColor },
				headerTitleAlign: 'center',
				headerShadowVisible: false,
				headerTitleStyle: {
					fontFamily: 'Poppins',
					fontSize: 24,
					fontWeight: 700,
					color: COLORS.black,
				},
			}}
		>
			<Stack.Screen
				name={NAVIGATION_KEYS.ORDERSLIST}
				component={OrdersList}
				options={({}) => ({
					headerBackTitle: '',
					headerBackTitleVisible: false,
					title: 'Orders',
				})}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.ORDERDETAILS}
				component={OrderDetails}
				options={({}) => ({
					headerBackTitle: '',
					headerBackTitleVisible: false,
					title: 'Order details',
				})}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.EDITCART}
				component={EditCardOrder}
				options={({}) => ({
					headerBackTitle: '',
					headerBackTitleVisible: false,
					title: 'Edit cart item',
				})}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.SUCCESSSCREEN}
				component={SuccessScreen}
				options={({}) => ({
					headerTitle: '',
					headerBackTitle: '',
					headerBackTitleVisible: false,
				})}
			/>
		</Stack.Navigator>
	);
};
