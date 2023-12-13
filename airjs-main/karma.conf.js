var wpConfig = {};
// wpConfig.entry = {};

module.exports = function (config) {
    config.set({
        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-chrome-launcher',
        ],

        browsers: ['ChromeHeadless'],

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        client: {
            jasmine: {
                random: false,
                timeoutInterval: 100000
            }
        },
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'webpack'],

        // list of files / patterns to load in the browser
        // Here I'm including all of the the Jest tests which are all under the __tests__ directory.
        // You may need to tweak this patter to find your test files/
        // files: ['tests/extension/src/background/background.js', './karma-setup.js', {pattern: 'tests/extension/src/static/*.air', included: false}],
        files: ['./tests/**/*.tests.js', {pattern: 'tests/utils/static/*.html', included: false}, {pattern: 'tests/utils/static/*.air', included: false}, {pattern: 'tests/utils/static/*.txt', included: false}],
        exclude: ['node_modules'],
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
        //     // Use webpack to bundle our tests files
            './tests/**/*.tests.js': ['webpack'],
        },

        singleRun: true,

        webpack: wpConfig
    });
}
