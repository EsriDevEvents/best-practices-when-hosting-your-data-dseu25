// generate-colors.js
// Uso:
//   node generate-colors.js categories.txt
//   node generate-colors.js categories.txt output.txt

const fs = require("fs");
const path = require("path");

if (process.argv.length < 3) {
  console.error("Uso: node generate-colors.js <input.txt> [output.txt]");
  process.exit(1);
}

const inputPath = process.argv[2];
const outputPath =
  process.argv[3] ||
  inputPath.replace(/\.txt$/i, "_colors.txt");

// Leer fichero de entrada
const content = fs.readFileSync(inputPath, "utf8");

// Una categoría por línea, ignorando líneas vacías
const categories = content
  .split(/\r?\n/)
  .map(line => line.trim())
  .filter(line => line.length > 0);

// Generar color por índice usando HSL
function indexToColor(i, total) {
  // Repartimos el matiz (hue) a lo largo del círculo de color
  const hue = (i * 360 / Math.max(total, 1)) % 360;
  const saturation = 65; // %
  const lightness = 50;  // %
  return hslToHex(hue, saturation, lightness);
}

// HSL -> HEX
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  const r = Math.round(255 * f(0));
  const g = Math.round(255 * f(8));
  const b = Math.round(255 * f(4));

  return rgbToHex(r, g, b);
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map(x => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

// Construir líneas de salida
const lines = categories.map((cat, i) => {
  const safeCat = cat.replace(/"/g, '\\"');
  const color = indexToColor(i, categories.length);
  return `"${safeCat}", "${color}",`;
});

// Guardar fichero de salida
fs.writeFileSync(outputPath, lines.join("\n") + "\n", "utf8");

console.log(`Generado fichero de salida: ${outputPath}`);
