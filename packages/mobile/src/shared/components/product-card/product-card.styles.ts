import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	cardBox: {
		borderColor: COLORS.borderColor,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		justifyContent: 'space-between',
		marginTop: 16,
	},
	priceBox: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		marginBottom: 10,
	},

	inputName: {
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		borderRadius: 8,
	},

	productTitle: {
		fontFamily: 'PoppinsBold',
		fontWeight: 'bold',
		fontSize: 16,
	},
	productText: {
		marginLeft: 5,
	},
	categoryBox: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});
