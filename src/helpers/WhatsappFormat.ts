function format(mark: string) {
  return function (text: String): string {
    const trimmed = text.trim();
    return `${mark}${trimmed}${mark}`;
  };
}

export default {
  bold: format('*'),
  italic: format('_'),
  strike: format('~'),
  code: format('```'),
} as const;
