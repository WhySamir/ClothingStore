const prepend = ({ data, loadingState, oldData, draft } : {
  data: any, loadingState: boolean, oldData: any, draft: any
}) => {
  if (!!loadingState) {
    if (draft?.items) {
      if (data?.items && Array.isArray(data?.items)) {
        return {
          ...data,
          ...oldData,
          items: [...data?.items, ...oldData?.items],
          loading: false,
        }
      } else {
        return {
          ...oldData,
          items: [data, ...oldData?.items],
          totalItems: oldData?.totalItems + 1,
          loading: false,
        }
      }
    } else {
      return {
        ...oldData,
        data: [data, ...oldData?.data],
        loading: false,
      }
    }
  } else {
    return [data, ...oldData]
  }
}

export default prepend
