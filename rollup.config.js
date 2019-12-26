import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import inlineSvg from 'rollup-plugin-inline-svg';
import pkg from './package.json';
import dev from 'rollup-plugin-dev';
import livereload from 'rollup-plugin-livereload';
import minify from 'rollup-plugin-babel-minify';

const isDev = process.env.ROLLUP_WATCH === 'true'

export default {
  input: './src/index.js',
  output: [
    {
      name: 'ace',
      file: 'dist/index.js',
      format: 'umd',
      sourcemap: isDev,
    }
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
    }),
    postcss(),
    inlineSvg(),
    dev(),
    minify({ comments: false }),
    isDev ? livereload() : null
  ],
}
