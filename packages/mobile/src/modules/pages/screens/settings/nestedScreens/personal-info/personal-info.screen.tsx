import {
	ActivityIndicator,
	Keyboard,
	Pressable,
	Text,
	View,
} from 'react-native';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Layout } from 'src/shared/components/layout/Layout';
import { updateSchems } from './update.schemas';
import { Input } from 'src/shared/components/input';
import { COLORS } from 'src/shared/styles';
import { Button } from 'src/shared/components/button/button.component';
import { styles } from './personal-info-screen.styles';
import { useUserStore } from 'src/store/user/user.store';
import { useEffect, useState } from 'react';
import { ConfirmModal } from 'src/shared/components/modal/modal';
import { useAuthStore } from 'src/store/auth/auth.store';

type FormData = z.infer<typeof updateSchems>;
export const PersonalInfo = () => {
	const isLoading = useUserStore((state) => state.isLoading);
	const user = useUserStore((state) => state.user);
	const getUserInfo = useUserStore((state) => state.getUserInfo);
	const updateUser = useUserStore((state) => state.updateUser);
	const [isModalVisible, setModalVisible] = useState(false);
	const deleteUser = useUserStore((state) => state.deleteUser);
	const resetState = useAuthStore((state) => state.reset);
	const { control, handleSubmit, reset } = useForm<FormData>({
		resolver: zodResolver(updateSchems),
		defaultValues: {
			username: '',
			email: '',
			phone: '',
			shippingAddress: '',
		},
	});

	useEffect(() => {
		getUserInfo();
	}, [getUserInfo]);

	useEffect(() => {
		if (user) {
			reset({
				username: user.username,
				email: user.email,
				phone: user.phone,
				shippingAddress: user.shippingAddress,
			});
		}
	}, [user, reset]);

	const keyboardHide = () => {
		Keyboard.dismiss();
	};

	const onSubmit = async (data: FormData) => {
		keyboardHide();
		const { username, phone, shippingAddress } = data;
		const newData = { username, phone, shippingAddress };
		await updateUser(newData);
	};
	const handleDeletePress = () => {
		setModalVisible(true);
	};
	const handleCancelDelete = () => {
		setModalVisible(false);
	};

	const handleConfirmDelete = async () => {
		setModalVisible(false);
		try {
			await deleteUser();
			resetState();
		} catch (error) {
			console.error(error);
		}
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
						name="email"
						control={control}
						defaultValue=""
						label="Email"
						editable={false}
						style={styles.disabledInput}
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
						name="shippingAddress"
						control={control}
						defaultValue=""
						label="Shipping address"
					/>
				</View>
				<Pressable>
					<Text style={styles.textDelete} onPress={handleDeletePress}>
						Delete Account
					</Text>
				</Pressable>

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
			<ConfirmModal
				visible={isModalVisible}
				message="Are you sure you want to delete your account?"
				onConfirm={handleConfirmDelete}
				onCancel={handleCancelDelete}
			/>
		</Layout>
	);
};
