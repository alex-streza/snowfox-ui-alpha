import "./row.css";

import { onMount, useMetadata, useState } from "@builder.io/mitosis";

import { classesToString, getBreakpointClasses } from "../../../helpers";
import { BreakpointProps, SharedProps } from "../../../models";

export type RowProps = SharedProps &
  BreakpointProps<'row' | 'column' | 'row-reverse' | 'column-reverse'>;

useMetadata({ isAttachedToShadowDom: true });

export default function Row(props: RowProps) {
  const state = useState({
    classes: ''
  });

  onMount(() => {
    const setInitialProps = (xs, s, m, l, xl, className) => {
      state.classes = classesToString([
        'sf-row',
        getBreakpointClasses(xs, s, m, l, xl, 'sf-row--'),
        className || ''
      ]);
    };

    setInitialProps(
      props.xs,
      props.s,
      props.m,
      props.l,
      props.xl,
      props.className
    );
  });

  return <div className={state.classes}>{props.children}</div>;
}
