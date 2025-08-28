import { NavigationProp, useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { z } from 'zod';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from '../../../navigation/types/navigation.type';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import {
	ActivityIndicator,
	Keyboard,
	Platform,
	Pressable,
	StatusBar,
	Text,
	View,
} from 'react-native';
import { registerSchema } from '../../auth.schemas';
import { Input } from 'src/shared/components/input';
import { styles } from './register-screen.styles';
import { Layout } from 'src/shared/components/layout/Layout';
import { Button } from 'src/shared/components/button/button.component';
import { useAuthStore } from 'src/store/auth/auth.store';
import { COLORS } from 'src/shared/styles';

type FormData = z.infer<typeof registerSchema>;
export const RegisterScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const register = useAuthStore((state) => state.register);
	const isRegister = useAuthStore((state) => state.isRegister);
	const isLoading = useAuthStore((state) => state.isLoading);

	React.useEffect(() => {
		if (isRegister) {
			navigation.navigate(NAVIGATION_KEYS.VERIFY);
		}
	}, [isRegister]);

	const { control, handleSubmit, reset } = useForm<FormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
			phone: '',
			confirmPassword: '',
			shippingAddress: '',
		},
	});

	const onSubmit = (data: FormData) => {
		keyboardHide();
		register(data);

		reset();
	};
	const keyboardHide = () => {
		Keyboard.dismiss();
	};

	const paddingTop = Platform.select({
		ios: 60, // iOS
		android: StatusBar.currentHeight! + 10,
	});
	return (
		<Layout paddingTop={paddingTop}>
			<KeyboardAwareScrollView
				keyboardShouldPersistTaps="handled"
				extraScrollHeight={5}
				onScrollBeginDrag={keyboardHide}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.formContainer}>
					<Text style={styles.formTitle}>Sign up</Text>
					<Input
						name="email"
						control={control}
						defaultValue=""
						label="Email"
					/>
					<Input
						name="username"
						control={control}
						defaultValue=""
						label="Full name"
					/>
					<Input
						name="phone"
						control={control}
						defaultValue=""
						label="Phone number"
					/>

					<Input
						name="password"
						control={control}
						defaultValue=""
						label="Password"
						secureTextEntry={true}
					/>
					<Input
						name="confirmPassword"
						control={control}
						defaultValue=""
						label="Confirm password"
						secureTextEntry={true}
					/>
					<Input
						name="shippingAddress"
						control={control}
						defaultValue=""
						label="Shipping address"
					/>
					{isLoading ? (
						<ActivityIndicator
							size="large"
							color={COLORS.blue}
							style={styles.formButton}
						/>
					) : (
						<Button
							title="Sign up"
							onPress={handleSubmit(onSubmit)}
							style={styles.formButton}
						/>
					)}

					<View style={styles.formTextWrapper}>
						<Text style={styles.formText}>
							Have you already registered?
						</Text>
						<Pressable
							onPress={() =>
								navigation.navigate(NAVIGATION_KEYS.LOGIN)
							}
						>
							<Text style={styles.signInText}>Sign In</Text>
						</Pressable>
					</View>
				</View>
			</KeyboardAwareScrollView>
		</Layout>
	);
};
