# Tweed Peek

So you want to try Tweed but have no patience for installing compilers and command line
interfaces? That's no problem. Tweed Peek is a precompiled script that you can include
directly in HTML and try out Tweed, compilers and all.

Tweed Peek is currently hosted [here](https://tweedjs.github.io/peek.js), so here's all
you need to do.

```html
<!DOCTYPE html>
<html>
  <head>
    <script src='https://tweedjs.github.io/peek.js'></script>
  </head>
  <body>
    <div id='app'></div>

    <script type='application/javascript+tweed'>
      import { mutating, Node } from 'tweed'
      import render from 'tweed/render/dom'

      class Counter {
        @mutating count = 0

        render () {
          return (
            <button on-click={() => this.count++}>
              Clicked {this.count} times
            </button>
          )
        }
      }

      render(new Counter(), app)
    </script>
  </body>
</html>
```

Then just open up `index.html` in a browser and you're up and running!

You don't have to write your code within the `<script>` if you don't want to. Just add a
`src` attribute and you're golden. However, if you do this, browsers will complain if
you're using `file://` URL's. So you'll have to use a simple web server
[like this one](https://github.com/indexzero/http-server).

```html
<!DOCTYPE>
<html>
  <head>
    <script src='https://tweedjs.github.io/peek.js'></script>
    <script type='application/typescript+tweed' src='main.tsx'></script>
  </head>
  <body>
    <div id='app'></div>
  </body>
</html>
```

Use the MIME types `application/javascript+tweed` and `application/typescript+tweed` to
use Babel or TypeScript, respectively, to compile the modules right there in the browser.

> **Note:** Unless this goes without saying—This is _not_ for production. Check out the
> [website](https://tweedjs.github.io) to learn more about how to set it up proper.
> (It's really easy. We have a CLI.)
