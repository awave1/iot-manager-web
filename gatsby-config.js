const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config({
  path: process.env.NODE_ENV !== 'development' ? '.env' : '.env.development',
});

if (process.env.NODE_ENV !== 'development') {
  fs.writeFileSync(
    './.env.production',
    [
      `MQTT_HOST=${process.env.MQTT_HOST}`,
      `MQTT_PORT=${process.env.MQTT_PORT}`,
      `MQTT_PASS=${process.env.MQTT_PASS}`,
      `MQTT_USER=${process.env.MQTT_USER}`,
    ].join('\n')
  );
}

module.exports = {
  pathPrefix: '/iot-manager-web',
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-emotion',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
