import React from 'react'
import { Link } from 'gatsby'
import { graphql, useStaticQuery } from 'gatsby'


const Blog = props => {
  const { data, pageContext } = props
  const pages = Array.from({ length: pageContext.numPages })
  return (
    <div>
      <h1><Link to='/'>Blog</Link></h1>
      {data.posts.edges.map(post => {
        return (
          <div>
            <h3><Link to={post.node.frontmatter.path}>{post.node.frontmatter.title}</Link></h3>
            <p>{post.node.frontmatter.description}</p>
          </div>
        )
      })}
      <ul>
        {pages.map((_, page) => {
          return <li>
            <Link to={'/blog/' + (page === 0 ? '' : '/' + page)}>{pageContext.currentPage === page ? '=>' : ''}{page + 1} 
            </Link>
            </li>
        })}
      </ul>
    </div>
  )
}

export const pageQuery = graphql`
   query ($skip: Int!, $limit: Int!) {
  posts: allMarkdownRemark (
    skip: $skip, 
    limit: $limit
  ) {
    edges {
      node {
        frontmatter {
          description
          path
          title
        }
      }
    }
  }
}

`

export default Blog