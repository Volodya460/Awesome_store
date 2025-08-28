import { COLORS } from 'src/shared/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.4)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		width: '80%',
		backgroundColor: '#fff',
		padding: 24,
		borderRadius: 12,
		alignItems: 'center',
	},
	title: {
		fontSize: 16,
		fontWeight: '600',
		marginBottom: 24,
		textAlign: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-around',
	},
	button: {
		flex: 1,
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: 'center',
		marginHorizontal: 4,
	},
	cancelButton: {
		backgroundColor: COLORS.red,
	},
	confirmButton: {
		backgroundColor: COLORS.blue,
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
});
