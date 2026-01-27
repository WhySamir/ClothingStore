const update = ({ data, loadingState, oldData, draft }: any) => {
	if (draft?.items) {
		const findIndex = oldData?.items?.findIndex(
			(item: any) => item?.id === data?.id
		);
		if (findIndex > -1 && !!oldData?.items[findIndex]) {
			draft.items[findIndex] = {
				...oldData?.items[findIndex],
				...data,
			};
			draft.loading = false;
			return draft;
		} else {
			return oldData;
		}
	} else {
		if (!!loadingState) {
			if (Array.isArray(oldData?.data)) {
				const findIndex = oldData?.data?.findIndex(
					(item: any) => item?.id === data?.id
				);
				if (findIndex > -1 && !!oldData?.data[findIndex]) {
					draft.data[findIndex] = data;
				}
				draft.loading = false;
				return draft;
			} else {
				return {
					...oldData,
					data: { ...oldData?.data, ...data },
					loading: false,
				};
			}
		} else {
			return {
				...oldData,
				...data,
			};
		}
	}
};

export default update;
