import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Layout } from 'src/shared/components/layout/Layout';
import { useAuthStore } from 'src/store/auth/auth.store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { styles } from './settings-list-screen.styles';

export const SettingsList = () => {
	const logout = useAuthStore((state) => state.logout);
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();

	return (
		<Layout>
			<View style={styles.settingsBox}>
				<Pressable
					onPress={() =>
						navigation.navigate(NAVIGATION_KEYS.PERSONALINFO)
					}
				>
					<Text style={styles.text}>Personal info</Text>
				</Pressable>
				<Pressable
					onPress={() =>
						navigation.navigate(NAVIGATION_KEYS.CHANGEPASSWORD)
					}
				>
					<Text style={styles.text}>Change password</Text>
				</Pressable>
				<Pressable
					onPress={() => navigation.navigate(NAVIGATION_KEYS.FAQ)}
				>
					<Text style={styles.text}>FAQ</Text>
				</Pressable>
				<Pressable>
					<Text style={styles.text}>Terms & Conditions</Text>
				</Pressable>
				<Pressable onPress={logout}>
					<Text style={styles.logoutText}>Logout</Text>
				</Pressable>
			</View>
		</Layout>
	);
};
