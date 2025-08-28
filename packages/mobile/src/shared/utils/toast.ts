import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

export const showToast = (
	title: string,
	message?: string | unknown,
	type: ToastType = 'error',
) => {
	const description =
		typeof message === 'string'
			? message
			: message instanceof Error
				? message.message
				: 'Unexpected error';

	Toast.show({
		type,
		text1: title,
		text2: description,
	});
};
