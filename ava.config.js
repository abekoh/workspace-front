export default {
  require: ['./test/ava.setup.js'],
  babel: {
    testOptions: {
      plugins: [
        [
          'module-resolver',
          {
            root: ['.'],
            alias: {
              '@': '.',
              '~': '.'
            }
          }
        ]
      ]
    }
  },
  tap: true,
  verbose: true,
  typescript: {
    rewritePaths: {
      "src/": "test_build/"
    }
  }
}
