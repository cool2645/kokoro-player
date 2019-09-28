import { LitElement, html, css } from 'lit-element'
import { unsafeHTML } from 'lit-html/directives/unsafe-html'
import * as Prism from 'prismjs'

class Source extends LitElement {
  constructor () {
    super()
    this.showingId = 0
  }

  static get properties () {
    return {
      snippets: Array,
      showingId: Number
    }
  }

  static get styles () {
    return css`
      a {
        text-decoration: none;
      }
      .inline {
        display: flex;
      }
      .inline > a {
        margin: 0.5em;
      }
      .inline pre {
        margin: 0;
      }
      .inline > a:first-child {
        margin-left: 0;
      }
      .inline > a:last-child {
        margin-right: 0;
      }
    `
  }

  setSnippet (id, e) {
    e.preventDefault()
    this.showingId = id
  }

  render () {
    return html`
      <link href="https://cdn.jsdelivr.net/gh/PrismJS/prism@1.16.0/themes/prism-coy.css" rel="stylesheet" />
      <div class="inline">
        ${
          this.snippets.map((snippet, id) => html`
            <a href="" @click=${(e) => this.setSnippet(id, e)}>
              <pre class="language-${snippet.langCode}"><code class="language-${snippet.langCode}">${snippet.lang}</code></pre>
            </a>
          `)
        }
      </div>
       ${
        this.snippets && this.snippets.length
          ? html`<pre class="language-${this.snippets[this.showingId].langCode}"><code class="language-${this.snippets[this.showingId].langCode}">${
          unsafeHTML(Prism.highlight(
            this.snippets[this.showingId].code,
            Prism.languages[this.snippets[this.showingId].langCode],
            this.snippets[this.showingId].langCode
          ))}</code></pre>` : ''
      }`
  }
}

window.customElements.define('source-box', Source)
