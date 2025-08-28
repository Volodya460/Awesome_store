import { ActivityIndicator, Keyboard, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { z } from 'zod';
import { Layout } from 'src/shared/components/layout/Layout';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { passwordSchema } from './password.schemas';
import { Input } from 'src/shared/components/input';
import { useUserStore } from 'src/store/user/user.store';
import { COLORS } from 'src/shared/styles';
import { Button } from 'src/shared/components/button/button.component';
import { styles } from './change-password.screen.styles';

type FormData = z.infer<typeof passwordSchema>;

export const ChangePassword = () => {
	const isLoading = useUserStore((state) => state.isLoading);
	const changePassword = useUserStore((state) => state.changePassword);
	const { control, handleSubmit, reset } = useForm<FormData>({
		resolver: zodResolver(passwordSchema),
		defaultValues: {
			currentPassword: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = async (data: FormData) => {
		await changePassword({
			currentPassword: data.currentPassword,
			newPassword: data.password,
		});
		reset;
	};
	const keyboardHide = () => {
		Keyboard.dismiss();
	};
	return (
		<Layout paddingBottom={40}>
			<KeyboardAwareScrollView
				keyboardShouldPersistTaps="handled"
				extraScrollHeight={5}
				onScrollBeginDrag={keyboardHide}
				contentContainerStyle={styles.formContainer}
			>
				<View>
					<Input
						name="currentPassword"
						control={control}
						label="Current Password"
						defaultValue=""
					/>
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
					<ActivityIndicator
						size="large"
						color={COLORS.blue}
						style={styles.formButton}
					/>
				) : (
					<Button
						title="Save"
						onPress={handleSubmit(onSubmit)}
						style={styles.formButton}
					/>
				)}
			</KeyboardAwareScrollView>
		</Layout>
	);
};
