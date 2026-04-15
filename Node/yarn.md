- https://yarnpkg.com/
- [Installation](https://classic.yarnpkg.com/en/docs/install#windows-stable) 
- [Usage](https://classic.yarnpkg.com/en/docs/usage) 
- [CLI Introduction](https://classic.yarnpkg.com/en/docs/cli/) 

# yarn workspace

- https://classic.yarnpkg.com/en/docs/cli/workspace

Yarn workspace 初始化

# Config



# Using
- [Usage](https://classic.yarnpkg.com/en/docs/usage) 

## Cases


## Command

- [CLI Introduction](https://classic.yarnpkg.com/en/docs/cli/) 

### `yarn run`

`yarn run [script] [<args>]`

- `[script]` 也可以是安装在 `node_modules/.bin/` 内的任何本地可执行文件。
- 也可以省略命令中的 `run`，每个 `script` 都可以用其名称执行。


# Error

## `ESOCKETTIMEDOUT` 当执行 `yarn install`

`yarn-error.log`
```log
Trace:

  Error: https://registry.yarnpkg.com/date-fns/-/date-fns-2.30.0.tgz: ESOCKETTIMEDOUT

      at ClientRequest.<anonymous> (C:\Users\21632\AppData\Roaming\npm\node_modules\yarn\lib\cli.js:141517:19)

      at Object.onceWrapper (node:events:641:28)

      at ClientRequest.emit (node:events:527:28)

      at TLSSocket.emitRequestTimeout (node:_http_client:771:9)

      at Object.onceWrapper (node:events:641:28)

      at TLSSocket.emit (node:events:539:35)

      at TLSSocket.Socket._onTimeout (node:net:516:8)

      at listOnTimeout (node:internal/timers:559:17)

      at processTimers (node:internal/timers:502:7)
```

Solution:
- `yarn install --network-timeout 600000`
	set network timeout param to `yarn install`.


Ref:
- [ESOCKETTIMEDOUT error while yarn install command](https://stackoverflow.com/questions/55845756/esockettimedout-error-while-yarn-install-command) 

