export function parseThemeAttribute(themeAttr) {
  try {
    return JSON.parse(themeAttr);
  } catch (e) {
    console.error('Erro ao analisar o atributo `theme`:', e);
    return {};
  }
}

export function applyThemeAttributes(themeProp, componentContext) {
  Object.keys(themeProp).forEach((key) => {
    const attributeKey = toKebabCase(key);

    if (!componentContext.hasAttribute(attributeKey)) {
      componentContext.setAttribute(attributeKey, themeProp[key]);
    }

    const attributeToElementMap = {
      'button-generate-color': (value) => {
        const buttonPrimary = componentContext.shadowRoot.querySelector(
          '.sumary-text-button'
        );
        if (buttonPrimary) buttonPrimary.style.backgroundColor = value;
      },
      'button-see-summary-color': (value) => {
        const buttonRecording =
          componentContext.shadowRoot.querySelector('.sumary-button');
        if (buttonRecording) buttonRecording.style.backgroundColor = value;
      },
      'border-color': (value) => {
        const elements = componentContext.shadowRoot.querySelectorAll(
          '.container-content, .period-container, .sumary-container'
        );
        elements.forEach((element) => {
          element.style.borderColor = value;
        });
      },
      'button-copy-color': (value) => {
        componentContext.style.setProperty('--button-copy-color', value);
      },
      'button-close-color': (value) => {
        componentContext.style.setProperty('--button-close-color', value);
      },
      'modal-colors': (value) => {
        componentContext.style.setProperty('--modal-colors', value);
      },
      'text-badge-color': (value) => {
        componentContext.style.setProperty('--text-badge-color', value);
      },
    };

    if (attributeToElementMap[attributeKey]) {
      attributeToElementMap[attributeKey](themeProp[key]);
    }
  });
}

export function toKebabCase(camelCase) {
  return camelCase.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

export function attributeChangedCallback(name, oldValue, newValue) {
  if (name === 'theme') {
    this.theme = parseThemeAttribute(newValue);
    applyThemeAttributes(this.theme, this); // Passa o contexto do componente
    return;
  }
  const attributeToElementMap = {
    icon: (value) => {
      const img = this.shadowRoot.querySelector('img');
      if (img) img.src = value;
    },
    'modal-colors': (value) => {
      this.style.setProperty('--modal-colors', value);
    },
    'text-badge-color': (value) => {
      this.style.setProperty('--text-badge-color', value);
    },
  };
  if (attributeToElementMap[name]) {
    attributeToElementMap[name](newValue);
  }
}
