# TypeScript 模式

`SKILL.md` 里每条规则的代码例子。底下的原则与语言无关。见 **type-system-discipline** 和 **boundary-discipline** 原则 skill。

## 品牌类型

给原始类型打品牌，这样它们不会被混用。在边界校验一次。下游代码信任这个类型。

```ts
type AgentId = string & { readonly __brand: "AgentId" };

function isAgentId(input: string): input is AgentId {
  return isUUID(input);
}

function parseAgentId(input: string): AgentId {
  if (!isAgentId(input)) throw new Error(`Invalid agent id: ${input}`);
  return input;
}

function focusAgent(id: AgentId): void {
  /* input is trusted */
}
```

对齐 `readonly __brand: 'X'` 的形状。不要发明新约定。

## 可辨识联合

用一个字面量判别式为变体建模。每个变体共享字段名，每个变体的值都唯一，这样不可能的组合无法表示。

```ts
// Don't. Boolean + optionals lets contradictory states exist.
type DiffState = { loading: boolean; diff?: GitDiff; error?: string };

// Do. Only valid states exist.
type DiffState =
  | { kind: "loading" }
  | { kind: "ready"; diff: GitDiff }
  | { kind: "error"; error: string };
```

选一个判别式名字（`kind`、`type`、`tag`），并坚持用它。

## 构造式建模

用全都合法的部件来建造类型，而不是用运行时检查去限制一个宽松类型。

非空，经由可变长元组：

```ts
type NonEmpty<T> = [T, ...T[]];

// Don't: T[] plus a length check every caller must repeat
function pickWinner(entries: string[]): string {
  if (entries.length === 0) throw new Error("no entries");
  return entries[Math.floor(Math.random() * entries.length)];
}

// Do: an empty value of the type can't exist
function pickWinner(entries: NonEmpty<string>): string {
  return entries[Math.floor(Math.random() * entries.length)];
}
```

普通的 `T[]` 到来的地方，用守卫收窄一次。这个事实随后在类型里旅行：

```ts
const isNonEmpty = <T>(arr: T[]): arr is NonEmpty<T> => arr.length > 0;
```

偶数长度，作为对：

```ts
type Pairs<T> = [T, T][];
```

一个时间范围，作为起点加时长：

```ts
// Don't: a comment holds the invariant
type TimeRange = { start: Date; end: Date }; // start <= end

// Do: a negative range can't be written; derive end when needed
type TimeRange = { start: Date; durationMs: number };
```

让 `durationMs` 保持普通数字。只有原始数字可能被传到期望时长的地方时，才给它打品牌（按品牌类型），不要出于反射。选一个让坏状态无法构造的表示，然后在上面暴露你需要的读法（`pairs.flat()`，一个 `rangeEnd()` 辅助）。

## 最简单的全函数类型

不要把一切都加强。对它的每个操作都是全函数时，留着 `T[]`：

```ts
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0); // [] is 0, fine
```

宽松类型在使用点迫使一个谎时，再加强。迹象是 `!`、`arr[0] as T`，以及一次「不该发生」的抛出：

```ts
// Don't: partiality smuggled past the compiler
function newestSession(sessions: Session[]): Session {
  return sessions.at(0)!;
}

// Do: strengthen the input; the assertion disappears
function newestSession(sessions: NonEmpty<Session>): Session {
  return sessions[0];
}
```

把结果放宽成 `Session | undefined`，是另一个全函数签名。

## `unknown` 优于 `any`

外部数据始终是 `unknown`。使用之前先收窄。

```ts
// Don't
function handle(input: any) {
  return input.foo.bar;
}

// Do
function handle(input: unknown) {
  if (typeof input === "object" && input !== null && "foo" in input) {
    // narrowed; compiler verifies access
  }
}
```

外部来源包括 RPC 载荷、`JSON.parse`、`postMessage`、IPC、文件内容、环境变量、数据库结果。

## 手写守卫之前先用 schema

为外部数据写逐属性的类型守卫之前，先找仓库的运行时 schema 库和已有 schema。让一个 schema 拥有校验，并从它派生 TypeScript 类型。不要同时维护一个 schema、一份重复的 interface，以及一个会彼此漂开的守卫。

```ts
import { z } from "zod";

const UserSchema = z.object({
  id: z.string().uuid(),
  role: z.enum(["admin", "member"]),
});

type User = z.infer<typeof UserSchema>;

function parseUser(input: unknown): User {
  return UserSchema.parse(input);
}
```

失败是预期分支时，用 `safeParse`。仓库用另一个 schema 库时，用等价的推断辅助。不要为一个守卫新增 schema 依赖。这条规则偏好代码库已经信任的那套 schema 系统。

## 不要 `as` 断言

每一次 `as` 都是潜在的运行时崩溃。只在类型系统已经验证了这个声称之后才断言。

