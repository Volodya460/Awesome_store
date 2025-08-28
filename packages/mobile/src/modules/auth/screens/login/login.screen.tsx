import * as React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
	ActivityIndicator,
	Keyboard,
	Pressable,
	Text,
	View,
	Image,
} from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { loginSchema } from '../../auth.schemas';
import { Layout } from 'src/shared/components/layout/Layout';
import { Input } from 'src/shared/components/input';
import { Button } from 'src/shared/components/button/button.component';
import { styles } from './login-screen.styles';
import { useAuthStore } from 'src/store/auth/auth.store';
import { showToast } from 'src/shared/utils/toast';
import { IMAGE_MAP } from 'src/shared/constants/IMAGE_MAP';
import { COLORS } from 'src/shared/styles';

type FormData = z.infer<typeof loginSchema>;

export const LoginScreen = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const login = useAuthStore((state) => state.login);
	const email = useAuthStore((state) => state.email);
	const resendVerification = useAuthStore(
		(state) => state.resendVerification,
	);
	const isLoading = useAuthStore((state) => state.isLoading);

	const { control, handleSubmit, reset } = useForm<FormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const onSubmit = async (data: FormData) => {
		keyboardHide();
		const result = await login(data);
		if (result === 'unverified') {
			if (email) {
				try {
					await resendVerification(email);
					navigation.navigate(NAVIGATION_KEYS.VERIFY);
					showToast('Code sent', 'Check your email again', 'info');
				} catch (error) {
					showToast('Error sending code', error, 'error');
				}
			}
		}

		reset();
	};
	const keyboardHide = () => {
		Keyboard.dismiss();
	};
	return (
		<Layout paddingTop={140}>
			<KeyboardAwareScrollView
				keyboardShouldPersistTaps="handled"
				extraScrollHeight={5}
				onScrollBeginDrag={keyboardHide}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'space-between',
				}}
			>
				<Image
					source={IMAGE_MAP.logo}
					style={{
						width: 245,
						height: 116,
						resizeMode: 'contain',
						alignSelf: 'center',
						marginBottom: 20,
					}}
				/>

				<View style={styles.formContainer}>
					<Input
						name="email"
						control={control}
						defaultValue=""
						label="Email"
					/>
					<Input
						name="password"
						control={control}
						defaultValue=""
						label="Password"
						secureTextEntry={true}
					/>
					<View style={styles.buttonContainer}>
						{isLoading ? (
							<ActivityIndicator
								size="large"
								color={COLORS.blue}
							/>
						) : (
							<Button
								title="Sign in"
								onPress={handleSubmit(onSubmit)}
								style={{ marginTop: 16 }}
							/>
						)}

						<View style={styles.formTextWrapper}>
							<Text style={styles.formText}>
								Have you already registered?
							</Text>
							<Pressable
								onPress={() =>
									navigation.navigate(
										NAVIGATION_KEYS.REGISTER,
									)
								}
							>
								<Text style={styles.signInText}>Sign up</Text>
							</Pressable>
						</View>
						<Pressable
							onPress={() =>
								navigation.navigate(
									NAVIGATION_KEYS.RESENDVERIFYCODE,
								)
							}
						>
							<Text style={styles.forgotteText}>
								Forgotten password
							</Text>
						</Pressable>
					</View>
				</View>
			</KeyboardAwareScrollView>
		</Layout>
	);
};
