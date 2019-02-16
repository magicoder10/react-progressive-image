import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import pkg from './package.json';

const extensions = [
    '.js', '.jsx', '.ts', '.tsx',
];

export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true
        },
        {

            file: pkg.module,
            format: 'es',
            exports: 'named',
            sourcemap: true
        }
    ],
    plugins: [
        peerDepsExternal(),
        // Allows node_modules resolution
        resolve({extensions}),

        // Allow bundling cjs modules. Rollup doesn't understand cjs
        commonjs(),

        typescript(
            {
                tsconfig: "tsconfig.bundle.json",
                rollupCommonJSResolveHack: true,
                clean: true
            }
        ),

        postcss({
            modules: true
        })
    ]
};
