import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Layout } from 'src/shared/components/layout/Layout';
import { resendSchema } from '../shcemas/resend.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ActivityIndicator, Image, Keyboard, View } from 'react-native';
import { Input } from 'src/shared/components/input';
import { COLORS } from 'src/shared/styles';
import { useAuthStore } from 'src/store/auth/auth.store';
import { Button } from 'src/shared/components/button/button.component';
import { IMAGE_MAP } from 'src/shared/constants/IMAGE_MAP';
import { styles } from './resend-code.screen.styles';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import { showToast } from 'src/shared/utils/toast';

type FormData = z.infer<typeof resendSchema>;
export const ResendCode = () => {
	const isLoading = useAuthStore((state) => state.isLoading);
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const resendVerification = useAuthStore(
		(state) => state.resendVerification,
	);
	const { control, handleSubmit, reset } = useForm<FormData>({
		resolver: zodResolver(resendSchema),
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = async (data: FormData) => {
		const { email } = data;
		keyboardHide();
		try {
			await resendVerification(email);
			navigation.navigate(NAVIGATION_KEYS.VERIFY, {
				email,
				space: 'resend',
			});
			showToast('Code sent', 'Check your email again', 'info');
		} catch (error) {
			showToast('Error sending code', error, 'error');
			navigation.navigate(NAVIGATION_KEYS.LOGIN);
		}

		reset();
	};

	const keyboardHide = () => {
		Keyboard.dismiss();
	};
	return (
		<Layout>
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
				<Input
					name="email"
					control={control}
					defaultValue=""
					label="Email"
				/>
				{isLoading ? (
					<ActivityIndicator size="large" color={COLORS.blue} />
				) : (
					<Button
						title="Send"
						onPress={handleSubmit(onSubmit)}
						style={{ marginTop: 16 }}
					/>
				)}
			</View>
		</Layout>
	);
};
