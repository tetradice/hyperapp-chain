# hyperapp-v2-chain

`hyperapp-v2-chain` is utility for [hyperapp V2](https://github.com/jorgebucaran/hyperapp). It chains multiple actions and dispatches them sequentially.

It is composed a hyperapp middleware and a function for chaining actions.

You can try it [online demo](https://codesandbox.io/s/hyperapp-v2-chain-demo-knqqz?fontsize=14&module=%2Findex.jsx).

## Install

```sh
# for npm
% npm install --save hyperapp-v2-chain

# for Yarn
% yarn add hyperapp-v2-chain
```

If you are using TypeScript, you don't need to install `@types/hyperapp-v2-chain`. This is because a type definition file (`index.d.ts`) is already included.

## Usage

1. Set `chainHandler` to the `middleware` argument of the `app` function.
2. Use `chain(action1, action2, ...)` for chaining multiple actions.

```jsx
import { h, app } from "hyperapp";
import { chainHandler, chain } from "hyperapp-v2-chain";

const Increment = (state, value) => (state + value);
const Double = (state) => (state * 2);

app({
    init: 0,
    view: state => (
        <div>
            <h1>{state}</h1>
            <button onclick={[Increment, 1]}>+1</button>
            <button onclick={Double}>double</button>
            <button onclick={chain([Increment, 3], Double)}>+3 and double</button>
        </div>
    ),
    node: document.getElementById("app"),
    middleware: chainHandler
});
```

## Details

- `chain(action1, action2, ...)` can receive one or more actions with payloads. 
- If you want to use `hyperapp-v2-chain` with other middleware, use `compose` at [@hyperapp/middlewares (by sergey-shpak)](https://github.com/sergey-shpak/hyperapp-middlewares)

    ```jsx
    import { h, app } from "hyperapp";
    import { chainHandler, chain } from "hyperapp-v2-chain";
    import logger from "hyperapp-v2-basiclogger";
    import { compose } from "@hyperapp/middlewares";

    app({
        ...
        middleware: compose(chainHandler, logger)
    });
    ```

## Contact
@tetradice ([GitHub Issues](https://github.com/tetradice/hyperapp-v2-chain/issues) or [Twitter](https://twitter.com/tetradice))

## License
Unlicensed