import { LitElement, css, html } from 'lit';
import { stylesBase } from '../shared/styles.js';

class HRBHeader extends LitElement {
  static get styles() {
    return [
      stylesBase,
      css`
        :host {
          --height: 80vh;

          color: white;
          display: block;
        }

        img {
          margin: auto;
          transform: scale(1.5);
          position: relative;
          z-index: 2;
          opacity: 0.15;
        }

        header {
          display: flex;
          position: relative;
          width: 100vw;
          min-height: 50vh;
          max-height: var(--height);
          aspect-ratio: 16/9;
          background: var(--color-primary);
        }

        hrb-waves {
          position: absolute;
          bottom: 0;
          width: 100%;
        }

        .content {
          display: flex;
          position: absolute;
          top: 0;
          z-index: 4;
          width: 100vw;
          height: var(--height);
          max-height: var(--height);
          aspect-ratio: 16/9;
        }

        ::slotted([slot="heading"]) {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-self: flex-start;
          margin: 8vh 0 0 0;
          text-align: center;
        }

        ::slotted([slot="buttons"]) {
          display: none;
          margin: auto;
          position: absolute;
          bottom: 2rem;
          gap: 2rem;
          left: 50%;
          transform: translateX(-50%);
        }

        @media screen and (min-width: 1100px) {
          .content,
          .gradient,
          header::after,
          header::before {
            height: auto;
          }

          ::slotted([slot="buttons"]) {
            display: flex;
          }

          ::slotted([slot="heading"]) {
            align-self: center;
            margin: auto;
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      baseurl: {
        type: String,
        attribute: 'base-url',
      },
    };
  }

  constructor() {
    super();
    this.baseurl = window.location.origin;
  }

  render() {
    return html`
      <header>
        <div class="content">
          <slot name="heading"></slot>
          <slot name="buttons"></slot>
        </div>
        <hrb-waves></hrb-waves>
      </header>
    `;
  }
}

customElements.define('hrb-header', HRBHeader);
