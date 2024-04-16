**Summary**

ESLint 是一个用于识别和报告 ECMAScript / JavaScript 代码中发现的模式的工具，目的是使代码更加一致和避免错误。

ESLint will lint your code.（ESLint会对你的代码进行提示）

**Config Doc**

1. [Getting Started with ESLint](https://eslint.org/docs/user-guide/getting-started) 
2. [Configuring ESLint](https://eslint.org/docs/user-guide/configuring/) 
3. https://github.com/Microsoft/vscode-eslint#readme

**Rules**

- https://eslint.org/docs/latest/rules/
- https://zh-hans.eslint.org/docs/latest/rules/

**Airbnb Style Guide**

- https://www.npmjs.com/package/eslint-config-airbnb-base
- rule list:


**Reference**

- [搞懂 ESLint 和 Prettier](https://zhuanlan.zhihu.com/p/80574300) 


# 问题

- VS CODE 中文件保存后自动 eslint fix 是在哪里配置实现的。

# 常用

The first value is the error level of the rule and can be one of these values:

- "off" or 0 - turn the rule off
- "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
- "error" or 2 - turn the rule on as an error (exit code will be 1)

