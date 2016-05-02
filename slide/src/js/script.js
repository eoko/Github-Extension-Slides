Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  center: true,

  transition: 'slide', // none/fade/slide/convex/concave/zoom

  // Optional reveal.js plugins
  dependencies: [
    { src: 'bower_components/reveal.js/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: 'bower_components/reveal.js/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
    { src: 'bower_components/reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
  ]
});