import { ElementType, ComponentPropsWithoutRef } from 'react';
import { config, Sprinkles } from '../rainbow-sprinkles.css';
// import * as styles from './Box.css';
// import {
//   Sprinkles,
//   getBoxProps,
//   extractSprinklesFromProps,
// } from '../rainbow-sprinkles';

export type BoxProps<C extends ElementType> = Sprinkles &
  ComponentPropsWithoutRef<C> & {
    as?: C;
  };

export const Box = <C extends ElementType = 'div'>({
  as,
  children,
  ...props
}: BoxProps<C>) => {
  // const { sprinkles, otherProps } = extractSprinklesFromProps(props);
  const Component = as || 'div';

  return <Component {...config(props)}>{children}</Component>;
};
