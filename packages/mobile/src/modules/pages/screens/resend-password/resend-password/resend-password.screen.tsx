import { ActivityIndicator, Image, Keyboard, View, Text } from 'react-native';
import { z } from 'zod';
import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { passwordSchema } from '../shcemas/password.schemas';
import { Layout } from 'src/shared/components/layout/Layout';
import { Button } from 'src/shared/components/button/button.component';
import { COLORS } from 'src/shared/styles';
import { Input } from 'src/shared/components/input';
import { useAuthStore } from 'src/store/auth/auth.store';
import { useNavigation } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { styles } from './resend-password.screen.styles';
import { IMAGE_MAP } from 'src/shared/constants/IMAGE_MAP';
import { useState } from 'react';
import Checkmark from '../../../../../../assets/images/checkmark.svg';
import { showToast } from 'src/shared/utils/toast';

type ResendPasswordRouteProp = RouteProp<
	RootStackParamList,
	typeof NAVIGATION_KEYS.RESENDPASSWORD
>;

type FormData = z.infer<typeof passwordSchema>;
export const ResendPassword = () => {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const route = useRoute<ResendPasswordRouteProp>();
	const email = route.params?.email;
	const resetPassword = useAuthStore((state) => state.resetPassword);
	const [resend, setResend] = useState(false);

	const isLoading = useAuthStore((state) => state.isLoading);
	const { control, handleSubmit, reset } = useForm<FormData>({
		resolver: zodResolver(passwordSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (data: FormData) => {
		if (!email) {
			showToast('Email is required', 'error');
			return;
		}
		const { password } = data;
		keyboardHide();
		try {
			await resetPassword({ email, newPassword: password });
			setResend(true);
		} catch (error) {
			return showToast('Incorect email', 'error');
		}

		reset;
	};
	const keyboardHide = () => {
		Keyboard.dismiss();
	};
	const navigate = () => {
		navigation.navigate(NAVIGATION_KEYS.LOGIN);
	};
	return (
		<Layout>
			{resend ? (
				<View style={styles.formBox}>
					<View style={styles.checkmarkBox}>
						<Checkmark
							style={{
								width: 120,
								height: 120,
								alignSelf: 'center',
								marginBottom: 20,
							}}
						/>
						<Text style={styles.checkmarkTitle}>
							Password successfully changed!
						</Text>
					</View>

					{isLoading ? (
						<ActivityIndicator
							size="large"
							color="#007AFF"
							style={{ marginTop: 24 }}
						/>
					) : (
						<Button
							title="Log In"
							onPress={navigate}
							style={{ marginTop: 24 }}
						/>
					)}
				</View>
			) : (
				<View style={styles.formContainer}>
					<Image
						source={IMAGE_MAP.logo}
						style={{
							width: 245,
							height: 116,
							resizeMode: 'contain',
							alignSelf: 'center',
						}}
					/>
					<View>
						<Input
							name="password"
							control={control}
							defaultValue=""
							label="New Password"
							secureTextEntry={true}
						/>
						<Input
							name="confirmPassword"
							control={control}
							defaultValue=""
							label="Confirm New Password"
							secureTextEntry={true}
						/>
					</View>

					{isLoading ? (
						<ActivityIndicator size="large" color={COLORS.blue} />
					) : (
						<Button title="Save" onPress={handleSubmit(onSubmit)} />
					)}
				</View>
			)}
		</Layout>
	);
};
