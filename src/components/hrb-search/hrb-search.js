import { LitElement, css, html } from 'lit';
import algoliasearch from 'algoliasearch/dist/algoliasearch.esm.browser.js';
import { stylesBase } from '../shared/styles.js';

class HRBSearch extends LitElement {
  static get styles() {
    return [
      stylesBase,
      css`
        :host {
          color: rgb(var(--kemet-color-gray-100));
          display: inline-flex;
          flex-direction: column;
          position: fixed;
          top: 1rem;
          right: 1rem;
          z-index: 999;
        }

        a {
          color: rgb(var(--kemet-color-gray-100));
          text-decoration: none;
          transition: all 300ms ease;
        }

        a:hover {
          color: var(--color-secondary);
        }

        input {
          font-size: 1.2rem;
          outline: none;
          height: 32px;
          padding: 0 0.5rem;
        }

        h2 {
          margin: 0;
          line-height: 1.3;
        }

        kemet-fab {
          --kemet-fab-pill-radius: 6px;
          align-self: flex-end;
          border-radius: 6px;
        }

        .hits {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-height: 80vh;
          overflow: auto;
          list-style: none;
          padding: 0;
          margin-left: 1rem;
          opacity: 0;
          pointer-events: none;
          transition: all 600ms ease;
        }

        .hits p,
        .hits > li {
          padding: 0.5rem 1rem;
          max-width: 600px;
          border-radius: 6px;
          background: rgb(var(--kemet-color-primary));
        }

        :host([active]) .hits {
          opacity: 1;
          pointer-events: auto;
        }

        .categories {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          list-style: none;
          padding: 0;
        }

        .categories > li:not(:last-child) a::after {
          content: ', ';
        }
      `,
    ];
  }

  static get properties() {
    return {
      baseurl: { type: String, attribute: 'base-url' },
      hits: { type: Array },
      hasSearched: { type: Boolean },
      currentPage: { type: Number },
      totalPages: { type: Number },
      searchTerm: { type: String },
      active: { type: Boolean, reflect: true },
    };
  }

  constructor() {
    super();
    this.baseurl = window.location.origin;
    this.hits = [];
    this.hasSearched = false;
    this.currentPage = 0;
  }

  firstUpdated() {
    this.fab = this.shadowRoot.querySelector('kemet-fab');

    this.fab.addEventListener('mouseover', () => { this.active = true; });
    this.addEventListener('mouseleave', () => {
      this.fab.expanded = false;
      this.active = false;
    });
  }

  render() {
    return html`
    <kemet-fab pill @mouseleave=${() => this.handleFABLeave()}>
      <kemet-icon slot="icon" icon="search" size="24"></kemet-icon>
      <input
        type="search"
        id="searchposts"
        name="searchposts"
        placeholder="Search"
        @keydown=${event => this.handleSearch(event)}
        @blur=${event => this.handleSearch(event)}
      />
    </kemet-fab>
    <ul class="hits">${this.makeHits()}</ul>
    `;
  }

  handleSearch(event, isLoadMore = false) {
    if (event.type === 'submit') event.preventDefault();

    this.searchTerm = this.shadowRoot.getElementById('searchposts').value;
    const client = algoliasearch('R2CFUR5SSI', '185d2e4b953e5f6887a9226e35a48937');
    const index = client.initIndex('dev_HASANIROGERSBLOG');
    const attributes = ['excerpt', 'author', 'title', 'categories', 'date', 'url'];

    index.search(this.searchTerm, {
      attributesToRetrieve: attributes,
      hitsPerPage: 99,
      page: this.currentPage,
    }).then((data) => {
      this.totalPages = data.nbPages;

      if (this.searchTerm.length > 1) {
        this.hasSearched = true;

        if (isLoadMore) {
          this.hits = this.hits.concat(data.hits);
        } else {
          this.hits = data.hits;
        }
      } else {
        this.hasSearched = false;
        this.hits = [];
      }
    });
  }

  makeHits() {
    if (this.hits.length > 0) {
      return this.hits.map(hit => html`
        <li>
          <article>
            <a href=${hit.url}>
              <h2>${hit.title}</h2>
            </a>
            <ul class="categories">
              <li>Categories:&nbsp;</li>
              ${this.makeCategoryLinks(hit.categories)}
            </ul>
          </article>
        </li>
      `);
    }

    if (this.hasSearched) {
      return html`<p>No results found. Try searching another phrase.</p>`;
    }

    return null;
  }

  makeCategoryLinks(categories) {
    if (categories.length > 0) {
      return categories.map((category) => {
        if (category !== 'post') {
          return html`<li><a href="${this.baseurl}/category/${category}">${category}</a></li>`;
        }

        return null;
      });
    }

    return html`<li>none</li>`;
  }

  handleFABLeave() {
    if (this.searchTerm || this.searchTerm === '') {
      this.fab.expanded = true;
    }
  }

  // tagLink(event, tag) {
  //   event.preventDefault();

  //   history.pushState(null, null, `/tag/#${tag}`);
  //   if (location.pathname === '/tag/') location.reload();
  // }
}

customElements.define('hrb-search', HRBSearch);
