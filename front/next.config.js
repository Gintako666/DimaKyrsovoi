/* eslint-disable operator-linebreak */
/* eslint-disable brace-style */
/* eslint-disable no-param-reassign */

/** @type {import('next').NextConfig} */
// eslint-disable-next-line import/no-extraneous-dependencies
// const StylelintPlugin = require('stylelint-webpack-plugin');
// eslint-disable-next-line import/no-unresolved
const loaderUtils = require("loader-utils");
const path = require("path");

const hashOnlyIdent = (context, _, exportName) => {
  const result = loaderUtils
    .getHashDigest(
      Buffer.from(
        `filePath:${path
          .relative(context.rootContext, context.resourcePath)
          .replace(/\\+/g, "/")}#className:${exportName}`
      ),
      "md4",
      "base64",
      6
    )
    .replace(/^(-?\d|--)/, "_$1")
    .replaceAll("+", "_")
    .replaceAll("/", "_");

  return result;
};

const nextConfig = {
  webpack: (config, { dev }) => {
    const rules = config.module.rules
      .find((rule) => typeof rule.oneOf === "object")
      .oneOf.filter((rule) => Array.isArray(rule.use));

    if (!dev) {
      rules.forEach((rule) => {
        rule.use.forEach((moduleLoader) => {
          if (
            moduleLoader.loader?.includes("css-loader") &&
            !moduleLoader.loader?.includes("postcss-loader")
          ) {
            // eslint-disable-next-line no-param-reassign
            moduleLoader.options.modules.getLocalIdent = hashOnlyIdent;
          }
        });
      });
    }

    if (dev) {
      // eslint-disable-next-line no-param-reassign
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }

    return config;
  },
};

module.exports = { ...nextConfig };
