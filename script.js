const output = document.getElementById("html-output");
const preview = document.getElementById("preview");
const input = document.getElementById("markdown-input");

function convertMarkdown() {
  const regexHead = /^(#+)(\s+)(.+)$/;
  // __bold text__
  const regexBold = /^(?:\*\*(.+)\*\*|__(.+)__)$/;
  // *italic text* or _italic text_
  const italic = /^(?:\*(.+)\*|_(.+)_)$/;
  const lines = input.value.split("\n");
  // # **title 1** or # __title 1__
  // # **title 1** or # __title 1__
  const regexHeadasticx = /^(#+)\s+(?:\*\*(.+)\*\*|__(.+)__)$/;

  const regexImage = /^!\[(alt-text(?:-\d+)?)\]\((image-source(?:-\d+)?)\)$/;
  // [link text-2](URL-2)
  const linkUrl = /^\[(link(\s+)text)(?:\s(\d+))?\]\((URL(?:\d+)?)\)$/;

  // > **this is a *quote***
  const expressQuoteBold = /^>\s(\*\*(.+)\*(.+)\*\*\*)$/;

  // > this is a quote
  const regexQuote = /^>\s+(.+)$/;
  const result = lines.map((line) => {
    const express = regexHead.exec(line);
    const expressBold = regexBold.exec(line);
    const expressItalic = italic.exec(line);
    const expressHead = regexHeadasticx.exec(line);
    // [alt-text-2](image-source-2)
    const expressImage = regexImage.exec(line);
    const expressLink = linkUrl.exec(line);
    const expressQuote = regexQuote.exec(line);

    const expressQuoteBoldOne = expressQuoteBold.exec(line);
    if (expressHead) {
      const tag = expressHead[1].length;
      return `<h${tag}><strong>${expressHead[2] || expressHead[3]}</strong></h${tag}>`;
    }
    if (express) {
      const tag = express[1].length;
      return `<h${tag}>${express[3]}</h${tag}>`;
    }
    if (expressBold) {
      return `<strong>${expressBold[1] || expressBold[2]}</strong>`;
    }
    if (expressItalic) {
      return `<em>${expressItalic[1] || expressItalic[2]}</em>`;
    }
    if (expressImage) {
      return `<img alt="${expressImage[1]}" src="${expressImage[2]}">`;
    }
    if (expressLink) {
      const text = `${expressLink[1]}${expressLink[3] ? ` ${expressLink[3]}` : ""}`;
      return `<a href="${expressLink[4]}">${text}</a>`;
    }
    if (expressQuote) {
      return `<blockquote>${expressQuote[1]}</blockquote>`;
    }
    if (expressQuoteBoldOne) {
      console.log(expressQuoteBoldOne);
      // blockquote><strong>this is a <em>quote</em></strong></blockquote>
      // <blockquote><strong>this is a <em>quote</em></strong></blockquote>
      return `<blockquote><strong>${expressQuoteBoldOne[2]}</strong><em>${expressQuoteBoldOne[3]}</em></strong></blockquote>`;
    } else {
      return line;
    }
  });

  return result.join(" ");
}

input.addEventListener("input", () => {
  const result = convertMarkdown();
  output.textContent = result;
  preview.innerHTML = result;
});
