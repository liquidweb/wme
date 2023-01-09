import { readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import { defineConfig } from 'rollup';
import resolvePlugin from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import copy from 'rollup-plugin-copy'

const pkg = JSON.parse(readFileSync(resolve(cwd(), './package.json')));
const isProd = process.env.NODE_ENV === 'production';

const defaultPlugins = [
  resolvePlugin(),
  commonjs({
    include: /node_modules/,
  }),
  copy({
    targets: [
     { src: 'src/assets/**/*', dest: 'dist/assets' }
    ]
  })
];

const onwarn = (warning, rollupWarn) => {
  if (warning.code !== 'CIRCULAR_DEPENDENCY') {
    rollupWarn(warning);
  }
};

export const esmConfig = defineConfig({
  input: pkg.source,
  inlineDynamicImports: true,
  output: {
    file: pkg.module,
    format: 'esm',
    sourcemap: true,
  },
  onwarn,
  plugins: [
    peerDepsExternal({
      includeDependencies: true,
    }),
    ...defaultPlugins,
    typescript({ tsconfig: resolve(cwd(), './tsconfig.json'), outputToFilesystem: true }),
  ],
  external: ['react', 'react-dom', 'styled-components', 'use-query-params'],
});

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react/jsx-runtime': 'jsxRuntime',
  ...(pkg.rollup?.globals || {}),
};

export const umdConfig = defineConfig({
  input: pkg.source,
  inlineDynamicImports: true,
  output: {
    file: pkg.main,
    format: 'umd',
    exports: 'named',
    name: pkg.rollup?.name || 'Wme',
    globals,
    sourcemap: true,
  },
  onwarn,
  plugins: [
    peerDepsExternal(),
    ...defaultPlugins,
    typescript({ tsconfig: resolve(cwd(), './tsconfig.json'), outputToFilesystem: true }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    terser(),
  ],
  external: ['react', 'react-dom', 'styled-components', 'use-query-params'],
});

export default isProd ? [esmConfig, umdConfig] : esmConfig;
