import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	buttonContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	formContainer: {
		flexGrow: 1,
		height: '100%',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	formTextWrapper: {
		marginTop: 40,
		width: '100%',
		alignItems: 'baseline',
		justifyContent: 'center',
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
	forgotteText: {
		marginTop: 10,
		textAlign: 'center',
		color: COLORS.blue,
	},
});
