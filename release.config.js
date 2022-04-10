module.exports = {
  branches: ['main'],
  // eslint-disable-next-line no-template-curly-in-string
  tagFormat: '${version}',
  preset: 'conventionalcommits',
  plugins: [
    // verify commits
    '@semantic-release/commit-analyzer',
    // generate release notes
    '@semantic-release/release-notes-generator',
    // generate CHANGELOG.md
    [
      '@semantic-release/changelog',
      {
        changelogTitle: '# dictcc Changelog',
      },
    ],
    // publish on npm
    '@semantic-release/npm',
    // publish a new release on github
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        assets: [
          'dist',
          'LICENSE',
          'CHANGELOG.md',
          'README.md',
          'package.json',
        ],
        message:
          // eslint-disable-next-line no-template-curly-in-string
          'chore: Release ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
}
