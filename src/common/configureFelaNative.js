/* @flow */
// import logger from 'fela-plugin-logger';
import validator from 'fela-plugin-validator';
import { createRenderer } from 'fela-native';

const devPreset = [
  // // It's pretty verbose, but sometimes also pretty useful.
  // logger({
  //   logMetaData: false,
  // }),
  validator({
    logInvalid: true,
    deleteInvalid: true,
  }),
];

const configureFela = () => {
  const renderer = createRenderer({
    plugins: [
      ...(process.env.NODE_ENV !== 'production' ? devPreset : []),
    ],
  });
  return renderer;
};

export default configureFela;
