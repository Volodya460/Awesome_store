import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

import { styles } from './modal.styles';

export type ConfirmModalProps = {
	visible: boolean;
	message: string;
	onConfirm: () => void;
	onCancel: () => void;
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
	visible,
	message,
	onConfirm,
	onCancel,
}) => {
	return (
		<Modal
			visible={visible}
			transparent
			animationType="fade"
			onRequestClose={onCancel}
		>
			<View style={styles.overlay}>
				<View style={styles.container}>
					<Text style={styles.title}>{message}</Text>
					<View style={styles.buttonContainer}>
						<Pressable
							style={[styles.button, styles.cancelButton]}
							onPress={onCancel}
						>
							<Text style={styles.buttonText}>No</Text>
						</Pressable>
						<Pressable
							style={[styles.button, styles.confirmButton]}
							onPress={onConfirm}
						>
							<Text style={styles.buttonText}>Yes</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</Modal>
	);
};
