import "./container.css";

import { onMount, useMetadata, useState } from "@builder.io/mitosis";

import { classesToString } from "../../../helpers";
import { SharedProps } from "../../../models";

export type ContainerProps = {
  fluid?: boolean;
} & SharedProps;

useMetadata({ isAttachedToShadowDom: true });

export default function Container(props: ContainerProps) {
  const state = useState({
    classes: ''
  });

  onMount(() => {
    const setInitialProps = (fluid, className) => {
      state.classes = classesToString([
        'sf-container',
        [fluid, 'sf-container--fluid'],
        className || ''
      ]);
    };

    setInitialProps(props.fluid, props.className);
  });

  return <div className={state.classes}>{props.children}</div>;
}
