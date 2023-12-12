# React Tic Tac Toe

Tic Tac Toe web game using Vite + React

## The reason behind this project

When I was doing the project [TDD with
Vitest](https://github.com/pabcrudel/vitest-driven-development) inspired in the
tutorial of Midudev, I realized that React is so interesting. I'm confident with
Vue so a lot of things of React where familiar to me. I decide to study in more
detail this framework taking a look to another Crash Course of React by Midudev:

- [YouTube tutorial (2:06:15)](https://www.youtube.com/watch?v=qkzcjwnueLA)

- [GitHub Repository: "Aprendiendo React"](https://github.com/midudev/aprendiendo-react/tree/master/projects/02-tic-tac-toe)

## Vitest

To add testing to an existing Vite + React project needs the following
libraries:

- `vitest`: Vite testing framework
- `@testing-library/react`: React testing utilities ant function
- `happy-dom`: Web browser's DOM emulation
- `-D`: Parameter to specify that the dependencies are for development

```bash
npm install vitest @testing-library/react happy-dom -D
```

To perform testing, you must add this script on `package.json` file.

```json
// package.json
{
  "scripts": {
    "test": "vitest"
  },
}
```

To use `happy-dom` you must add it to the testing environment on
`vite.config.js`.

```js
// vite.config.js
export default defineConfig({
  plugins: [react()], // React plugin
  test: { // Vitest config
    environment: 'happy-dom' // Emulates a web browser for testing purposes
  }
})
```
