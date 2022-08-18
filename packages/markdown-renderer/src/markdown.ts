import escape from 'lodash.escape'
import MarkdownIt from 'markdown-it'
// @ts-ignore
import MarkdownItAbbr from 'markdown-it-abbr'
import MarkdownItAnchor from 'markdown-it-anchor'
// @ts-ignore
import MarkdownItAttrs from 'markdown-it-attrs'
// @ts-ignore
import MarkdownItEmoji from 'markdown-it-emoji'
// @ts-ignore
import MarkdownItFootnote from 'markdown-it-footnote'
// @ts-ignore
import MarkdownItImagesPreview from 'markdown-it-images-preview'
// @ts-ignore
import MarkdownItIns from 'markdown-it-ins'
// @ts-ignore
import MarkdownItKatex from '@iktakahiro/markdown-it-katex'
// @ts-ignore
import MarkdownItMark from 'markdown-it-mark'
// @ts-ignore
import MarkdownItSub from 'markdown-it-sub'
// @ts-ignore
import MarkdownItSup from 'markdown-it-sup'
// @ts-ignore
import MarkdownItTableOfContents from 'markdown-it-table-of-contents'
// @ts-ignore
import MarkdownItTaskLists from 'markdown-it-task-lists'
// @ts-ignore
import MarkdownItMermaid from './mermaid'

const markdownIt = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: true,
  linkify: true,
  typographer: true,
  highlight: (str: string, lang: string) => {
    return `<pre><code class="language-${lang}">${escape(str)}</code></pre>`
  },
})

markdownIt
  .use(MarkdownItMermaid)
  .use(MarkdownItAbbr)
  .use(MarkdownItAnchor)
  .use(MarkdownItAttrs, {
    allowedAttributes: ['id', 'class', 'target'],
  })
  .use(MarkdownItEmoji)
  .use(MarkdownItFootnote)
  .use(MarkdownItImagesPreview)
  .use(MarkdownItIns)
  .use(MarkdownItKatex, {
    trust: true,
  })
  .use(MarkdownItMark)
  .use(MarkdownItSub)
  .use(MarkdownItSup)
  .use(MarkdownItTableOfContents, {
    includeLevel: [1, 2, 3, 4, 5, 6],
    markerPattern: /^\[TOC\]/im,
  })
  .use(MarkdownItTaskLists)

export { markdownIt }
