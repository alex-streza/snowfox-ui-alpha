import './button.css';

import { onMount, useMetadata, useState } from '@builder.io/mitosis';

import { classesToString } from '../../../helpers';
import { Dynamic, Intent, SharedProps, Variant } from '../../../models';

export type ButtonProps = {
  variant?: Dynamic<Variant>;
  intent?: Dynamic<Intent>;
  disabled?: boolean;
} & SharedProps;

useMetadata({ isAttachedToShadowDom: true });
export default function Button(props: ButtonProps) {
  const state = useState({
    classes: ''
  });

  onMount(() => {
    const setInitialProps = (variant, intent, className) => {
      state.classes = classesToString([
        'sf-button',
        [variant, `sf-button--${variant}`],
        [intent, `is-${intent}`],
        className || ''
      ]);
    };

    setInitialProps(props.variant, props.intent, props.className);
  });

  return (
    <button className={state.classes} disabled={props.disabled}>
      {props.children}
    </button>
  );
}
