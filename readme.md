# Daai Summarization

### Sumário

1. [Introdução](#introdução)
2. [Como usar o componente](#uso)
3. [Propriedades para o componente](#propriedades)
4. [Uso do componente via CDN](#uso-do-componente-via-cdn)
5. [Construção do componente](#construção)

## Introdução

O componente é um sistema de integração voltado para empresas de saúde, como clínicas, sistemas de prontuário eletrônico e empresas com soluções próprias. Sua função é receber um conjunto de textos clínicos de um paciente, valida as informações, organiza os textos por data, e retorna um sumário estruturado.

#### Benefícios

- Automatização de processos dentro da empresa
- Sumarização de textos clínicos e processamento de entrega de acordo com a necessidade específica
- Facilidade de customização de acordo com a interface da empresa (whitelabel)
- Ganho de produtividade: não há necessidade de utilizar vários sistemas em paralelo

## Uso

### instalação

Para instalar o `Daai summarization` no seu projeto, basta rodar no terminal do projeto que você deseja usar o componente.

💻 Execute esse comando:

```bash
npm i @doctorassistant/daai-summarization
```

### Como usar após a instalação:

Após instalar o pacote no seu projeto, basta adicionar a tag <daai-summarization> no local onde deseja que o componente seja renderizado:

```html
import '@doctorassistant/daai-summarization';
<daai-summarization
  apiKey="YOUR_API_KEY"
  texts='[
  {
    "patient_id": 2504703,
    "dt_cn": "2022-10-24T16:30:00.000Z",
    "cn": "PACIENTE VEIO COM A ESPOSA...ESTEVE INTERNADO RECENTEMENTE POR HEMORRAGIA DIGESTIVA BAIXA..."
  },
  {
    "patient_id": 2504703,
    "dt_cn": "2022-10-24T10:00:00.000Z",
    "cn": "O PACIENTE RELATOU MELHORA APÓS O TRATAMENTO..."
  }
  ]'
>
</daai-summarization>
```

onde ele for chamado vai ser renderizado nesse modelo:

![readme_component_layout.png](https://raw.githubusercontent.com/doctor-assistant/daai-summarization/main/readme_summary.png)

## propriedades

### propriedades de funcionamento

```js
// ⚠️ A propriedade apiKey é obrigatória, sem ela o componente não irá fazer requisições a api, identificamos o ambiente de execução através da apiKey
apikey = 'aqui você deve passar a chave da api para realizar as requisições';

// ⚠️ A propriedade texts é obrigatória, nela você deve passar uma lista de textos clínicos contendo patient_id, dt_cn (data em formato ISO), e cn (conteúdo clínico).
texts = '';
```

Após a instalação do componente e a sua inclusão no código, será possível customizá-lo passando as props correspondentes. Caso as props não sejam fornecidas, ele utilizará o layout padrão. 🎨

#### 📂 Props que você pode passar para o componente:

```js
theme: {
  border-color,
  text-badge-color,
  button-see-summary-color,
  button-generate-color,
  button-copy-color,
  button-close-color,
  modal-colors,
}
 onSuccess={}
 onError={}
```

### 🖌️ exemplo de uso da customização:

```html
import '@doctorassistant/daai-summarization';

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      function onSuccess(data) {
        console.log(data);
      }
      function onError(data) {
        console.log(data);
      }
    </script>
  </head>
  <body>
    <daai-summarization
      texts='[
            {
              "patient_id": 2504703,
              "dt_cn": "2022-10-24T16:30:00.000Z",
              "cn": "PACIENTE VEIO COM A ESPOSA...ESTEVE INTERNADO RECENTEMENTE POR HEMORRAGIA DIGESTIVA BAIXA..."
            },
            {
              "patient_id": 2504703,
              "dt_cn": "2022-10-24T10:00:00.000Z",
              "cn": "O PACIENTE RELATOU MELHORA APÓS O TRATAMENTO..."
            }
        ]'
      apiKey="YOUR_API_KEY"
      theme='{
           "borderColor": "#0600b1",
            "textBadgeColor": "#0600b1",
            "buttonSeeSummaryColor": "#0600b1",
            "buttonGenerateColor": "#0600b1",
            "buttonCopyColor": "#00ff2a",
            "buttonCloseColor": "#0600b1",
            "modalColors":"#0600b1"
      }'
      onSuccess="onSuccess"
      onError="onError"
    >
    </daai-summarization>
  </body>
</html>
```

### 🔎 definição de cada propriedade:

### 📎 Sugestões:

- As cores podem ser em `hexadecimal`

#### border-color

Essa propriedade altera a cor das `bordas` do componente.

#### text-badge-color

Essa propriedade altera a cor dos `textos` do componente.

#### button-see-summary-color

Essa propriedade altera a cor do botão de `ver o resultado` da sumarização.

#### button-generate-color

Essa propriedade altera a cor do botão de `gerar a sumarização`.

#### button-copy-color

Essa propriedade altera a cor do botão de copiar o `resultado da sumarização`.

#### button-close-color

Essa propriedade altera a cor do botão de `fechar o modal` com o resultado da sumarização.

#### modal-colors

Essa propriedade altera a cor das `bordas do modal`.

#### onSuccess

função de callback que será executada em caso de sucesso

#### onError

função de callback que será executada em caso de erro

## Uso do componente via CDN

Caso a sua aplicação não utilize react, vue.js e angular, você pode optar por usar o nosso componente via CDN.

- exemplo de uso no HTML

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script
      src="https://cdn.jsdelivr.net/npm/@doctorassistant/daai-summarization@latest/dist/DaaiSummarization.js"
      type="module"
    ></script>
  </head>
  <body>
    <h1>Exemplo de uso do componente via cdn</h1>
    <daai-summarization
      apiKey="YOUR_API_KEY"
      texts='[
            {
              "patient_id": 2504703,
              "dt_cn": "2022-10-24T16:30:00.000Z",
              "cn": "PACIENTE VEIO COM A ESPOSA...ESTEVE INTERNADO RECENTEMENTE POR HEMORRAGIA DIGESTIVA BAIXA..."
            },
            {
              "patient_id": 2504703,
              "dt_cn": "2022-10-24T10:00:00.000Z",
              "cn": "O PACIENTE RELATOU MELHORA APÓS O TRATAMENTO..."
            }
        ]'
    ></daai-summarization>
  </body>
</html>
```

### ⚠️ Observações

- Quando passar o daai-summarization dentro do body você ainda terá que passar as propriedades obrigatórias citadas acima.
- Não é obrigatório passar a versão, caso o campo fique vazio ele irá pegar a versão mais recente.

```html
Versão mais atualizada
<script
  src="https://cdn.jsdelivr.net/npm/@doctorassistant/daai-summarization@latest/dist/DaaiSummarization.js"
  type="module"
></script>
Versão especificada
<script
  src="https://cdn.jsdelivr.net/npm/@doctorassistant/daai-summarization@X.X.X/dist/DaaiSummarization.js"
  type="module"
></script>
```

## construção

### Shadow dom 👻

O **Shadow DOM** é uma parte do **Web Components** que permite encapsular a estrutura, estilo e funcionalidade de um elemento de forma isolada do resto da página. 🔒 Isso significa que o conteúdo do **Shadow DOM** não pode ser afetado por estilos ou scripts externos, criando um "mini DOM" dentro de um componente.
