declare module 'qrcode-terminal' {
    interface opts {
        small: boolean
    }

    export default {
        generate(input: string, opts?: opts, cb?: Function): void
    };
}