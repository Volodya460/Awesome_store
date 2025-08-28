import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	container: {
		position: 'relative',
		marginBottom: 40,
	},
	input: {
		width: '100%',
		backgroundColor: COLORS.white,
		paddingHorizontal: 20,
		paddingVertical: 12,
		fontSize: 14,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: COLORS.borderColor,
	},
	label: {
		color: COLORS.whiteGrey,
		marginBottom: 6,
		fontSize: 14,
	},
	focused: {
		borderWidth: 1,
	},
	wrong: {
		borderWidth: 1,
		borderColor: COLORS.red,
	},
	correct: {
		borderWidth: 1,
	},
	inputWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative',
	},
	icon: {
		position: 'absolute',
		right: 10,
		top: 30,
		padding: 4,
		zIndex: 1,
	},
});
