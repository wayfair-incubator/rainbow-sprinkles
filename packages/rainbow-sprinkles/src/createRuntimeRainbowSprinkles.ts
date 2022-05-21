import { assignInlineVars } from './assignInlineVars';
import { assignClasses } from './assignClasses';

import type {
  RuntimeFn,
  BaseConditions,
  ConfigDynamicProperties,
  ConfigStaticProperties,
  BaseShorthand,
  CreateCssReturn,
} from './types';

/**
 * Takes the Rainbow Sprinkles config produced by createRainbowSprinklesCss
 * and the sprinkles props during runtime to output the inline styles and classes
 */
export function createRuntimeRainbowSprinkles<
  DynamicProperties extends ConfigDynamicProperties,
  StaticProperties extends ConfigStaticProperties,
  Conditions extends BaseConditions,
  Shorthands extends BaseShorthand<DynamicProperties, StaticProperties>,
>({
  config,
  properties,
  defaultCondition,
}: {
  config: CreateCssReturn<Conditions>;
  properties: string[];
  defaultCondition: string;
}): RuntimeFn<DynamicProperties, StaticProperties, Conditions, Shorthands> {
  return (props: Record<string, unknown>) => {
    const style: Record<string, string> = {};
    const className: string[] = [];

    for (const property of Object.keys(props)) {
      if (!properties.includes(property)) {
        continue;
      }

      const propertyConfigs = config[property];
      const propValue = props[property];
      if (propertyConfigs) {
        propertyConfigs.forEach((propertyConfig) => {
          className.push(
            assignClasses(propertyConfig, defaultCondition, propValue),
          );
          Object.assign(
            style,
            assignInlineVars(propertyConfig, defaultCondition, propValue),
          );
        });
      }
    }

    return {
      className: className.join(' ').trim(),
      ...(Object.keys(style).length > 0 ? { style } : {}),
    };
  };
}