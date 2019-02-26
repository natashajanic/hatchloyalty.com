const _ = require('lodash')
const path = require('path')
const { paginatePosts } = require('./helpers')

exports.createPages = (graphql, createPage) => new Promise((resolve, reject) => {
  const tagListTemplate = path.resolve('./src/templates/tag-list.tsx')
  const tagTemplate = path.resolve('./src/templates/tag.tsx')

  graphql(
    `
      {
        allMarkdownRemark(
          limit: 2000
          filter: {fields: {sourceName: {eq: "blog"}}}
        ) {
          tags: group(field: frontmatter___tags) {
            name: fieldValue
            postCount: totalCount
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      console.log(result.errors)
      reject(result.errors)
    }

    const tags = result.data.allMarkdownRemark.tags
    createPage({
      path: '/blog/tags',
      component: tagListTemplate,
      context: {
        basePath: '/blog/tags',
        tags,
      },
    })

    // Make each tag's pages
    const tagPagesCreation = tags.map((tag) => (
      new Promise((tagPageResolve, tagPageReject) => {
        graphql(
          `
            query($tag: String) {
              allMarkdownRemark(
                limit: 2000
                sort: { fields: [frontmatter___date], order: DESC }
                filter: {
                  fields: { sourceName: { eq: "blog" } }
                  frontmatter: { tags: { in: [$tag] } }
                }
              ) {
                totalCount
                edges {
                  node {
                    fields {
                      slug
                    }
                  }
                }
              }
            }
          `,
          { tag: tag.name }
        ).then(tagPageResult => {
          if (tagPageResult.errors) {
            console.log(tagPageResult.errors)
            tagPageReject(tagPageResult.errors)
          }

          const { data: { allMarkdownRemark } } = tagPageResult
          paginatePosts(
            allMarkdownRemark,
            createPage,
            tagTemplate,
            `/blog/tags/${_.kebabCase(tag.name)}`,
            { tag: tag.name }
          )

          tagPageResolve()
        })
      })
    ))

    Promise.all(tagPagesCreation).then(resolve)
  })
})
