import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	formContainer: {
		flexGrow: 1,

		justifyContent: 'space-between',
	},

	formInput: {
		paddingHorizontal: 20,
		paddingVertical: 12,
	},
	formButton: {
		marginTop: 32,
	},
	textDelete: {
		color: COLORS.red,
		textAlign: 'center',

		fontWeight: 'bold',
	},
	disabledInput: {
		backgroundColor: COLORS.opacityGrey,
		color: COLORS.opacityBlack,
		paddingHorizontal: 20,
		paddingVertical: 12,
		fontSize: 14,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: COLORS.borderColor,
	},
});
