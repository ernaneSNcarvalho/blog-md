const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const posts = await graphql(`
        query MyQuery {
  posts: allMarkdownRemark {
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
    `)

    posts.data.posts.edges.forEach(post => {
        console.log(post.node.frontmatter.title)
        const template = path.resolve('src/templates/post.js')
        createPage({
            path: post.node.frontmatter.path,
            component: template,
            context: {
                id: post.node.frontmatter.path
            }
        })
    })
    const templateBlog = path.resolve('src/templates/post.js')
    const pageSize = 2
    const totalPosts = posts.data.posts.edges.length
    const numPages = Math.ceil(totalPosts / pageSize)
    Array.from({length: numPages}).forEach((_, i) => {
      createPage({
        path: '/blog' + (i === 0 ? '' : '/'+i), 
        component: templateBlog,
        context: {
          limit: pageSize, 
          skip: i * pageSize,
          numPages, 
          currentPage: i
        }
      })
    })
}