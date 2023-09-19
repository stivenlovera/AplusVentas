import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import path from 'path'
import { readdirSync } from 'fs'
import GlobalPolyFill from "@esbuild-plugins/node-globals-polyfill";

const absolutePathAliases = {};
// Root resources folder
const srcPath = path.resolve('./src');
// Ajust the regex here to include .vue, .js, .jsx, etc.. files from the resources/ folder
const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map((dirent) => dirent.name.replace(/(\.ts){1}(x?)/, ''));
srcRootContent.forEach((directory) => {
  absolutePathAliases[directory] = path.join(srcPath, directory);
});
import dotenv from "dotenv";
dotenv.config();
console.log(`"${process.env.REACT_APP_API}"`)


// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: "util",
      ...absolutePathAliases
    }
  },
  build: {
    outDir: "build",
  },
  plugins: [
    reactRefresh(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
        // ...svgr options (https://react-svgr.com/docs/options/)
      },
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
        define: {
            global: "globalThis",
        },
        plugins: [
            GlobalPolyFill({
                process: true,
                buffer: true,
            }),
        ],
    },
},
define: {
  "process.env.REACT_APP_API": `"${process.env.REACT_APP_API}"`,
  "process.env.REACT_APP_API_DEV": `"${process.env.REACT_APP_API_DEV}"`,
  "process.env.REACT_APP_HOST": `"${process.env.REACT_APP_HOST}"`,
  "process.env.PORT": `"${process.env.PORT}"`,
  "variable1": `"${process.env.PORT}"`,
}

});