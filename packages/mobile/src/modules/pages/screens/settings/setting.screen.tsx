import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION_KEYS } from 'src/modules/navigation/types';
import { SettingsList } from './nestedScreens/settings-list/settings-list.screen';
import { PersonalInfo } from './nestedScreens/personal-info/personal-info.screen';
import { ChangePassword } from './nestedScreens/change-password/change-password.screen';
import { Faq } from './nestedScreens/faq/faq.screen';
import { COLORS } from 'src/shared/styles';

const Stack = createNativeStackNavigator();
export const SettingsScreen = () => {
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
				name={NAVIGATION_KEYS.SETTINGSLIST}
				component={SettingsList}
				options={({}) => ({
					headerBackTitle: '',
					headerBackTitleVisible: false,
					title: 'Settings',
				})}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.PERSONALINFO}
				component={PersonalInfo}
				options={({}) => ({
					headerBackTitle: '',
					headerBackTitleVisible: false,
					title: 'Personal Info',
				})}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.CHANGEPASSWORD}
				component={ChangePassword}
				options={({}) => ({
					headerBackTitle: '',
					headerBackTitleVisible: false,
					title: 'Change password',
				})}
			/>
			<Stack.Screen
				name={NAVIGATION_KEYS.FAQ}
				component={Faq}
				options={({}) => ({
					headerBackTitle: '',
					headerBackTitleVisible: false,
					title: 'FAQ',
				})}
			/>
		</Stack.Navigator>
	);
};
