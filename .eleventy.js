const Image = require("@11ty/eleventy-img");
const path = require("path"); // Node.js path module for resolving paths

module.exports = function (eleventyConfig) {
  // Tell Eleventy to copy the 'css' folder to the output folder
  // eleventyConfig.addPassthroughCopy("css");

  // Also copy your images folder
  eleventyConfig.addPassthroughCopy("images");

  // Copy the 'js' folder to the output folder
  eleventyConfig.addPassthroughCopy("js");

  // Set global permalinks to resource.html style
  eleventyConfig.addGlobalData("permalink", () => {
    return (data) =>
      `${data.page.filePathStem}.${data.page.outputFileExtension}`;
  });

  // Image shortcode
  // Usage: {% image "path/to/image.jpg", "Alt text for the image", "(min-width: 30em) 50vw, 100vw" %}
  eleventyConfig.addAsyncShortcode("image", async function (src, alt, sizes = "100vw") {
    // Determine the correct input path for the image
    // This handles both absolute paths from input root and relative paths from the current MD file
    let inputPath;
    if (src.startsWith('/') || src.startsWith('http')) {
      inputPath = src; // Absolute path from input root or a full URL
    } else {
      // Relative path: resolve it based on the current markdown file's directory
      // `this.page.inputPath` gives the full path to the current .md file
      inputPath = path.join(path.dirname(this.page.inputPath), src);
    }

    let metadata = await Image(inputPath, {
      widths: [300, 600, 900, "auto"], // Generate these widths, "auto" is original
      formats: ["webp", "png"], // Generate these formats
      outputDir: "./_site/img/", // Output images to _site/img/
      urlPath: "/img/",          // Public URL path for images
      filenameFormat: function (id, src, width, format, options) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}.${format}`;
      }
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };

    // You can customize the generated HTML. This creates a <picture> element.
    return Image.generateHTML(metadata, imageAttributes);
  });


  // Remove .html from `page.url`
  eleventyConfig.addUrlTransform((page) => {
    if (page.url.endsWith(".html")) {
      return page.url.slice(0, -1 * ".html".length);
    }
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
  };
};