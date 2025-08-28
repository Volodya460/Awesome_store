import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	contentContainerStyle: {
		flexGrow: 1,
		backgroundColor: COLORS.backgroundColor,
		justifyContent: 'center',
		paddingBottom: 40,
	},
	formContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	formTitle: {
		textAlign: 'center',
		fontFamily: 'Poppins',
		fontSize: 16,
		fontWeight: 700,
		marginBottom: 40,
	},
	formTextWrapper: {
		marginTop: 40,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'baseline',
		alignContent: 'center',

		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	formText: {
		fontFamily: 'Poppins',
		fontSize: 14,
		marginRight: 4,
	},
	signInText: {
		fontSize: 14,
		color: COLORS.grey,
		fontWeight: '600',
	},

	formInput: {
		paddingHorizontal: 20,
		paddingVertical: 12,
	},
	formButton: {
		marginTop: 16,
	},
});
