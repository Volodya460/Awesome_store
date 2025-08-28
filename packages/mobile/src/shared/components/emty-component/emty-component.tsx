import { Image, Text, View } from 'react-native';
import { IMAGE_MAP } from 'src/shared/constants/IMAGE_MAP';
import { styles } from './emty-component.styles';

interface EmtyComponentProp {
	text: string;
}

export const EmtyComponent = ({ text }: EmtyComponentProp) => {
	return (
		<View>
			<Image source={IMAGE_MAP.logo} style={styles.login} />
			<Text style={styles.text}>{text}</Text>
		</View>
	);
};
