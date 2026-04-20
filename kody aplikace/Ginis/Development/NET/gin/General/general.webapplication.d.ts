declare namespace BsTest {
    /**
     * Testovaci trida pro BS
     */
    class BsTestClass {
        a: number;
        b: string;
        /**
         * Testovaci constructor
         * @param a
         * @param b
         */
        constructor(a: number, b: string);
        getA(): number;
        getB(): string;
    }
}
declare namespace Gordic.Utils {
    type gzSources = "app" | "logo" | "flags" | "help";
    function gz(source: gzSources | string, file?: string): string;
}
interface JQueryStatic {
    gz(source: Gordic.Utils.gzSources | string, file?: string): string;
    gz(source: string): string;
}
