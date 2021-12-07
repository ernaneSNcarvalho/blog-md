import React from 'react'
import { graphql } from 'gatsby'
import {Link} from 'gatsby'
import Seo from '../components/Seo'
import { DiscussionEmbed} from 'disqus-react'

const Post = ({data}) => {
    return (
        <div>
            <Seo title={data.markdownRemark.frontmatter.title} description={data.markdownRemark.frontmatter.description} />
            <h1>{data.markdownRemark.frontmatter.title}</h1>
            <p><Link to='/'>Voltar para o blog</Link></p>
            <div dangerouslySetInnerHTML={{__html: data.markdownRemark.html}} />
            <DiscussionEmbed shortname='powersites-12' config={{identifier: data.markdownRemark.frontmatter.path, title: data.markdownRemark.frontmatter.title}} />
        </div>
    )
}

export const pageQuery = graphql`
    query($id: String!){
        markdownRemark(frontmatter: {path: {eq: $id}}){
            frontmatter {
                path
                title
                description 
        }
        html
        }
        
    }
`
export default Post
