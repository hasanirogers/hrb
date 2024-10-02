import path from 'path';
import { writeFileSync } from 'fs';

import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals-v3';
import copy from 'rollup-plugin-copy';
import scss from 'rollup-plugin-scss';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';

dotenv.config();

const copyConfig = {
  targets: [
    { src: 'src/assets', dest: '_site' },
  ],
};

const replaceConfig = {
  'process.env.ALGOLIA_ADMIN_KEY': JSON.stringify(process.env.ALGOLIA_ADMIN_KEY),
};

const scssConfig = {
  watch: ['src/styles'],
  output(styles) {
    writeFileSync('_site/assets/bundle.css', styles);
  },
  includePaths: [path.resolve('node_modules')],
};

const config = {
  input: 'src/javascript/index.js',
  output: {
    file: '_site/assets/bundle.js',
    name: 'app',
    format: 'esm',
  },
  plugins: [
    resolve(),
    minifyHTML(),
    copy(copyConfig),
    scss(scssConfig),
    replace(replaceConfig),
  ],
  preserveEntrySignatures: false,
};

if (process.env.NODE_ENV !== 'development') {
  config.plugins.push(terser());
}

export default config;
