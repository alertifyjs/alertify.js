import nodeResolve from "@rollup/plugin-node-resolve";
import commonJs from "@rollup/plugin-commonjs";
import typeScript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import { terser } from "rollup-plugin-terser";

const isSourceMap = false;

function getPlugins(config) {
    return [
        nodeResolve(),
        commonJs(),
        typeScript({
            tsconfig: "tsconfig.json",
            tsconfigOverride: {
                compilerOptions:
                {
                    "target": config.target,
                    "module": "ES2015",
                    "declaration": config.target === "esnext"
                }
            }
        }),
        postcss({
            minimize: { safe: true },
            inject: false,
            sourceMap: isSourceMap,
            plugins: [autoprefixer()]
        }),
        terser({
            parse: {
                // parse options
            },
            compress: {
                // compress options
            },
            mangle: {
                 // mangle options
            },
            output: {
                // output options
                max_line_len: 500
            }
        })
    ];
}

export default [
    {
        input: "src/ts/alertify.ts",
        output: [{
            file: "dist/js/alertify.js",
            format: "iife",
            sourcemap: isSourceMap,
            name: "alertifyjs"
        },{
            file: "docs/js/alertify.js",
            format: "iife",
            sourcemap: isSourceMap,
            name: "alertifyjs"
        }],
        plugins: getPlugins({ target: "es5" })
    },
    {
        input: "src/ts/alertify.ts",
        output: [{
            file: "dist/js/alertify.mjs",
            format: "iife",
            sourcemap: isSourceMap,
            name: "alertifyjs"
        }],
        plugins: getPlugins({ target: "es2015" })
    }
];