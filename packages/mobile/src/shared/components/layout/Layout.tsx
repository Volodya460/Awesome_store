import React from 'react';
import { View, ViewStyle } from 'react-native';
import { styles } from './layout.styles';

type Props = {
	children: React.ReactNode;
	style?: ViewStyle;
	paddingTop?: number;
	paddingBottom?: number;
	paddingHorizontal?: number;
	backgroundColor?: string;
};

export const Layout = ({
	children,
	style,
	paddingTop = 32,
	paddingBottom = 0,
	paddingHorizontal = 16,
	backgroundColor,
}: Props) => {
	const combinedStyle: ViewStyle = {
		...styles.container,
		paddingTop,
		paddingBottom,
		paddingHorizontal,
		backgroundColor: backgroundColor ?? styles.container.backgroundColor,
	};

	return <View style={[combinedStyle, style]}>{children}</View>;
};
