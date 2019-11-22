/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;
  if (page.path === '/') {
    page.matchPath = '/*';
    createPage(page);
  }
};

// @HACK: to remove shebang from mqtt
// https://github.com/webpack/webpack/issues/2168#issuecomment-339184660
exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /node_modules[/\\]mqtt/i,
          loader: 'shebang-loader',
        },
      ],
    },
    plugins: [
      plugins.define({
        __DEVELOPMENT__: stage === `develop` || stage === `develop-html`,
      }),
    ],
  });
};
