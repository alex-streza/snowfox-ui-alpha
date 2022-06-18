import { create } from "@storybook/theming";

export const Themes = {
  manager: create({
    base: 'dark',
    brandTitle: 'SnowFox - Universal UI Library',
    brandUrl: 'https://github.com/',
    brandImage:
      'https://raw.githubusercontent.com/CKGrafico/papanasi/main/docs/resources/logo-github.svg',
    colorPrimary: '#63DEC7',
    colorSecondary: '#22A088',

    // UI
    appBg: '#1F1F1F',
    appContentBg: '#121212',
    appBorderColor: '#515253',
    appBorderRadius: 4,

    // Typography
    fontBase: '"PP Pangram Sans", sans-serif',
    fontCode: 'monospace',

    // Text colors
    textColor: '#ffffff',
    textInverseColor: 'rgba(255,255,255,0.9)',

    // Toolbar default and active colors
    barTextColor: '#ffffff',
    barSelectedColor: '#63DEC7',
    barBg: '#1F1F1F',

    // Form colors
    inputBg: 'white',
    inputBorder: 'silver',
    inputTextColor: 'black',
    inputBorderRadius: 4
  }),
  docs: create({
    base: 'dark',
    appContentBg: '#121212',
    fontBase: 'Work Sans, sans-serif'
  })
};
