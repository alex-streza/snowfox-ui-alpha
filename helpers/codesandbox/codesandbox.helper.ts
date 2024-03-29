import LZString from "lz-string";

export function toBase64(string: string) {
  return LZString.compressToBase64(string)
    .replace(/\+/g, `-`)
    .replace(/\//g, `_`)
    .replace(/=+$/, ``);
}

export function generateCodeSandboxLink(options) {
  const {
    html,
    demoCode,
    dependencies,
    devDependencies,
    packageJson,
    isTypescript = false,
    isJSX = false,
    extraFiles = null,
    publicFolder = ''
  } = options;

  const indexName = `index.${isTypescript ? 'ts' : 'js'}` + (isJSX ? `x` : ``);
  const indexHTMLFolder = `${publicFolder}index.html`;

  const css = `
.app {
  --sf-grid-gutter: 0.15rem;
  --sf-color-primary-normal: #017af0;

  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding-top: 1rem;
}

.footer {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 0.8rem;
  justify-content: flex-end;
  margin-top: 1rem;
  text-align: right;
}

  `;

  const content = `
import './index.css';
${demoCode}
`;

  const parameters = {
    files: {
      'package.json': {
        content: {
          ...packageJson,
          dependencies,
          devDependencies
        }
      },
      [indexHTMLFolder]: {
        content: `
${html}
<div class="footer">
  <a href="https://snowfox.js.org" target="_blank" rel="noreferrer">
    Visit the docs at snowfox.js.org
  </a>
</div>
        `
      },
      'index.css': {
        content: css
      },
      [indexName]: {
        content
      }
    }
  };

  if (extraFiles) {
    parameters.files = { ...parameters.files, ...extraFiles };
  }

  const urlParams = toBase64(JSON.stringify(parameters));

  return {
    url: `https://codesandbox.io/api/v1/sandboxes/define?parameters=${urlParams}`,
    content: demoCode
  };
}
