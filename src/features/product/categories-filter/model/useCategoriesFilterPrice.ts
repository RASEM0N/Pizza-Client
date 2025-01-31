import { CATEGORY_QUERY } from '~/src/features/product/categories-filter/model/const';
import { useRouteQuery } from '~/src/shared/lib/useRouteQuery';
import { queryToPositiveInt } from '~/src/shared/lib/normalizedQuery';

interface Params {
	min: number;
	max: number;
}

export const useCategoriesFilterPrice = ({ min, max }: Params) => {
	const query = useRoute().query;

	const priceTo = queryToPositiveInt(query[CATEGORY_QUERY.priceTo] as string);
	const priceFrom = queryToPositiveInt(query[CATEGORY_QUERY.priceFrom] as string);

	const price = ref([
		priceTo < min || !priceTo ? min : priceTo, //
		priceFrom > max || !priceFrom ? max : priceFrom,
	]);

	useRouteQuery({
		name: CATEGORY_QUERY.priceFrom,
		query: () => String(price.value[1]),
		delay: 200,
	});

	useRouteQuery({
		name: CATEGORY_QUERY.priceTo,
		query: () => String(price.value[0]),
		delay: 200,
	});

	return {
		price,
	};
};
