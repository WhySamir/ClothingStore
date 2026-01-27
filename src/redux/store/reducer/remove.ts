const remove = ({
    data,
    oldData,
    draft,
}: {
    data: any;
    oldData: any;
    draft: any;
}) => {
    if (!!draft?.items) {
        return {
            items: oldData?.items.filter((item: any) => item?.id !== data?.id),
        };
    }
    if (!!draft?.data) {
        return {
            data: oldData?.data.filter((item: any) => item?.id !== data?.id),
        };
    }
};

export default remove;
