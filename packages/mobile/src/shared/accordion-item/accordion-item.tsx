import React, { useState, useCallback } from 'react';
import { Text, Pressable, View, LayoutChangeEvent } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	runOnJS,
} from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from './accordion-item.styles';

interface AccordionItemProps {
	title: string;
	children: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
	title,
	children,
}) => {
	const [contentHeight, setContentHeight] = useState(0);
	const [isOpenState, setIsOpenState] = useState(false);
	const isOpen = useSharedValue(0);

	const toggle = useCallback(() => {
		const next = isOpen.value ? 0 : 1;
		isOpen.value = withTiming(next, { duration: 300 }, () => {
			runOnJS(setIsOpenState)(!!next);
		});
	}, []);

	const onContentLayout = (e: LayoutChangeEvent) => {
		setContentHeight(e.nativeEvent.layout.height);
	};

	const animatedStyle = useAnimatedStyle(() => ({
		height: withTiming(isOpen.value * contentHeight, { duration: 300 }),
		overflow: 'hidden',
	}));

	return (
		<View style={styles.container}>
			<Pressable onPress={toggle} style={styles.header}>
				<Text style={styles.title}>{title}</Text>
				<Ionicons
					name={isOpenState ? 'chevron-down' : 'chevron-forward'}
					size={20}
					color="#333"
				/>
			</Pressable>

			{/* Контент с анимацией */}
			<Animated.View style={[animatedStyle]}>
				<View>{children}</View>
			</Animated.View>

			{/* Скрытый View для измерения контента */}
			<View
				style={styles.hiddenContent}
				onLayout={onContentLayout}
				pointerEvents="none"
			>
				{children}
			</View>
		</View>
	);
};
