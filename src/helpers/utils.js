export const truncateText = (text, numWords = 20) => {
  const splitText = text.split(" ");
  if (splitText.length > numWords) {
    const newText = [...splitText.slice(0, numWords).join(" "), "..."].join("");
    return newText;
  }
  return text;
};
