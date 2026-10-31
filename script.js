const input = document.getElementById("markdown-input");
const output = document.getElementById("html-output");
const preview = document.getElementById("preview");

function convertMarkdown(input) {
  const regex = /^(#+)(.+)$/;
  let result;
  if (regex.test(input)) {
    const express = regex.exec(input);

    let tag = express[1].length;
    result = `<h${tag}>${express[2]}</h${tag}>`;
    return result;
  }
  return result;
}

input.addEventListener("input", () => {
  const result = convertMarkdown(input.value);
  output.textContent = result;
  preview.innerHTML = result;
});