```ts
import { z } from "zod";

// Don't
const user = data as User;

// Don't
function isUser(data: unknown): data is User {
  return typeof data === "object" && data !== null && "id" in data;
}

// Do
const userSchema = z.object({ id: z.string(), name: z.string() });
type User = z.infer<typeof userSchema>;

function parseUser(data: unknown): User {
  return userSchema.parse(data);
}
```

类型先行时，用它所证明的类型标注校验器。编译器随后会拒绝一个证明得比该类型少的校验器。从下面的对象里去掉 `name`，赋值就会编译失败。

```ts
type User = { id: string; name: string };

const userSchema: z.ZodType<User> = z.object({ id: z.string(), name: z.string() });
```

从现有代码里重构掉一个 `as` 时，找出 TypeScript 为什么推不出来：

- 缺判别式：加一个，改成可辨识联合。
- 来源类型过宽（例如 `Record<string, unknown>`）：收窄它。
- 无类型的边界：用拥有这个形状的 schema 来解析。只在没有任何 schema 的地方加一个。
- 确实表达不了：用品牌类型或 `satisfies`。

## 收窄层次

从最好到最后手段：

1. **可辨识联合的 switch / if。** 编译器自动收窄。
2. **`in` 运算符。** `"key" in obj` 收窄到包含该键的变体。
3. **`typeof` / `instanceof`。** 用于原始类型和类实例。
4. **用户定义的类型守卫。** 上面这些不够时。
5. **`as` 断言。** 只在校验之后。

```ts
function area(s: Shape): number {
  if ("radius" in s) return Math.PI * s.radius ** 2; // narrowed to circle
  return s.width * s.height; // narrowed to rect
}
```

## 类型守卫

守卫必须真正验证它所声称的。撒谎的守卫比 `as` 更糟。

```ts
function isCircle(s: Shape): s is Shape & { kind: "circle" } {
  return s.kind === "circle";
}
```

能用判别式收窄时，优先用它。

## 穷尽性

在 default 分支里，把判别式赋给一个 `never` 类型的局部变量。

```ts
// Value-returning switch
function area(s: Shape): number {
  switch (s.kind) {
    case "circle":
      return Math.PI * s.radius ** 2;
    case "rect":
      return s.width * s.height;
    default: {
      const _exhaustive: never = s;
      return _exhaustive;
    }
  }
}

// Void switch
function handle(s: Shape): void {
  switch (s.kind) {
    case "circle":
      drawCircle(s);
      break;
    case "rect":
      drawRect(s);
      break;
    default: {
      const _exhaustive: never = s;
      void _exhaustive;
    }
  }
}
```

返回值的 switch 用返回风格，语句 switch 用 void 风格。

## `satisfies` 优于 `as`

`satisfies` 校验，同时不放宽字面量类型。

```ts
// Don't. Widens, loses literal types.
const config = { theme: "dark", cols: 3 } as Config;

// Do. Validates AND preserves literal types.
const config = { theme: "dark", cols: 3 } satisfies Config;
// config.theme is "dark" (literal), not string
```

## 边界校验

在数据进入的地方校验一次。内部信任类型。见 **boundary-discipline** 原则 skill。

- **线上格式**（proto、JSON-RPC）：用 `ignoreUnknownFields` 解析，这样向前兼容的改动不会弄坏旧客户端。
- **持久化的 JSON：** 带版本的 blob，解析包在 try/catch 里。
- **不要在调用链深处重新校验。**

## 从 schema 派生的类型

当一个 `.proto`、OpenAPI 规格、GraphQL schema 或数据库迁移已经定义了形状，从生成的类型派生，不要再复制一份。

```ts
// Don't. Duplicate shape, drifts when the schema changes.
type CheckSummary = {
  totalCount: number;
  checks: { name: string; status: string }[];
};
function renderChecks(s: CheckSummary) {
  /* ... */
}

// Do. Derive from the generated schema type.
import type { ChecksMessage } from "<generated module>";
function renderChecks(s: Pick<ChecksMessage, "totalCount" | "checks">) {
  /* ... */
}
```

写新 interface 之前，先伸手拿 `Pick`、`Omit`、`Parameters`、`ReturnType`、`Awaited`、`typeof`。

## 对象参数

```ts
// Don't. Swap two args, still compiles.
openFile(uri, {
  startLineNumber: 10,
  startColumn: 1,
  endLineNumber: 10,
  endColumn: 1,
});

// Do. Order-independent, self-documenting.
openFile({
  uri,
  selection: {
    startLineNumber: 10,
    startColumn: 1,
    endLineNumber: 10,
    endColumn: 1,
  },
});
```

热路径上跳过：逐帧渲染、分词器、解析器，以及任何分配成本要紧的紧循环。
