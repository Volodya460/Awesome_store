import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		marginBottom: 8,
		backgroundColor: '#f4f4f4',
		borderRadius: 8,
		overflow: 'hidden',
	},
	header: {
		padding: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	hiddenContent: {
		position: 'absolute',
		opacity: 0,
		zIndex: -1,
	},
});
