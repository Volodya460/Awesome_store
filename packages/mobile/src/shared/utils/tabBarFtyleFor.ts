import {
	getFocusedRouteNameFromRoute,
	ParamListBase,
	RouteProp,
} from '@react-navigation/native';

export const getTabBarStyleFor = (
	route: RouteProp<ParamListBase, string>,
	baseScreenName: string,
): {
	height: number;
	paddingTop: number;
	display: 'flex' | 'none';
} => {
	const routeName = getFocusedRouteNameFromRoute(route) ?? baseScreenName;
	return {
		height: 80,
		paddingTop: 10,
		display: (routeName === baseScreenName ? 'flex' : 'none') as
			| 'flex'
			| 'none',
	};
};
