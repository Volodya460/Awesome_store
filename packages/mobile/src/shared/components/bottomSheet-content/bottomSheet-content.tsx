import React from 'react';
import { Pressable, Text } from 'react-native';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { PaymentStatus, DeliveryStatus } from 'src/store/order/types/types';
import { styles } from './bottomSheet-content.styles';

export type FilterType = 'payment' | 'delivery' | 'date' | null;

interface FilterSheetContentProps {
	currentFilterType: FilterType;
	handleSelectPayment: (value?: PaymentStatus) => void;
	handleSelectDelivery: (value?: DeliveryStatus) => void;
	handleSelectDate: (value: 'asc' | 'desc') => void;
}

export const FilterSheetContent: React.FC<FilterSheetContentProps> = ({
	currentFilterType,
	handleSelectPayment,
	handleSelectDelivery,
	handleSelectDate,
}) => {
	if (currentFilterType === 'payment') {
		return (
			<BottomSheetView style={styles.container}>
				<Text style={styles.title}> Payment Status</Text>
				<Pressable
					style={styles.option}
					onPress={() => handleSelectPayment(undefined)}
				>
					<Text style={styles.optionText}>All</Text>
				</Pressable>
				<Pressable
					style={styles.option}
					onPress={() => handleSelectPayment('PENDING')}
				>
					<Text style={styles.optionText}>Pending</Text>
				</Pressable>
				<Pressable
					style={styles.option}
					onPress={() => handleSelectPayment('COMPLETE')}
				>
					<Text style={styles.optionText}>Complete</Text>
				</Pressable>
				<Pressable
					style={styles.option}
					onPress={() => handleSelectPayment('FAILED')}
				>
					<Text style={styles.optionText}>Failed</Text>
				</Pressable>
			</BottomSheetView>
		);
	} else if (currentFilterType === 'delivery') {
		return (
			<BottomSheetView style={styles.container}>
				<Text style={styles.title}> Delivery Status</Text>
				<Pressable
					style={styles.option}
					onPress={() => handleSelectDelivery(undefined)}
				>
					<Text style={styles.optionText}>All</Text>
				</Pressable>
				<Pressable
					style={styles.option}
					onPress={() => handleSelectDelivery('DELIVERED')}
				>
					<Text style={styles.optionText}>Delivered</Text>
				</Pressable>
				<Pressable
					style={styles.option}
					onPress={() => handleSelectDelivery('IN_TRANSIT')}
				>
					<Text style={styles.optionText}>In Transit</Text>
				</Pressable>
				<Pressable
					style={styles.option}
					onPress={() => handleSelectDelivery('PENDING')}
				>
					<Text style={styles.optionText}>Pending</Text>
				</Pressable>
			</BottomSheetView>
		);
	} else if (currentFilterType === 'date') {
		return (
			<BottomSheetView style={styles.container}>
				<Text style={styles.title}> Date Order</Text>
				<Pressable
					style={styles.option}
					onPress={() => handleSelectDate('asc')}
				>
					<Text style={styles.optionText}>Asc</Text>
				</Pressable>
				<Pressable
					style={styles.option}
					onPress={() => handleSelectDate('desc')}
				>
					<Text style={styles.optionText}>Desc</Text>
				</Pressable>
			</BottomSheetView>
		);
	}
	return null;
};
