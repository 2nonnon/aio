// @ts-check

/** @type {import("syncpack").RcFile} */
const config = {
  versionGroups: [
    {
      dependencies: ['@antfu/eslint-config'],
      packages: ['**'],
      pinVersion: '0.43.1',
    },
  ],
}

module.exports = config
