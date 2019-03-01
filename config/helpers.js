exports.paginateList = (postsDetails, createPage, template, basePath, context) => {
  const postsPerPage = 10
  const numPages = Math.ceil(postsDetails.edges.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? basePath : `${basePath}/${i + 1}`,
      component: template,
      context: {
        pageCount: numPages,
        pageNum: (i + 1),
        pageOffset: i * postsPerPage,
        pageSize: postsPerPage,
        totalCount: postsDetails.totalCount,
        ...context,
      },
    })
  })
}
