module.exports = {
  siteMetadata: {
    siteUrl: "https://curio.cards",
    title: "curio-cards",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-json",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/cards`,
        name: "cards"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/artists`,
        name: "artists"
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Curio Cards`,
        short_name: `Curio Cards`,
        description: `The world's first proto-NFT art tokens released on the Ethereum blockchain, launched on May 9, 2017`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#F57040`,
        display: `standalone`,
        icon: `src/images/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/address/*`] },
    },
  ],
};
