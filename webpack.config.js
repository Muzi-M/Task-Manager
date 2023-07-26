const webpack = require("webpack");
const path = require("path");
require("dotenv").config();

module.exports = {
  entry: {
    main: "./public/js/weatherAPI.js", // Add 'weatherAPI.js' as an entry point
  },
  output: {
    filename: "weatherAPI.bundle.js",
    path: path.resolve(__dirname, "public/dist"),
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        WEATHER_API_KEY: JSON.stringify(process.env.WEATHER_API_KEY),
      },
    }),
  ],
};
