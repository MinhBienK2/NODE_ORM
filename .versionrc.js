const internalSection = `Internals`;
/*
 * Used for creating CHANGELOG.md automatically.
 * Anything under the internalSection should be boilerplate internals
 * and shouldn't interest the end users, meaning that the template shouldn't be effected.
 */

// Check the descriptions of the types -> https://github.com/commitizen/conventional-commit-types/blob/master/index.json
module.exports = {
  types: [
    // A new feature
    { type: 'feat', section: 'Features', hidden: false },

    // A bug fix
    { type: 'fix', section: 'Bug Fixes', hidden: false },

    // Documentation only changes
    { type: 'docs', section: 'Documentation', hidden: false },

    // A code change that improves performance
    { type: 'perf', section: 'Performance Updates', hidden: false },

    // Other changes that don't modify src or test files
    { type: 'chore', section: 'Chores', hidden: false },

    // Adding missing tests or correcting existing tests
    { type: 'test', section: 'Tests', hidden: false },

    // Changes to our CI configuration files and scripts
    { type: 'ci', section: 'Continuous Integrations', hidden: false },

    // A code change that neither fixes a bug nor adds a feature
    { type: 'refactor', section: 'Code Refactoring', hidden: false },

    // Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
    { type: 'style', section: 'Styles', hidden: false },

    // Reverts a previous commit
    { type: 'revert', section: 'Reverts', hidden: false },

    { type: 'build', section: 'Builds', hidden: false },

    { type: 'translate', section: 'Translate', hidden: false, emoji: '💬', code: ':speech_balloon:' },

    { type: 'init', section: 'Initial', hidden: false, emoji: ':tada:' },
  ],
  skip: {
    changelog: true,
  },
  commitAll: true,
};
