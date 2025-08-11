// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

// Função para gerar as configurações de cada página/experimento
const generatePage = (name, title) => {
  return {
    entry: `./src/experiments/${name}/index.js`,
    plugin: new HtmlWebpackPlugin({
      filename: `experiments/${name}/index.html`,
      template: `./src/experiments/${name}/index.html`,
      chunks: [name], // Importante: injeta apenas o JS correspondente
      title: title,
    }),
  };
};

// Lista de todos os seus experimentos
const experiments = [
  generatePage("gravity", "Gravity Simulation"),
  generatePage("colision-reaction", "Collision Reaction"),
  generatePage("colision-test", "Colision Test"),
  // Adicione outros experimentos aqui
];

// Mapeia os experimentos para os pontos de entrada do Webpack
const entryPoints = experiments.reduce(
  (acc, { entry }, index) => {
    const name = experiments[index].entry.split("/")[2];
    acc[name] = entry;
    return acc;
  },
  {
    // Adiciona a página principal
    main: "./src/main.js",
  },
);

// Mapeia os experimentos para as instâncias do HtmlWebpackPlugin
const htmlPlugins = experiments.map((page) => page.plugin);

module.exports = {
  mode: "development",
  entry: entryPoints,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].bundle.js", // [name] será substituído pelo nome da entrada (ex: gravity, main)
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    // Plugin para a página principal
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      chunks: ["main"], // Apenas o JS da página principal
    }),
    // Adiciona os plugins para cada experimento
    ...htmlPlugins,
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3000,
      server: { baseDir: ["dist"] },
      files: ["./dist/*"],
      notify: false,
    }),
  ],
  watch: true,
  devtool: "source-map",
};
