import { CLOSE_EYE_ICON, OPEN_SUMMARY_ICON } from './icons/icons.js';
import {
  applyThemeAttributes,
  parseThemeAttribute,
} from './scripts/ComponentProps.js';
import {
  formatAnalysisPeriod,
  formatMarkdown,
} from './scripts/FormatFunctions.js';

class DaaiSummarization extends HTMLElement {
  constructor() {
    super();
    this.textsToSumarize = '';
    this.summarizedText = '';
    this.apiKey = '';
    this.texts = '';
    this.onSuccess = null;
    this.onError = null;

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
    <style>
      :host {
        display: block;
        font-family: sans-serif;
      }
      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "Inter", sans-serif;
      }
      .container-content {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        border: 3px solid #009CB1;
        border-radius: 30px;
        background-color: #ffffff;
        height: 40px;
        max-width: 450px;
        font-family: "Inter", sans-serif;
        font-weight: 600;
        position: relative;
        transition: background-color 0.3s, border-color 0.3s;
        color: var(--text-badge-color, #B0BEC5);
        @media (max-width: 600px) {
          max-width: 330px;
          }
      }
      .sumary-text-button {
        height: 40px;
        width: 100px;
        padding: 8px;
        font-size: 13px;
        border-radius: 6px;
        background-color: #009CB1;
        color: white;
        border: none;
        cursor: pointer;
      }

      .sumary-text-button:disabled {
        height: 40px;
        width: 100px;
        padding: 8px;
        font-size: 13px;
        border-radius: 6px;
        border: none;
        cursor: pointer;
        background-color: #B0BEC5 !important;
        color: #475569;
        cursor: not-allowed;
        opacity: 0.6;
      }
      .sumary-button {
        height: 40px;
        width: 60px;
        padding: 8px;
        font-size: 13px;
        border-radius: 6px;
        background-color: #009CB1;
        color: white;
        border: none;
        cursor: pointer;
      }
      .sumary-button:disabled {
          background-color: #B0BEC5 !important;
          color: #FFFFFF;
          cursor: not-allowed;
          opacity: 0.6;
      }
      .close-button{
        height: 40px;
        width: 100px;
        font-size: 12px;
        border-radius: 8px;
        background-color:  var(--button-close-color, #F43F5E);
        color: white;
        border: none;
        cursor: pointer;
      }
      .copy-button{
       height: 40px;
        width: 100px;
        font-size: 12px;
        border-radius: 8px;
        background-color:  var(--button-copy-color, #F43F5E);
        color: white;
        border: none;
        cursor: pointer;
      }
      .copy-button.copied {
        background-color: #4CAF50;
      }
      .modal {
        color:#475569;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        width: 600px;
        font-weight:600;
        @media (max-width: 600px) {
         width: 80%;
      }
      }
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
      }
      .period-container{
        display: flex;
        gap: 3px;
        align-items: center;
        font-weight: 600;
        justify-content: center;
        border: 3px solid  var(--modal-colors, #475569);
        color: var(--border-color, #475569);
        border-radius: 10px;
        height: 60px;
        width:97%;
        padding:4px;
       @media (max-width: 600px) {
         font-size:12px;
      }
      }

    .sumary-container{
        display: flex;
        font-weight: 500;
        align-items: flex-start;
        justify-content: flex-start;
        flex-direction: column;
        border: 3px solid  var(--modal-colors, #475569);
        border-radius: 10px;
        height: 300px;
        width:96%;
        overflow-y: auto;
        padding:8px;
        font-size: 12px;
      }
      .sumary-content{
        display: flex;
        gap: 10px;
        align-items: start;
        justify-content: center;
        flex-direction:column;
      }
      .container-buttons{
        width:100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    </style>
    <div class="container">
      <div class="container-content">
        <p>Sumário Clínico</p>
        <button class="sumary-text-button" id="generate">Gerar sumário</button>
        <button class="sumary-button" id="sumary" disabled>
          <img src=${CLOSE_EYE_ICON} id='button-img' />
        </button>
      </div>
    </div>
    `;

    this.shadowRoot.querySelector('#generate').addEventListener('click', () => {
      this.summarizeTexts();
    });

    this.shadowRoot.querySelector('#sumary').addEventListener('click', () => {
      this.showModal();
    });
  }

  showModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    const formattedSummary = formatMarkdown(
      this.summarizeTexts.summary || 'Resumo não disponível'
    );

    const formattedDate = formatAnalysisPeriod(this.texts);

    modal.innerHTML = `
      <div class='sumary-content'>
        <p>Sumário clínico do paciente</p>
        <span class='period-container'>${formattedDate}</span>
        <span class='sumary-container' id='teste'>
          ${formattedSummary}
        </span>
        <div class='container-buttons'>
          <button class="copy-button" id='copyText'>Copiar</button>
          <button class="close-button" id="closeModal">Fechar</button>
        </div>
      </div>
    `;

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    this.shadowRoot.appendChild(overlay);
    this.shadowRoot.appendChild(modal);

    this.shadowRoot
      .querySelector('#closeModal')
      .addEventListener('click', () => this.closeModal(modal, overlay));
    overlay.addEventListener('click', () => this.closeModal(modal, overlay));

    this.shadowRoot
      .querySelector('#copyText')
      .addEventListener('click', () => this.copySumaryText());
  }

  enableSummaryButton() {
    const summaryButton = this.shadowRoot.querySelector('#sumary');
    summaryButton.disabled = false;
  }

  disableSummaryButton() {
    const summaryButton = this.shadowRoot.querySelector('#sumary');
    summaryButton.disabled = true;
  }

  formatText(textsToSummarize) {
    try {
      const data = JSON.parse(textsToSummarize);
      if (Array.isArray(data)) {
        const formated = JSON.stringify({ texts: data });
        return formated;
      }
      return textsToSummarize;
    } catch (error) {
      console.error('Erro ao fazer parse da string JSON:', error);
      return null;
    }
  }

  copySumaryText() {
    const sumaryText =
      this.shadowRoot.querySelector('.sumary-container').innerText;
    const copyButton = this.shadowRoot.querySelector('#copyText');

    navigator.clipboard
      .writeText(sumaryText)
      .then(() => {
        copyButton.classList.add('copied');
        copyButton.innerText = 'Copiado!';

        setTimeout(() => {
          copyButton.classList.remove('copied');
          copyButton.innerText = 'Copiar';
        }, 3000);
      })
      .catch((error) => {
        console.error('Erro ao copiar o texto: ', error);
      });
  }

  closeModal(modal, overlay) {
    this.shadowRoot.removeChild(modal);
    this.shadowRoot.removeChild(overlay);
  }

  async summarization(apikey, texts, onSuccess, onError) {
    const url =
      this.modeApi === 'dev'
        ? 'https://apim.doctorassistant.ai/api/sandbox/summary'
        : 'https://apim.doctorassistant.ai/api/production/summary';

    const generateButton = this.shadowRoot.querySelector('#generate');
    const getImageButton = this.shadowRoot.querySelector('#button-img');
    const buttonAvalibleIcon = OPEN_SUMMARY_ICON;

    generateButton.innerText = 'Gerando';
    generateButton.style.color = '#fffff';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'x-daai-api-key': apikey,
          'Content-Type': 'application/json',
        },
        body: texts,
      });

      if (response) {
        const jsonResponse = await response.json();
        getImageButton.src = buttonAvalibleIcon;
        generateButton.innerText = 'Concluído';
        generateButton.style.color = '#fffff';
        generateButton.disabled = true;

        setTimeout(() => {
          generateButton.innerText = 'Gerar relatório';
          generateButton.style.color = '#fffff';
          generateButton.disabled = true;
        }, 5000);

        if (jsonResponse) {
          this.enableSummaryButton();
        }
        this.summarizeTexts = jsonResponse;
        if (typeof onSuccess === 'function') {
          onSuccess(jsonResponse);
        }
      }
    } catch (error) {
      generateButton.innerText = 'Gerar sumário';
      generateButton.style.color = '#FFFFFF';
      this.disableSummaryButton();
      console.error('Erro ao enviar os textos:', error);
      if (typeof onError === 'function') {
        onError('erro na requisição', error);
      }
    }
  }

  async summarizeTexts() {
    try {
      this.summarization(
        this.apiKey,
        this.textsToSumarize,
        this.onSuccess,
        this.onError
      );
    } catch (error) {
      console.error('Erro na sumarização:', error);
    }
  }

  static get observedAttributes() {
    return ['theme', 'onSuccess', 'onError', 'apiKey', 'texts'];
  }

  connectedCallback() {
    const successAttr = this.getAttribute('onSuccess');
    const errorAttr = this.getAttribute('onError');

    if (successAttr && typeof window[successAttr] === 'function') {
      this.onSuccess = window[successAttr].bind(this);
    }
    if (errorAttr && typeof window[errorAttr] === 'function') {
      this.onError = window[errorAttr].bind(this);
    }
    const defaultTheme = {
      borderColor: '#009CB1',
      textBadgeColor: '#009CB1',
      modalColors: '#009CB1',
      buttonGenerateColor: '#009CB1',
      buttonSeeSummaryColor: '#009CB1',
      buttonCopyColor: '#009CB1',
      buttonCloseColor: '#F43F5E',
      textBadgeColor: '#475569',
    };

    const themeAttr = this.getAttribute('theme');
    if (themeAttr) {
      this.theme = { ...defaultTheme, ...parseThemeAttribute(themeAttr) };
    } else {
      this.theme = defaultTheme;
    }
    applyThemeAttributes(this.theme, this);
    this.apiKey = this.getAttribute('apikey');

    const apikey = this.getAttribute('apikey');
    this.modeApi = apikey && apikey.startsWith('PRODUCTION') ? 'prod' : 'dev';

    this.onSuccess = this.getAttribute('onSuccess');
    this.textsToSumarize = this.formatText(this.getAttribute('texts'));
    this.texts = this.getAttribute('texts');

    this.onSuccess = this.getAttribute('onSuccess')
      ? new Function('return ' + this.getAttribute('onSuccess'))()
      : null;

    this.onError = this.getAttribute('onError')
      ? new Function('return ' + this.getAttribute('onError'))()
      : null;
  }

  triggerSuccess(...params) {
    if (typeof this.onSuccess === 'function') {
      this.onSuccess(...params);
    }
  }

  triggerError(...params) {
    if (typeof this.onError === 'function') {
      this.onError(...params);
    }
  }
}

customElements.define('daai-summarization', DaaiSummarization);
