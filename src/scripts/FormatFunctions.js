export function formatAnalysisPeriod(data) {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (error) {
      console.error('Erro ao parsear a string JSON:', error);
      return 'Erro ao processar os dados';
    }
  }

  if (Array.isArray(data)) {
    const dates = data.map((item) => new Date(item.dt_cn));
    dates.sort((a, b) => a - b);
    const formatDate = (date) =>
      `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${date.getFullYear()}`;
    if (dates.length === 1) {
      return `Análise do período de ${formatDate(dates[0])}`;
    }
    return `Análise do período de ${formatDate(dates[0])} a ${formatDate(dates[dates.length - 1])}`;
  } else {
    return 'Análise do período';
  }
}

export function formatMarkdown(markdownText) {
  const formattedText = markdownText
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
    .replace(/^###### (.*$)/gim, '<h6>$1</h6>')

    .replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>')
    .replace(/^\- (.*$)/gim, '<ul><li>$1</li></ul>')

    .replace(/^\d+\. (.*$)/gim, '<ol><li>$1</li></ol>')

    .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*)\*/gim, '<i>$1</i>')

    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')

    .replace(/\n$/gim, '<br>');

  return formattedText.trim();
}
