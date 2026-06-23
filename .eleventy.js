const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const eleventyPluginFilesMinifier = require("@sherby/eleventy-plugin-files-minifier");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const EleventyImage = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  // Add plugins
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://www.example.com", // Replace with your client's URL
    },
  });
  eleventyConfig.addPlugin(eleventyPluginFilesMinifier);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  // Rewrites root-relative URLs (/assets, /menus, etc.) to honor pathPrefix,
  // so preview builds nested in a subfolder still resolve their links.
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // Image optimization shortcode
  // Usage: {% image "/assets/images/foo.jpg", "Alt text", "sizes", [w1,w2], "pictureClass", "imgClass", "eager|lazy" %}
  eleventyConfig.addNunjucksAsyncShortcode("image", async function(src, alt, sizes, widths, pictureClass, imgClass, loading) {
    const inputPath = src.startsWith("/") ? `src${src}` : src;
    loading = loading || "lazy";

    let metadata;
    try {
      metadata = await EleventyImage(inputPath, {
        widths: widths || [400, 800, 1200],
        formats: ["avif", "webp", "auto"],
        outputDir: "./dist/assets/images/",
        urlPath: "/assets/images/",
        cacheOptions: { duration: "1d", directory: ".cache" },
      });
    } catch (e) {
      console.warn(`[image shortcode] Could not process "${src}": ${e.message}`);
      const cls = imgClass ? ` class="${imgClass}"` : "";
      return `<img src="${src}" alt="${alt || ""}"${cls} loading="${loading}">`;
    }

    const imgAttrs = {
      alt: alt || "",
      sizes: sizes || "100vw",
      loading,
      decoding: loading === "eager" ? "sync" : "async",
    };
    if (imgClass) imgAttrs.class = imgClass;

    const picAttrs = {};
    if (pictureClass) picAttrs.class = pictureClass;
    if (!alt) picAttrs["aria-hidden"] = "true";

    return EleventyImage.generateHTML(metadata, imgAttrs, {
      pictureAttributes: picAttrs,
      whitespaceMode: "inline",
    });
  });

  // Passthrough copy for assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("dist/css/styles.css");

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data",
    },
    // Defaults to "/" for production; preview builds set PATH_PREFIX (e.g.
    // "/site-name/") so the site works when served from a subfolder.
    pathPrefix: process.env.PATH_PREFIX || "/",
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
