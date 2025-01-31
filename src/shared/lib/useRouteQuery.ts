import type { Ref } from 'vue';

interface Params {
	name: string;
	query: Ref<string>;
}

export const useRouteQuery = ({ name, query }: Params) => {
	const route = useRoute();
	const router = useRouter();

	watch(query, (value) => {
		if (value) {
			return router.push({ query: { ...route.query, [name]: value } });
		}

		if (route.query[name]) {
			return router.push({ query: { ...route.query, [name]: undefined } });
		}
	});
};
