const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      
      // Captura screenshot após cada teste
      on('task', {
        log(message) {
          console.log(message)
          return null
        }
      })
    },
    baseUrl: 'https://golden-movie-studio.netlify.app/',
    video: true,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    experimentalStudio: true
  },
});
