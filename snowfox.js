const fs = require('fs');
const path = require('path');
const { darken, lighten, transparentize } = require('color2k');

const { theme, ...restConfig } = require('./snowfox.config.js');
const baseConfig = require('./snowfox.tailwind.config.js');

const intents = [
  {
    name: 'info',
    color: 'blue'
  },
  {
    name: 'success',
    color: 'green'
  },
  {
    name: 'warning',
    color: 'yellow'
  },
  {
    name: 'error',
    color: 'red'
  }
];

let finalConfig = { ...baseConfig, ...restConfig };

// Generates colors
const { colors: initialColors, palette } = theme;
for (const key in initialColors) {
  if (typeof initialColors[key] === 'string') {
    const defaultColor = initialColors[key];
    finalConfig.theme.colors[key] = {};

    for (let i = 5; i >= 0; i--) {
      finalConfig.theme.colors[key][i * 100] = lighten(
        defaultColor,
        0.05 * (5 - i)
      );
      finalConfig.theme.colors[key][(5 + i) * 100] = darken(
        defaultColor,
        0.05 * i
      );
      finalConfig.theme.colors[key]['transparent'] = transparentize(
        defaultColor,
        0.2
      );
    }

    // set main/intent colors
    finalConfig.theme.colors.main = finalConfig.theme.colors[palette.main];
    for (const { name, color } of intents) {
      finalConfig.theme.colors[name] =
        finalConfig.theme.colors[palette[name] ?? color];
    }

    // Generates boxShadow
    const boxShadowBaseColor = finalConfig.theme.colors[key];
    if ('500' in boxShadowBaseColor) {
      if (boxShadowBaseColor) {
        finalConfig.theme.boxShadow[key] = transparentize(
          boxShadowBaseColor['500'],
          0.5
        );
      }
    }
  }
}

fs.writeFileSync(
  path.resolve(__dirname, 'tailwind.config.js'),
  `module.exports = ${JSON.stringify(finalConfig, null, 2)}`
);
