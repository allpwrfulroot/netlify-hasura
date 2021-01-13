module.exports = {
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
    });
    cfg.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return cfg;
  },
};
