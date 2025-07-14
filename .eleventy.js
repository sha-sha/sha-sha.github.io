module.exports = function (eleventyConfig) {
  // Tell Eleventy to copy the 'css' folder to the output folder
  // eleventyConfig.addPassthroughCopy("css");

  // Also copy your images folder
  eleventyConfig.addPassthroughCopy("images");

  // Copy the 'js' folder to the output folder
  eleventyConfig.addPassthroughCopy("js");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
  };
};