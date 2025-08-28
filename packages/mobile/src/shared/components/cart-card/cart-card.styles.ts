import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	cardBox: {
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: COLORS.whiteGrey,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		justifyContent: 'space-between',
		marginTop: 16,
	},
	priceBox: { flexDirection: 'row', marginTop: 10 },

	infBox: { flexDirection: 'row', alignItems: 'center' },

	productTitle: {
		fontFamily: 'PoppinsBold',
		fontWeight: 'bold',
		fontSize: 16,
	},
	productText: {
		marginLeft: 5,
	},
	amountBox: {
		marginLeft: 5,
		flexDirection: 'row',
		alignItems: 'center',
	},
	categoryBox: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	disabledButton: {
		opacity: 0.5,
	},
});
