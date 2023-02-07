export const emojiStringToHTML = (string) => string.replace(/U\+([\dA-Fa-f]+)/g, (_, hex) => {
    return String.fromCodePoint(parseInt(hex, 16));
});