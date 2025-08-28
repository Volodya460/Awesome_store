import { StyleSheet } from 'react-native';
import { COLORS } from 'src/shared/styles';

export const styles = StyleSheet.create({
	cartTitle: {
		fontFamily: 'PoppinsBold',
		fontWeight: 'bold',
		fontSize: 16,
	},
	filterBox: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginVertical: 20,
	},
	container: { flexGrow: 1, width: '100%' },
	textFilter: {
		color: COLORS.green,
		marginTop: 5,
	},
});
