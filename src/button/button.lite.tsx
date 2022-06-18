import "./button.css";

import { onMount, useMetadata, useState } from "@builder.io/mitosis";

import { classesToString } from "../../../helpers";
import { Dynamic, Intent, SharedProps, Variant } from "../../../models";

export type ButtonProps = {
  variant?: Dynamic<Variant>;
  intent?: Dynamic<Intent>;
  outline?: boolean;
  disabled?: boolean;
} & SharedProps;

useMetadata({ isAttachedToShadowDom: true });
export default function Button(props: ButtonProps) {
  const state = useState({
    classes: ''
  });

  onMount(() => {
    const setInitialProps = (variant, outline, intent, disabled, className) => {
      state.classes = classesToString([
        'sf-button',
        [variant, `sf-button--${variant}`],
        [outline, 'sf-button--outline'],
        [intent, `is-${intent}`],
        [disabled, 'is-disabled'],
        className || ''
      ]);
    };

    setInitialProps(
      props.variant,
      props.outline,
      props.intent,
      props.disabled,
      props.className
    );
  });

  return <button className={state.classes}>{props.children}</button>;
}
