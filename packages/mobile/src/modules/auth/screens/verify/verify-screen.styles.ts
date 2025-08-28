import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	inpuBox: {
		width: 300,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignSelf: 'center',
	},
	formBox: { flexGrow: 1, justifyContent: 'space-between' },
	formTitle: {
		textAlign: 'center',
		marginBottom: 40,
		fontWeight: 700,
		fontSize: 16,
	},
	formText: {
		textAlign: 'center',
		marginBottom: 49,
		fontWeight: 500,
		fontSize: 14,
		color: COLORS.whiteGrey,
	},
	codeInput: {
		width: 60,
		height: 70,
		borderColor: COLORS.borderColor,
		borderWidth: 1,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 5,
		backgroundColor: COLORS.white,
	},
	focusCell: {
		borderColor: '#007AFF',
	},
	cellText: {
		fontSize: 24,
		color: '#000',
	},
	checkmarkBox: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	checkmarkTitle: {
		textAlign: 'center',
	},
});
