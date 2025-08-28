import * as React from 'react';
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { ActivityIndicator, Keyboard, Text, View } from 'react-native';
import { Layout } from 'src/shared/components/layout/Layout';
import { Button } from 'src/shared/components/button/button.component';
import { styles } from './verify-screen.styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAuthStore } from 'src/store/auth/auth.store';
import { useNavigation } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';
import Checkmark from '../../../../../assets/images/checkmark.svg';
import { showToast } from 'src/shared/utils/toast';

type VerifyRouteProp = RouteProp<
	RootStackParamList,
	typeof NAVIGATION_KEYS.VERIFY
>;

const CELL_COUNT = 4;
export const VerifyScreen = () => {
	const route = useRoute<VerifyRouteProp>();
	const email = route.params?.email;
	const space = route.params?.space;
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const verify = useAuthStore((state) => state.verify);
	const isLoading = useAuthStore((state) => state.isLoading);
	const isVerified = useAuthStore((state) => state.isVerified);

	const [value, setValue] = React.useState('');

	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	});

	const onSubmit = async () => {
		Keyboard.dismiss();

		if (value.length === CELL_COUNT) {
			try {
				await verify({ verificationCode: value });
				if (space) {
					navigation.navigate(NAVIGATION_KEYS.RESENDPASSWORD, {
						email,
					});
				}
			} catch (error) {
				navigation.navigate(NAVIGATION_KEYS.LOGIN);
				return showToast('Incorect code', 'error');
			}
		}
	};
	const navigate = () => {
		navigation.navigate(NAVIGATION_KEYS.LOGIN);
	};

	return (
		<Layout paddingTop={140} paddingBottom={50}>
			<KeyboardAwareScrollView
				keyboardShouldPersistTaps="handled"
				extraScrollHeight={5}
				onScrollBeginDrag={Keyboard.dismiss}
				contentContainerStyle={{
					flexGrow: 1,
				}}
			>
				{isVerified ? (
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
								Account successfully registered!
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
					<>
						<Text style={styles.formTitle}>Email Verification</Text>
						<Text style={styles.formText}>
							Please type the code from the email
						</Text>
						<View style={styles.formBox}>
							<CodeField
								ref={ref}
								{...props}
								value={value}
								onChangeText={setValue}
								cellCount={CELL_COUNT}
								rootStyle={styles.inpuBox}
								keyboardType="number-pad"
								textContentType="oneTimeCode"
								renderCell={({ index, symbol, isFocused }) => (
									<View
										key={index}
										style={[
											styles.codeInput,
											isFocused && styles.focusCell,
										]}
										onLayout={getCellOnLayoutHandler(index)}
									>
										<Text style={styles.cellText}>
											{symbol ||
												(isFocused ? <Cursor /> : null)}
										</Text>
									</View>
								)}
							/>

							{isLoading ? (
								<ActivityIndicator
									size="large"
									color="#007AFF"
									style={{ marginTop: 24 }}
								/>
							) : (
								<Button
									title="Submit"
									onPress={onSubmit}
									style={{ marginTop: 24 }}
								/>
							)}
						</View>
					</>
				)}
			</KeyboardAwareScrollView>
		</Layout>
	);
};
