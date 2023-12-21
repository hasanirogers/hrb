module.exports = function(eleventyConfig) {
  const markdownIt = require("markdown-it");
  const markdownItAttrs = require('markdown-it-attrs');
  const { DateTime } = require("luxon");

  const markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true
  };

  const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);
  const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

  const iframeHandler = (src, title) => {
    return `<div style="aspect-ratio:16/9"><iframe width="100%" height="100%" src="${src}" title="${title}"></iframe></div>`;
  }

  eleventyConfig.setLibrary('md', markdownLib);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addShortcode('iframe', iframeHandler);

  // Collections
  eleventyConfig.addCollection('categories', (collectionApi) => {
    const posts = collectionApi.getFilteredByTag("post").filter(p => !p.data.tags.includes("draft"));

    return posts.reduce((tags, post) => {
      post.data.tags.filter(tag => tag !== 'post').forEach(tag => {
        if (!tags[tag]) tags[tag] = 0;
        tags[tag]++;
      });

      return tags;
    }, {"All posts": posts.length})
  });

  // Filters
  eleventyConfig.addFilter("postDate", (dateObj) => {
    // Reference: https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_HUGE);
  });

  eleventyConfig.addFilter('jsonify', (content) => {
		return JSON.stringify(content);
	});

  eleventyConfig.addFilter('rawDate', (date) => {
    return new Date(date).getTime();
  });
};
