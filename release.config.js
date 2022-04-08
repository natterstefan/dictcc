module.exports = {
  branches: ['main'],
  preset: 'conventionalcommits',
  plugins: [
    // verify commits
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
      },
    ],
    // generate release notes
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
      },
    ],
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
        assets: ['dist', 'LICENSE', 'CHANGELOG.md', 'README.md'],
        // eslint-disable-next-line no-template-curly-in-string
        message: 'chore: Release ${nextRelease.version} [skip ci]',
      },
    ],
  ],
}
