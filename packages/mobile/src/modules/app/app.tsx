import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { RootNavigator } from '../navigation/components/root-navigator';
import { useAuthStore } from 'src/store/auth/auth.store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const App = () => {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
	useEffect(() => {
		useAuthStore.getState().hydrateAuthState();
	}, []);

	const [fontsLoaded] = useFonts({
		Poppins: require('../../../assets/fonts/Poppins-Regular.ttf'),
		PoppinsBold: require('../../../assets/fonts/Poppins-Bold.ttf'),
	});
	if (!fontsLoaded) {
		return null;
	}
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaProvider style={{ flex: 1 }}>
				<RootNavigator isLoggedIn={isLoggedIn} />
				<Toast />
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
};
