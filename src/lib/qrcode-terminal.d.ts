/* eslint-disable comma-style */
declare module 'qrcode-terminal' {
  interface Opts {
    small: boolean
  }

  export default {
    generate(input: string, opts?: Opts, cb?: Function): void
    ,
    setErrorLevel(level: 'L' | 'Q'): void
    ,
  };
}
