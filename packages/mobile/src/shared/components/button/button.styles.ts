import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	button: {
		backgroundColor: COLORS.blue,
		paddingVertical: 14,
		borderRadius: 8,
		alignItems: 'center',
	},
	text: {
		color: COLORS.white,
		fontWeight: '600',
		fontSize: 16,
	},
	iconWrapper: {
		marginRight: 8,
	},
});
