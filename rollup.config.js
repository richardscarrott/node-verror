import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import alias from 'rollup-plugin-alias';
import pkg from './package.json';

// const aliases = 

export default [
    // // browser-friendly UMD build
    // {
    //     input: 'src/main.js',
    //     output: {
    //         name: 'VError',
    //         file: pkg.browser,
    //         format: 'umd'
    //     },
    //     plugins: [
    //         alias(aliases),
    //         resolve(), // so Rollup can find `ms`
    //         commonjs() // so Rollup can convert `ms` to an ES module
    //     ]
    // },

    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify 
    // `file` and `format` for each target)
    {
        input: 'src/main.js',
        external: ['assert'],
        output: [
            { file: pkg.main, format: 'cjs' },
            { file: pkg.module, format: 'es' },
            // { name: 'VError', file: pkg.browser, format: 'umd' }
        ],
        plugins: [
            alias({
                entries: [
                    { find: 'assert-plus', replacement: './aliases/assert-plus' },
                    { find: 'util', replacement: './aliases/util' },
                    { find: 'assert', replacement: './aliases/assert-plus' },
                    { find: 'core-util-is', replacement: '$1.js' },
                ]
            }),
            resolve(), // so Rollup can find `ms`
            commonjs() // so Rollup can convert `ms` to an ES module
        ]
    }
];