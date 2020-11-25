const cdnjs = {
  vanilla: [],
  react: [
    {
      latest: 'https://unpkg.com/react@17/umd/react.development.js',
      name: 'react',
      version: '17.0.1'
    },
    {
      latest: 'https://unpkg.com/react-dom@17/umd/react-dom.development.js',
      name: 'react-dom',
      version: '17.0.1'
    }
  ],  
  vue: [
    {
      latest: 'https://unpkg.com/vue@next',
      name: 'vue',
      version: 'lastest'
    }
  ],
  preact: [
    {
      latest: 'https://unpkg.com/preact@10/dist/preact.umd.js',
      name: 'preact',
      version: '10.5.5'
    },
    {
      latest: 'https://unpkg.com/preact@10/hooks/dist/hooks.umd.js',
      name: 'preact-hooks',
      version: '10.5.5'
    }
  ],
  rxjs: [
    {
      latest: 'https://unpkg.com/rxjs@5.2.0/bundles/Rx.min.js',
      name: 'rxjs',
      version: '5.2.0'
    }
  ],
  typescript: [
    {
      latest: 'https://cdnjs.cloudflare.com/ajax/libs/typescript/4.0.5/typescript.min.js',
      name: 'typescript',
      version: '4.0.5'
    }
  ],
  jquery: [
    {
      latest: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js',
      name: 'jquery-compat',
      version: '3.0.0-alpha1'
    }
  ],
  coffeescript: [
    {
      latest: 'https://cdn.jsdelivr.net/npm/coffeescript@2.5.1/lib/coffeescript-browser-compiler-legacy/coffeescript.min.js',
      name: 'coffeescript',
      version: '2.5.1'
    }
  ],
  lodash: [
    {
      latest: 'https://cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js',
      name: 'lodash',
      version: '4.17.20'
    }
  ]
};

export default cdnjs;