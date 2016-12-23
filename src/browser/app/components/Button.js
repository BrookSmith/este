/* @flow */
import type { Exact, Styled } from '../themes/types';
import type { TextProps } from './Text';
import Text from './Text';
import styled from './styled';
import React from 'react';

type ButtonProps = TextProps & {
  title: string,
  disabled?: boolean,
  onClick?: (e: SyntheticMouseEvent) => any,
};

const CustomButton: Styled<ButtonProps> = styled((theme, props) => ({
  $extends: Text,
  borderRadius: props.borderRadius || theme.border.radius,
  color: props.color ? theme.colors[props.color] : theme.colors.white,
  // TODO: cursor: 'pointer',
  ...(props.disabled ? theme.states.disabled : {}),
}), 'button', [
  'disabled',
  'onClick',
]);

const Button: Styled<ButtonProps> = (props: ButtonProps) =>
  <CustomButton {...props}>
    <Text {...props}>{props.title}</Text>
  </CustomButton>;

Button.defaultProps = ({
  backgroundColor: 'primary',
  bold: true,
  selectable: false,
  // TODO: display: 'inline-block',
  marginVertical: 1 / 4,
  paddingHorizontal: 1,
  paddingVertical: 1 / 4,
  transform: 'capitalize',
}: Exact<ButtonProps>);

export default Button;
