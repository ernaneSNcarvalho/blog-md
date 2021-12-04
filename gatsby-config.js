module.exports = {
    plugins: [
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: __dirname + '/src/content',
                name: 'pages'
            }
        }, 
        'gatsby-transformer-remark'
    ]
}