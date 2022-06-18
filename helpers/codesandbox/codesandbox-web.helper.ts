import lernaJson from "../../lerna.json";
import { generateCodeSandboxLink } from "./codesandbox.helper";

export function generateWebCodeSandboxLink(options) {
  const { components, code, dependencies } = options;

  const html = `<div class="app">${code}</div>
<script src="index.js"></script>
`;

  const demoCode = `
import "@webcomponents/custom-elements/src/native-shim.js";
import "@webcomponents/custom-elements/custom-elements.min";
import "@snowfox/webcomponents/dist/snowfox.css";
import './index.css';

/** Note: In web components the CSS selectors are different because the shadow DOM is used.
*   Instead of .sf-row.is-error you should use sf-row::part(sf-row is-error)
*/

import { ${components.join(', ')} } from '@snowfox/webcomponents';
`.trim();

  const previewCode = `// index.js
import { ${components.join(', ')} } from '@snowfox/webcomponents';
import "@snowfox/webcomponents/dist/snowfox.css";

// index.html
${code}
`;

  const projectDependencies = {
    ...dependencies,
    '@webcomponents/custom-elements': '1.5.0',
    '@snowfox/webcomponents': `${lernaJson.version}`
  };

  const devDependencies = {
    '@babel/core': '7.2.0',
    typescript: '4.4.4',
    'parcel-bundler': '^1.6.1'
  };

  const packageJson = {
    scripts: {
      start: 'parcel index.html --open'
    }
  };

  const { url } = generateCodeSandboxLink({
    html,
    demoCode,
    dependencies: projectDependencies,
    devDependencies,
    packageJson
  });

  return { url, content: previewCode };
}
