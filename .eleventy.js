const { EleventyRenderPlugin } = require("@11ty/eleventy");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  // Custom markdown library with plugins
  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  })
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.headerLink(),
    })
    .use(markdownItAttrs);

  eleventyConfig.setLibrary("md", md);

  // Layouts
  eleventyConfig.addLayoutAlias("base", "base.njk");
  eleventyConfig.addLayoutAlias("home", "home.njk");
  eleventyConfig.addLayoutAlias("page", "page.njk");
  eleventyConfig.addLayoutAlias("post", "post.njk");

  // Collections
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => {
      return b.data.date - a.data.date;
    });
  });

  eleventyConfig.addCollection("pages", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/*.njk").filter(item => !item.inputPath.includes("blog/index"));
  });

  // Passthrough copy
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Custom filters
  eleventyConfig.addFilter("date", function (date, format = "dd MMMM yyyy") {
    const dt = new Date(date);
    return dt.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  });

  eleventyConfig.addFilter("isoDate", function (date) {
    const dt = new Date(date);
    return dt.toISOString();
  });

  eleventyConfig.addFilter("slug", function (str) {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  });

  // YouTube embed shortcode
  eleventyConfig.addShortcode("youtube", function (id, title = "") {
    return `
      <div class="video-container">
        <iframe 
          loading="lazy"
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/${id}?rel=0" 
          title="${title}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    `;
  });

  // Image shortcode with lazy loading
  eleventyConfig.addShortcode("image", function (src, alt = "", caption = "") {
    return `
      <figure class="image">
        <img loading="lazy" src="${src}" alt="${alt}" />
        ${caption ? `<figcaption>${caption}</figcaption>` : ""}
      </figure>
    `;
  });

  // Excerpt filter for blog previews
  eleventyConfig.addFilter("excerpt", function (content, length = 200) {
    if (!content) return "";
    const plainText = content.replace(/<[^>]*>/g, " ");
    return plainText.substring(0, length) + (plainText.length > length ? "..." : "");
  });

  // SEO: Generate meta tags
  eleventyConfig.addShortcode("meta", function (data) {
    const site = this.ctx.site;
    const pageTitle = data.title || site.title;
    const pageDescription = data.description || site.description;
    const pageUrl = data.url || site.url + this.page.url;
    const pageImage = data.image || site.image;

    return `
      <title>${pageTitle} | ${site.title}</title>
      <meta name="description" content="${pageDescription}">
      <meta property="og:title" content="${pageTitle}">
      <meta property="og:description" content="${pageDescription}">
      <meta property="og:url" content="${pageUrl}">
      <meta property="og:type" content="${data.type || "website"}">
      ${pageImage ? `<meta property="og:image" content="${pageImage}">` : ""}
      <meta name="twitter:card" content="summary_large_image">
      <meta name="twitter:title" content="${pageTitle}">
      <meta name="twitter:description" content="${pageDescription}">
      ${pageImage ? `<meta name="twitter:image" content="${pageImage}">` : ""}
      <link rel="canonical" href="${pageUrl}">
    `;
  });

  // Configure input/output directories
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
    passthroughFileCopy: true,
  };
};
