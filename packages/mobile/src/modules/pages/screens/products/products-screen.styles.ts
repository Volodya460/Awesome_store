import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	cartSvgBox: {
		position: 'relative',
	},

	cartNumber: {
		position: 'absolute',
		borderRadius: 50,
		backgroundColor: COLORS.red,
		paddingHorizontal: 5,
		paddingVertical: 2,
		color: COLORS.white,
		top: 10,
		right: 10,
		fontSize: 10,
	},
});
