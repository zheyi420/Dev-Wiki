# 资料

- [Homepage](https://www.typescriptlang.org/) 
- [npm/package/typescript](https://www.npmjs.com/package/typescript) 

# cmd

```powershell
-- 编译 ts 文件为 js 文件 
tsc .\hello-world.ts
```


# 问题

- 使用 tsc 命令将 .ts 文件编译成 .js 文件时，如何设置编译为 ES6，而不是默认的 ES5；

- TypeScript 类型和错误检测都只在编译时有用；

- 错误使用 interface 编译时没有报错

    ```tsx
    interface Person {
      name: string;
      age: number;
    }
    
    const friends = [
      { age: 30, gender: 'male' },
      { name: 'Ana', age: 20 },
      { name: 'Chris', age: 25 }, // trailing comma ES2017
    ];
    
    function comparePerson(a: Person, b: Person) {
      if (a.age < b.age) {
        return -1;
      }
      if (a.age > b.age) {
        return 1;
      }
      return 0;
    }
    
    console.log('friends.sort(comparePerson)', friends.sort(comparePerson));
    ```

    对象数组赋值不符，报错正常

    ```ts
    let friends: {name: string, age: number}[];
    friends = [
      { age: 30, gender: 'male' },
      { name: 'Ana', age: 20 },
      { name: 'Chris', age: 25 }, // trailing comma ES2017
    ];
    ```

    ```powershell
    PS D:\> tsc .\10-ArraysAndTypeScript.ts
    10-ArraysAndTypeScript.ts:18:14 - error TS2322: Type '{ age: number; gender: string; }' is not assignable to type '{ name: string; age: number; }'.
      Object literal may only specify known properties, and 'gender' does not exist in type '{ name: string; age: number; }'.
    
    18   { age: 30, gender: 'male' },
                    ~~~~~~~~~~~~~~
    
    Found 1 error.
    ```