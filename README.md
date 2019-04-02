# @primer/next-pages
Next.js does not make it easy to list or iterate over all of the pages in your app. Maybe this package can help!

## Installation
```
npm install @primer/next-pages
```

## Usage
In your `next.config.js`:

```js
const withPages = require('@primer/next-pages/plugin')

module.exports = withPages({
  /* your config */
})
```

In your app, import the [page map](#page-map) from `@primer/next-pages`, and serialize it as JSON to see what's in it:

```jsx
import {pageMap} from '@primer/next-pages'

export default props => (
  <pre {...props}>{JSON.stringify(pageMap, true, 2)}</pre>
)
```

## Page map
The `pageMap` export from `@primer/next-pages` is a [Map] object whose keys are the URL paths and values are objects with the following keys:

* `path` is the path _relative to the `pages` directory_, e.g. `index.md` for `pages/index.md`
* `file` is the full file path, e.g. `/Users/cool/projects/sweet/pages/index.md`
* `meta` is an object containing any [page metadata](#page-metadata)    
* `requirePath` is the path that you would pass to the function returned by `require.context()`, as in:

    ```js
    const requirePage = require.context('./pages', true, /\.md$/)
    const Page = requirePage(page.requirePath)
    ```

### Page metadata
This module uses [gray-matter] to parse front matter from each file in the `pages/` directory, and outputs that metadata in the JS bundle so that you can do things like:

* Know the title of each page, a la Jekyll
* Conditionally show or hide common content on some pages
* Generate navigation links and lists automatically

:rotating_light: **Note: this plugin does not handle outputting front matter in the JS bundle**. It only reads it into the page map object so that you can use it elsewhere. You can make a loader that discards front matter in the houtput in just a couple of lines:

```js
const matter = require('gray-matter')
module.exports = function removeFrontMatter(source) {
  const {content, data} = matter(source)
  return content
}
```

Ensuring that the above loader is executed _after_ this module's is an exercise left to the reader.


[Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[gray-matter]: https://www.npmjs.com/package/gray-matter
