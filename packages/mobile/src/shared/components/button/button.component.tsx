import React from 'react';
import {
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
} from 'react-native';
import { styles } from './button.styles';

type Props = TouchableOpacityProps & {
	title: string;
	icon?: React.ReactNode;
};
export const Button = ({ title, style, icon, ...props }: Props) => (
	<TouchableOpacity style={[styles.button, style]} {...props}>
		{icon && <View style={styles.iconWrapper}>{icon}</View>}
		<Text style={styles.text}>{title}</Text>
	</TouchableOpacity>
);
