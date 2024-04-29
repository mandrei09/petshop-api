export const sortAndPaginate = async (filters: any, query: any) => {
  try {
    if (filters.sort) {
      let sortOptions = filters.sort
      if (filters.sortDirection) {
        if (filters.sortDirection == 'desc') {
          sortOptions = '-' + sortOptions
        }
      }
      query = query.sort(sortOptions)
    }

    if (filters.pageSize && filters.pageIndex) {
      const pageSize = parseInt(filters.pageSize)
      const pageIndex = parseInt(filters.pageIndex) - 1
      query = query.skip(pageSize * pageIndex).limit(pageSize)
    }
    return query
  }
  catch(error) {
    console.log(error)
  }
}