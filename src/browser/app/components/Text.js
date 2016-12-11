/* @flow */
import type { BoxProps } from './Box';
import type {
  Color,
  Size,
  Styled,
  TextAlign,
  TextDecoration,
  TextTransform,
} from '../themes/types';
import Box from './Box';
import styled from './styled';

export type TextProps = BoxProps & {
  // The lowest common denominator of:
  //  w3schools.com/css/css_text.asp
  //  facebook.github.io/react-native/releases/0.39/docs/text.html#text
  align?: TextAlign,
  bold?: boolean,
  color?: Color,
  decoration?: TextDecoration,
  size?: Size,
  transform?: TextTransform,
};

// http://inlehmansterms.net/2014/06/09/groove-to-a-vertical-rhythm/
const setFontSizeAndRhythmLineHeight = (theme, props) => {
  const fontSize = props.size
    ? theme.fontSizes[props.size]
    : theme.fontSizes.medium;
  const multiplier = Math.ceil(fontSize / theme.text.lineHeight);
  const rhythmLineHeight = theme.text.lineHeight * multiplier;
  const bordersVerticalHeight = props.borderWidth &&
    props.border === true
      ? props.borderWidth * 2
      : { top: 1, bottom: 1 }[props.border] ? props.borderWidth : 0;
  const lineHeight = rhythmLineHeight - bordersVerticalHeight;
  return {
    fontSize,
    lineHeight: `${lineHeight}px`,
  };
};

const Text: Styled<TextProps> = styled((theme, props) => ({
  $extends: Box,
  ...setFontSizeAndRhythmLineHeight(theme, props),
  color: props.color ? theme.colors[props.color] : theme.colors.black,
  display: props.display || 'inline',
  fontFamily: theme.text.fontFamily,
  fontWeight: props.bold ? theme.text.bold : 'normal',
  textAlign: props.align || 'left',
  textDecoration: props.decoration || 'none',
  textTransform: props.transform || 'none',
}));

export default Text;
