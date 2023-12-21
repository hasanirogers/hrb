import { LitElement, css, html } from 'lit';
import { stylesBase } from '../shared/styles.js';
import { svgHamburger } from '../shared/svgs.js';

class HRBHamburger extends LitElement {
  static get styles() {
    return [
      stylesBase,
      css`
        :host {
          display: inline-flex;
          position: fixed;
          top: 1rem;
          left: 1rem;
          z-index: 9999;
        }

        @media screen and (min-width: 1100px) {
          :host {
            display: none;
          }
        }

        svg {
          width: 48px;
          height: 48px;
          fill: white;
        }

        button {
          border: 0;
          padding: 0;
          cursor: pointer;
          background: none;
          transform: translateY(2px);
        }
      `,
    ];
  }

  render() {
    return html`
      <button @click=${() => this.handleClick()}>${svgHamburger}</button>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  handleClick() {
    const drawer = document.querySelector('kemet-drawer');
    drawer.opened = !drawer.opened;
  }
}

customElements.define('hrb-hamburger', HRBHamburger);
