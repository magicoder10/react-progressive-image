import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
// import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import pkg from './package.json';

const extensions = [
    '.js', '.jsx', '.ts', '.tsx',
];

const name = 'ImageLoader';

export default {
    input: './src/lib.ts',
    plugins: [
        peerDepsExternal(),
        // Allows node_modules resolution
        resolve({extensions}),

        // Allow bundling cjs modules. Rollup doesn't understand cjs
        commonjs(),

        typescript(
            {
                tsconfig: "tsconfig.bundle.json",
            }
        ),

        // // Compile TypeScript/JavaScript files
        // babel({
        //     extensions,
        //     include: ['src/**/*']
        // }),

        postcss({
            modules: true
        })
    ],

    output: [{
        file: pkg.main,
        format: 'cjs',
    }, {
        file: pkg.module,
        format: 'es'
    }, {
        file: pkg.browser,
        format: 'iife',
        name,

        // https://rollupjs.org/guide/en#output-globals-g-globals
        globals: {
        }
    }]
};
