# docusaurus-delete-version

A script for deleting version from docusaurus versions

## How to delete specific version

Add `docusaurus-delete-version` to devDependency

```bash
yarn add -D docusaurus-delete-version
```

Add the following script to your `package.json` file.

```js
...
"scripts": {
  ...
  "delete-version": "docusaurus-delete-version"
},
...
```

Run the script with a command line argument of the version you wish to delete. e.g.,

```bash
yarn run delete-version 1.0.0
```

## License

[MIT][mit] ©️ [yaeda][author]

[mit]: http://opensource.org/licenses/MIT
[author]: http://github.com/yaeda
