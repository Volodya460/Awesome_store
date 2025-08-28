import { Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Layout } from 'src/shared/components/layout/Layout';
import Checkmark from '../../../../../../../assets/images/checkmark.svg';
import { Button } from 'src/shared/components/button/button.component';
import { styles } from './success-screen.styles';
import Done from '../../../../../../../assets/images/ok.svg';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from 'src/modules/navigation/types';

export const SuccessScreen = () => {
	const navigation =
		useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	const handleOkPress = () => {
		navigation.navigate(NAVIGATION_KEYS.ORDERSLIST);
	};
	return (
		<Layout style={styles.layout}>
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
						Payment successful!
					</Text>
				</View>

				<Button
					title="Ok"
					icon={<Done />}
					style={styles.buttonDone}
					onPress={handleOkPress}
				/>
			</View>
		</Layout>
	);
};
