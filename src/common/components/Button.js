// @flow
import type { ColorProps, Theme } from '../themes/types';
import type { TextProps } from './Text';
import Box from './Box';
import React from 'react';
import Text, { computeTextStyle } from './Text';

const isReactNative =
  typeof navigator === 'object' &&
  navigator.product === 'ReactNative'; // eslint-disable-line no-undef

export type ButtonProps = ColorProps & TextProps & {
  accessibilityLabel?: string, // for blindness accessibility features
  boxStyle?: (theme: Theme) => Object,
  children?: any,
  disabled?: boolean,
  onPress?: (e?: SyntheticMouseEvent) => any,
  outline?: boolean,
  textStyle?: (theme: Theme) => Object,
};

type ButtonContext = {
  Button: () => React.Element<*>,
  theme: Theme,
};

const Button = ({
  accessibilityLabel,
  boxStyle,
  children,
  disabled,
  onPress,
  textStyle,
  ...props
}: ButtonProps, {
  Button: BaseButton,
  theme,
}: ButtonContext) => {
  const platformProps = isReactNative ? {
    accessibilityComponentType: 'button',
    accessibilityLabel,
    accessibilityTraits: ['button'],
    onPress,
  } : {
    onClick: onPress,
  };

  // <Button primary
  const propColor = Object.keys(theme.colors).find(color => props[color]);
  if (propColor) {
    props = {
      ...props,
      backgroundColor: propColor,
      bold: true,
      color: 'white',
      paddingHorizontal: 1,
      size: props.size != null ? props.size : 1,
    };
  }

  // <Button primary outline
  if (propColor && props.outline) {
    props = {
      ...props,
      backgroundColor: null,
      bold: false,
      borderColor: props.backgroundColor,
      borderWidth: 1,
      color: props.backgroundColor,
      paddingHorizontal: 1,
    };
  }

  // Give button some vertical space.
  if (props.size > 0) {
    props = {
      marginVertical: 0.3,
      paddingVertical: 0.2,
      ...props,
    };
  } else {
    props = {
      marginVertical: 0.5,
      ...props,
    };
    if (props.borderWidth) {
      props = {
        // Ensure vertical Rhythm for Button size < 0. The lineHeight is the
        // only possible way how to do it.
        lineHeight: theme.typography.lineHeight - (2 * props.borderWidth),
        ...props,
      };
    }
  }

  // Button has all Text props, but it consists of two components: Box and Text.
  // Therefore, we have to split props for Box and props for Text. That's what
  // computeTextStyle does by design.
  // Remember, we can always override anything via boxStyle and textStyle props.
  const [computedTextStyle, boxProps] = computeTextStyle(theme, props);
  const childrenIsText = typeof children === 'string';

  const {
    borderRadius = theme.button.borderRadius,
  } = props;

  return (
    <Box
      as={BaseButton}
      borderRadius={borderRadius}
      disabled={disabled}
      flexDirection="row"
      justifyContent="center"
      {...platformProps}
      {...boxProps}
      style={boxStyle}
    >
      {childrenIsText ?
        <Text
          opacity={disabled ? theme.states.disabled.opacity : 1}
          style={theme => ({
            ...computedTextStyle,
            ...(textStyle ? textStyle(theme) : null),
          })}
        >{children}</Text>
      :
        children
      }
    </Box>
  );
};

Button.contextTypes = {
  Button: React.PropTypes.func,
  theme: React.PropTypes.object,
};

export default Button;