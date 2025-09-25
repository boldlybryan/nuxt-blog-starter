export interface PaginationOptions {
  currentPage?: number
  postsPerPage?: number
  collection?: string
}

export interface PaginationResult {
  pages: any[]
  currentPage: number
  totalPages: number
  totalCount: number
  postsPerPage: number
}

export const usePagination = async (options: PaginationOptions = {}): Promise<PaginationResult> => {
  const {
    currentPage = 1,
    postsPerPage = 5,
    collection = 'content'
  } = options

  const { data: result } = await useAsyncData(`${collection}-page-${currentPage}-${postsPerPage}`, async () => {
    const [pages, totalCount] = await Promise.all([
      queryCollection(collection as 'content')
        .where('draft', '=', false)
        .order('date', 'DESC')
        .skip((currentPage - 1) * postsPerPage)
        .limit(postsPerPage)
        .all(),
      queryCollection(collection as 'content')
        .where('draft', '=', false)
        .count()
    ])
    
    return {
      pages,
      totalCount
    }
  })

  const pages = result.value?.pages || []
  const totalCount = result.value?.totalCount || 0
  const totalPages = Math.ceil(totalCount / postsPerPage)

  return {
    pages,
    currentPage,
    totalPages,
    totalCount,
    postsPerPage
  }
}
