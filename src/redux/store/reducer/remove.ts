const remove = ({
    data,
    oldData,
    draft,
}: {
    data: any;
    oldData: any;
    draft: any;
}) => {
    const targetId = typeof data === "object" && data !== null ? data?.id : data;
    if (!!draft?.items) {
        return {
            items: oldData?.items.filter(
                (item: any) =>
                    item?.id !== targetId &&
                    item?.productId !== targetId &&
                    item?.product?.id !== targetId
            ),
        };
    }
    if (!!draft?.data) {
        return {
            data: oldData?.data.filter(
                (item: any) =>
                    item?.id !== targetId &&
                    item?.productId !== targetId &&
                    item?.product?.id !== targetId
            ),
        };
    }
};

export default remove;
