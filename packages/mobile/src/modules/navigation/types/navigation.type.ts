import { Product } from 'src/store/product/types/product.types';

export enum NAVIGATION_KEYS {
	LOGIN = 'LOGIN',
	REGISTER = 'REGISTER',
	VERIFY = 'VERIFY',
	ORDERS = 'ORDERS',
	PRODUCTS = 'PRODUCTS',
	SETTINGS = 'SETTINGS',
	PRODUCTLIST = 'PRODUCTLIST',
	PRODUCTINF = 'PRODUCTINF',
	PROCUTCART = 'PROCUTCART',
	EDITCART = 'EDITCART',
	ORDERSLIST = 'ORDERSLIST',
	ORDERDETAILS = 'ORDERDETAILS',
	EDITCARDORDER = 'EDITCARDORDER',
	SUCCESSSCREEN = 'SUCCESSSCREEN',
	PERSONALINFO = 'PERSONALINFO',
	CHANGEPASSWORD = 'CHANGEPASSWORD',
	SETTINGSLIST = 'SETTINGSLIST',
	FAQ = 'FAQ',
	RESENDVERIFYCODE = 'RESENDVRIFYCODE',
	RESENDPASSWORD = 'RESENDPASSWORD',
}

export type RootStackParamList = {
	[NAVIGATION_KEYS.LOGIN]: undefined;
	[NAVIGATION_KEYS.REGISTER]: undefined;
	[NAVIGATION_KEYS.VERIFY]: { email?: string; space?: string } | undefined;
	[NAVIGATION_KEYS.ORDERS]: undefined;
	[NAVIGATION_KEYS.PRODUCTS]: undefined;
	[NAVIGATION_KEYS.SETTINGS]: undefined;
	[NAVIGATION_KEYS.PRODUCTLIST]: undefined;
	[NAVIGATION_KEYS.PRODUCTINF]: { id: string };
	[NAVIGATION_KEYS.PROCUTCART]: undefined;
	[NAVIGATION_KEYS.EDITCART]: {
		order_detail_id: string;
		product: Product;
		quantity: number;
		payment_status: string | undefined;
		delivery_status: string | undefined;
		source?: string;
	};
	[NAVIGATION_KEYS.ORDERSLIST]: undefined;
	[NAVIGATION_KEYS.ORDERDETAILS]: {
		order_id: string;
		payment_status: string;
		delivery_status: string;
	};
	[NAVIGATION_KEYS.EDITCARDORDER]: {
		order_detail_id: string;
		product: Product;
		quantity: number;
		payment_status: string | undefined;
		delivery_status: string | undefined;
		source?: string;
	};
	[NAVIGATION_KEYS.SUCCESSSCREEN]: undefined;
	[NAVIGATION_KEYS.PERSONALINFO]: undefined;
	[NAVIGATION_KEYS.FAQ]: undefined;
	[NAVIGATION_KEYS.SETTINGSLIST]: undefined;
	[NAVIGATION_KEYS.CHANGEPASSWORD]: undefined;
	[NAVIGATION_KEYS.RESENDVERIFYCODE]: undefined;
	[NAVIGATION_KEYS.RESENDPASSWORD]: { email?: string };
};
