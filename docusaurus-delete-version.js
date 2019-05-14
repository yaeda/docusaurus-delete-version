#!/usr/bin/env node

/**
 * Copyright (c) Takeshi Yaeda
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
console.log(__dirname)
const chalk = require('chalk')
const program = require('commander')
const fs = require('fs-extra')

const CWD = process.cwd()

let version

program
  .arguments('<version>')
  .action(ver => {
    version = ver
  })
  .parse(process.argv)

if (typeof version === 'undefined') {
  console.error(
    `${chalk.yellow(
      'No version number specified!'
    )}\nPass the version you wish to delete as an argument.`
  )
  process.exit(1)
}

// error if no versions currently exist
if (!fs.existsSync(`${CWD}/versions.json`)) {
  console.error(`${chalk.yellow('No versions found!')}\nNo versions.json file currently exists.`)
  process.exit(1)
}

const versions = JSON.parse(fs.readFileSync(`${CWD}/versions.json`, 'utf8'))

const versionIndex = versions.indexOf(version)
// error if current specified version does not exist
if (versionIndex < 0) {
  console.error(
    `${chalk.yellow(
      `Version ${version} does not currently exist!`
    )}\n Version ${version} is not in the versions.json file. You can only delete existing versions.`
  )
  process.exit(1)
}
// delete version in versions.json file
versions.splice(versionIndex, 1)
fs.writeFileSync(`${CWD}/versions.json`, `${JSON.stringify(versions, null, 2)}\n`)

// delete folder of docs for this version
fs.removeSync(`${CWD}/versioned_docs/version-${version}`)

// delete sidebar file for this version
fs.removeSync(`${CWD}/versioned_sidebars/version-${version}-sidebars.json`)

console.log(`${chalk.green('Version ')}${chalk.yellow(version)}${chalk.green(' deleted!')}\n`)
