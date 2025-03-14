import type { Cart, CartItem, CartDetail } from '../model/types';
import { defaultMapProductTypes } from '@entities/product/@x';

export const getCartItemTotalPrice = (item: CartItem): number => {
	return (getCartItemIngredientPrice(item) + item.productItem.price) * item.quantity;
};

export const getCartItemIngredientPrice = (item: CartItem): number => {
	return item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
};

export const getCartDetails = (cart: Cart): CartDetail[] => {
	return cart.items.map((item) => ({
		id: item.id,
		quantity: item.quantity,
		name: item.productItem.Product.name,
		imgUrl: item.productItem.Product.imgUrl,
		pizzaSize: item.productItem.size,
		pizzaType: item.productItem.pizzaType,
		disabled: false,
		price: getCartItemTotalPrice(item),
		ingredients: item.ingredients.map((v) => ({ name: v.name, price: v.price })),
	}));
};

export const getCartDetailDescription = ({
	ingredients,
	pizzaSize,
	pizzaType,
}: CartDetail) => {
	const details = [];

	if (pizzaSize && pizzaType) {
		const typeName = defaultMapProductTypes()[pizzaType];
		details.push(`${typeName} ${pizzaSize} см`);
	}

	if (ingredients) {
		details.push(...ingredients.map((ingredient) => ingredient.name));
	}

	return details.join(', ');
};
