import MarkdownIt from 'markdown-it'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MarkdownItMark from 'markdown-it-mark'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MarkdownItSup from 'markdown-it-sup'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MarkdownItSub from 'markdown-it-sub'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MarkdownItFootnote from 'markdown-it-footnote'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MarkdownItEmoji from 'markdown-it-emoji'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MarkdownItImageLazyLoading from 'markdown-it-image-lazy-loading'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MarkdownItTaskLists from 'markdown-it-task-lists'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MarkdownItToc from 'markdown-it-toc'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MarkdownItAttrs from 'markdown-it-attrs'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MarkdownItKatex from 'markdown-it-katex'

const markdownIt = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  breaks: true,
  linkify: true,
  highlight: (str: string, lang: string) => {
    return `<pre><code class="language-${lang} lang-${lang}">${str}</code></pre>`
  },
})

markdownIt.use(MarkdownItMark)
markdownIt.use(MarkdownItSup)
markdownIt.use(MarkdownItSub)
markdownIt.use(MarkdownItFootnote)
markdownIt.use(MarkdownItEmoji)
markdownIt.use(MarkdownItImageLazyLoading)
markdownIt.use(MarkdownItTaskLists)
markdownIt.use(MarkdownItToc)
markdownIt.use(MarkdownItAttrs, {
  allowedAttributes: ['id', 'class', 'target'],
})
markdownIt.use(MarkdownItKatex)

export default markdownIt
