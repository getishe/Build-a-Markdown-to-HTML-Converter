const input = document.getElementById("markdown-input");
const output = document.getElementById("html-output");
const preview = document.getElementById("preview");

function convertMarkdown(input) {
  const regex = /^(#+) (.+)$/;
  let result;
  if (regex.test(input)) {
    result = regex.exec(input);
    console.log(result[2]);
  }
  return result;
}

input.addEventListener("input", () => {
  const result = convertMarkdown(input.value);
  output.innerHTML = result;
});
