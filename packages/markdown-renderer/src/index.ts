import MarkdownIt from "markdown-it";
// @ts-ignore
import MarkdownItMark from "markdown-it-mark";
// @ts-ignore
import MarkdownItSup from "markdown-it-sup";
// @ts-ignore
import MarkdownItSub from "markdown-it-sub";
// @ts-ignore
import MarkdownItFootnote from "markdown-it-footnote";
// @ts-ignore
import MarkdownItEmoji from "markdown-it-emoji";
// @ts-ignore
import MarkdownItImageLazyLoading from "markdown-it-image-lazy-loading";
// @ts-ignore
import MarkdownItTaskLists from "markdown-it-task-lists";
// @ts-ignore
import MarkdownItToc from "markdown-it-toc";
// @ts-ignore
import MarkdownItAttrs from "markdown-it-attrs";
// @ts-ignore
import MarkdownItKatex from "markdown-it-katex";

const markdownIt = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: true,
  linkify: true,
  highlight: (str: string, lang: string) => {
    return `<pre><code class="language-${lang} lang-${lang}">${str}</code></pre>`;
  },
});

markdownIt.use(MarkdownItMark);
markdownIt.use(MarkdownItSup);
markdownIt.use(MarkdownItSub);
markdownIt.use(MarkdownItFootnote);
markdownIt.use(MarkdownItEmoji);
markdownIt.use(MarkdownItImageLazyLoading);
markdownIt.use(MarkdownItTaskLists);
markdownIt.use(MarkdownItToc);
markdownIt.use(MarkdownItAttrs, {
  allowedAttributes: ["id", "class", "target"],
});
markdownIt.use(MarkdownItKatex);

export default markdownIt;
