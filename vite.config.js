import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import path, { resolve } from "path";
import { fileURLToPath } from "url";
import glob from "fast-glob";
import imagemin from "imagemin";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import VitePluginSvgSpritemap from "@spiriit/vite-plugin-svg-spritemap";
import handlebars from "vite-plugin-handlebars";

const SCSS_Logger = {
  warn(message, options) {
    // Mute "Mixed Declarations" warning
    if (options.deprecation && message.includes("mixed-decls")) {
      return;
    }
    // List all other warnings
    console.warn(`▲ [WARNING]: ${message}`);
  },
};

export default defineConfig({
  plugins: [
    vue(),
    VitePluginSvgSpritemap("./src/img/icons/*.svg", {
      svgo: {
        plugins: [
          {
            name: "preset-default",
          },
        ],
      },
    }),
    ViteImageOptimizer({
      png: {
        quality: 85,
      },
      jpeg: {
        quality: 85,
      },
      jpg: {
        quality: 85,
      },
      svg: {
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                cleanupIds: {
                  minify: false,
                  remove: false,
                },
              },
            },
          },
        ],
      },
      cache: false,
    }),
    {
      ...imagemin(["./src/img/**/*.{jpg,png,jpeg}"]),
      apply: "serve",
    },
    handlebars({
      partialDirectory: resolve(__dirname, "pages/partials"),
      helpers: {
        times: (n, block) => {
          let accum = "";
          for (let i = 0; i < n; ++i) {
            accum += block.fn(i);
          }
          return accum;
        },
      },
    }),
  ],
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        logger: SCSS_Logger,
      },
    },
  },
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      input: Object.fromEntries(
        glob
          .sync(["./*.html", "./pages/*.html"])
          .map((file) => [
            path.relative(
              __dirname,
              file.slice(0, file.length - path.extname(file).length),
            ),
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
    },
  },
});
