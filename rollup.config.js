import nodeResolve from 'rollup-plugin-node-resolve';
import commonJs from 'rollup-plugin-commonjs';
import typeScript from 'rollup-plugin-typescript2';
import lessModules from 'rollup-plugin-less-modules';
import html from 'rollup-plugin-html';
import {terser} from 'rollup-plugin-terser';

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
                        "declaration": false
                    }
            }
        }),
        lessModules({
            minify: true,
            sourcemap: isSourceMap
        }),
        html({
            include: '**/*.html',
            htmlMinifierOptions: {
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                conservativeCollapse: true,
                minifyJS: true
            }
        }),
        // terser()
    ];
}

export default [
    {
        input: 'src/js/Alertify.ts',
        output: [{
            file: 'dist/js/alertify.js',
            format: 'iife',
            sourcemap: isSourceMap,
            name: 'alertify'
        }],
        plugins: getPlugins({target: "es5"})
    },
    {
        input: 'src/js/Alertify.ts',
        output: [{
            file: 'dist/js/alertify.mjs',
            format: 'iife',
            sourcemap: isSourceMap,
            name: 'alertify'
        }],
        plugins: getPlugins({target: "esnext"})
    }
];