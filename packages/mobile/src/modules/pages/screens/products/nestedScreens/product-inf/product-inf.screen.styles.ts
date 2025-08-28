import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	cardBox: {
		flexGrow: 1,
		justifyContent: 'space-between',
		paddingBottom: 40,
	},
	cardTitle: {
		fontFamily: 'PoppinsBold',
		fontWeight: 'bold',
		fontSize: 16,
	},
	cardItem: {
		marginBottom: 10,
	},
	amountBox: {
		width: 166,
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	amountInput: {
		textAlign: 'center',
		borderWidth: 1,
		borderColor: COLORS.borderColor,
		borderRadius: 10,
		textAlignVertical: 'center',

		width: 40,
		height: 44,
		paddingHorizontal: 8,
		paddingVertical: 8,
	},
	amountButton: {
		paddingHorizontal: 20,
		paddingVertical: 15,
		borderRadius: 100,
	},
	textDelete: {
		fontFamily: 'Poppins',
		textAlign: 'center',
		color: COLORS.red,
		marginTop: 30,
	},
	disabled: {
		opacity: 0.5,
	},
});
