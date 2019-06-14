module.exports = function (api) {
  api.cache(true);

  const presets = ["@babel/preset-env", "@babel/preset-react", "@babel/preset-flow"];
  const plugins = [
    "@babel/plugin-proposal-class-properties", 
    "@babel/plugin-transform-flow-strip-types", 
    "@babel/plugin-transform-react-jsx"
  ];

  return {
    presets,
    plugins
  };
}