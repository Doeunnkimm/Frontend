module.exports = {
  env: {
    customKey: 'TEST NEXT CONFIG',
  },
  async rewrites() {
    return [
      {
        source: '/about',
        destination: '/',
        has: [{ type: 'query', key: 'test', value: 'rewrite' }],
      },
    ]
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
  // distDir: 'build',
}
