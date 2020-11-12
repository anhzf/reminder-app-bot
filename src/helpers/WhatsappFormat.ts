import constants from '../constants.js';

function format(mark: string) {
  return function (text: String): string {
    const trimmed = text.trim();
    return `${mark}${trimmed}${mark}`;
  };
}

function center(input: string, fillString: string = ' ') {
  const maxLength = constants.maxRowLength;
  const isExceedTheMax = input.length >= maxLength;

  return isExceedTheMax ? input : input
    .padStart((input.length + maxLength) / 2, fillString)
    .padEnd(maxLength, fillString);
}

function right(input:string, fillString: string = ' ') {
  const maxLength = constants.maxRowLength;
  const isExceedTheMax = input.length >= maxLength;

  return isExceedTheMax ? input : input
    .padStart(maxLength, fillString);
}

export default {
  bold: format('*'),
  italic: format('_'),
  strike: format('~'),
  code: format('```'),
  center,
  right,
} as const;
