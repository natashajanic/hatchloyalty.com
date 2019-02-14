// import React from "react"
// import PropTypes from "prop-types"

// // Utilities
// import kebabCase from "lodash/kebabCase"

// // Components
// import { Helmet } from "react-helmet"
// import { Link, graphql } from "gatsby"
// import Layout from "../components/layout"
// import Wrapper from "../components/Wrapper"

// const TagsPage = ({
//   data: {
//     allMarkdownRemark: { group },
//     site: {
//       siteMetadata: { title },
//     },
//   },
// }) => (
//   <Layout>
//     <Helmet title={title} />
//     <Wrapper>
//       <h1>Tags</h1>
//       <ul>
//         {group.map(tag => (
//           <li key={tag.fieldValue}>
//             <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
//               {tag.fieldValue} ({tag.totalCount})
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </Wrapper>
//   </Layout>
// )

// TagsPage.propTypes = {
//   data: PropTypes.shape({
//     allMarkdownRemark: PropTypes.shape({
//       group: PropTypes.arrayOf(
//         PropTypes.shape({
//           fieldValue: PropTypes.string.isRequired,
//           totalCount: PropTypes.number.isRequired,
//         }).isRequired
//       ),
//     }),
//     site: PropTypes.shape({
//       siteMetadata: PropTypes.shape({
//         title: PropTypes.string.isRequired,
//       }),
//     }),
//   }),
// }

// export default TagsPage

// export const pageQuery = graphql`
//   query {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//     allMarkdownRemark(
//       limit: 2000
//       filter: {frontmatter: {documentType: {eq: "blog"}}}
//     ) {
//       group(field: frontmatter___tags) {
//         fieldValue
//         totalCount
//       }
//     }
//   }
// `