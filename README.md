# Next.js with sql.js 🐳

This is a barebone example of how to use [sql.js](https://github.com/sql-js/sql.js) in [Next.js](https://github.com/vercel/next.js/).

[sql.js](https://github.com/sql-js/sql.js) is SQLite compiled to WebAssembly. This enables SQLite to run entirely in the browser. ✨

This repo is largely based on [@lovasoa](https://github.com/lovasoa)'s [react-sqljs-demo example](https://github.com/sql-js/react-sqljs-demo).
Update: This repo is a [fork](https://github.com/subwaymatch/nextjs-with-sqljs-example) of another to update it for the latest version of Next.js and sql.js.

## Working Example 🔥

The old hosted example is broken.

~~[https://nextjs-with-sqljs-example.vercel.app/](https://nextjs-with-sqljs-example.vercel.app/)~~

## Tricks to make sql.js work in Next.js 🍉

There are two primary differences compared to the [react-sqljs-demo example](https://github.com/sql-js/react-sqljs-demo).

### Trick 1: Webpack config (`next.config.js`)

This example doesn't utilize `craco` to provide a custom webpack configuration. Instead, we add a custom webpack configuration in `next.config.js` to not include a polyfill for the `fs` module.

```javascript
// next.config.js
module.exports = {
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
};
```

### Trick 2: Retrieve wasm file from CDN

The wasm file is retrieved from a CDN when initializing [sql.js](https://github.com/sql-js/sql.js).

```javascript
initSqlJs({
  // locateFile: (file) => `https://sql.js.org/dist/${file}`,
  locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.12.0/${file}`
});
```

## Running locally 🏃🏻

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Changes and fixes worth noting

2025-01-21
- I have updated NextJS to version 15.1.5 and have also migrated to app router.
- I have updated sql.js to version 1.12.0.
- I have changed the sql.js WASM URL to use the Cloudflare CDN with the version specified to 1.12.0. I'm guessing this means this repo will remain as a stable snapshot.
- The `--turbo` flag does not appear to work with sql.js, so be careful if you copy this example elsewhere. I think because turbopack differs from webpack and the patch we have in `next.config.js` is not compatible.

## Credits

[@lovasoa](https://github.com/lovasoa) - [react-sqljs-demo example](https://github.com/sql-js/react-sqljs-demo)

[@subwaymatch](https://github.com/subwaymatch) - [nextjs-with-sqljs-example](https://github.com/subwaymatch/nextjs-with-sqljs-example)
