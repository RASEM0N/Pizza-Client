import { useRouteQuery } from '~/src/shared/lib/useRouteQuery';

type QueryValue = string | number;
type Params = { queryName: string };

export const useRouteQueryArray = ({ queryName }: Params) => {
	const values = reactive(new Set<QueryValue>([]));
	const query = computed(() => [...values.values()].join(','));

	const select = (value: QueryValue, add: boolean) => {
		add ? values.add(value) : values.delete(value);
	};

	const toggle = (value: QueryValue) => {
		select(value, !has(value));
	};

	const has = (value: QueryValue) => {
		return values.has(value);
	};

	useRouteQuery({ name: queryName, query });

	return {
		has,
		select,
		toggle,
		query,
		values,
	};
};
