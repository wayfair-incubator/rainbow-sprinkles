import { createVar, style } from '@vanilla-extract/css';
import type { CommonOptions, CreateStylesOutput } from './types';
import { mapValues } from './utils';

export function createStyles(
  property: string,
  scale: true | Record<string, string>,
  conditions: Record<string, Record<string, string>>,
  defaultCondition: string,
  options: CommonOptions = {},
): CreateStylesOutput {
  if (!conditions) {
    const cssVar = createVar(property);
    const styleValue = { [property]: cssVar };

    const className = style(
      options['@layer']
        ? { ['@layer']: { [options['@layer']]: styleValue } }
        : styleValue,
      property,
    );

    return {
      vars: { default: cssVar },
      dynamic: { default: className },
      dynamicScale: scale,
      name: property,
    };
  }

  const vars = mapValues(conditions, (_, conditionName) =>
    createVar(`${property}-${conditionName}`),
  );

  const classes = mapValues(conditions, (conditionValue, conditionName) => {
    let styleValue = { [property]: vars[conditionName] };

    if (conditionValue['@media']) {
      styleValue = {
        '@media': {
          [conditionValue['@media']]: styleValue,
        },
      };
    }
    if (conditionValue['@supports']) {
      styleValue = {
        '@supports': {
          [conditionValue['@supports']]: styleValue,
        },
      };
    }
    if (conditionValue['@container']) {
      styleValue = {
        '@container': {
          [conditionValue['@container']]: styleValue,
        },
      };
    }
    if (conditionValue['selector']) {
      styleValue = {
        selectors: {
          [conditionValue['selector']]: styleValue,
        },
      };
    }

    return style(
      options['@layer']
        ? { ['@layer']: { [options['@layer']]: styleValue } }
        : styleValue,
      `${property}-${conditionName}`,
    );
  });

  return {
    dynamic: { default: classes[defaultCondition], conditions: classes },
    name: property,
    vars: { conditions: vars, default: vars[defaultCondition] },
    dynamicScale: scale,
  };
}

export type CreateStyles = typeof createStyles;
