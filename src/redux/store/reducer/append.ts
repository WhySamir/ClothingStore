const append = ({ data, loadingState, oldData, draft }: { data: any, loadingState: boolean, oldData: any, draft: any }) => {
  if (!!loadingState) {
    if (draft?.items) {
      if (data?.items && Array.isArray(data?.items)) {
        return {
          ...oldData,
          ...data,
          items: [...oldData?.items, ...data?.items],
          loading: false,
        }
      } else {
        return {
          ...oldData,
          items: [...oldData?.items, data],
          totalItems: oldData?.totalItems + 1,
          loading: false,
        }
      }
    } else {
      return {
        ...oldData,
        data: [...oldData?.data, data],
        loading: false,
      }
    }
  } else {
    return [...oldData, data]
  }
}

export default append
