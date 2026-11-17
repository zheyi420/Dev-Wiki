---
name: unslop
description: 去掉任何文字里的 AI 腔。
disable-model-invocation: true
---

# Unslop

编辑文本，去掉 AI 的模式。先按下面的模式扫描，再改写。保住意思，对齐本来要的语气。

## 要查出并修掉的模式

规则编号是稳定 id，其他 skill 会引用。删掉一条规则就留下一个空号。

### 内容

3. **浮在表面的 -ing 短语。** 「highlighting...」「ensuring...」「reflecting...」「showcasing...」「fostering...」。删掉，或用真实来源展开。
5. **含糊的归因。** 「Experts believe」「Industry reports suggest」「Some critics argue」。点名来源，或删掉。

### 语言

7. **AI 词汇。** Additionally、crucial、delve、enduring、enhance、fostering、garner、interplay、intricate、landscape（抽象用法）、pivotal、showcase、tapestry（抽象用法）、testament、underscore、vibrant。换成平白的词。
8. **把「is」说得很花。** 「serves as」「stands as」「boasts」「features」。说「is」或「has」。
9. **「Not just X, but Y.」** 直接说出观点。
10. **三条一组。** 不要硬把想法凑成三个。用自然的数量。
11. **同义词轮换。** Protagonist、main character、central figure、hero 出现在同一段。选定一个，重复它。
12. **假的范围。** 「from X to Y」，而 X 和 Y 不在一个有意义的尺度上。直接列出主题。

### 风格

13. **破折号用得太多。** 完全避免破折号。只用句号或逗号（不要括号，不要短破折号，不要用连字符充当破折号）。一个想法需要分开时，结束句子，或用逗号。
14. **冒号用得太多。** 冒号放在列表或例子前面可以，不要拿来当句中连接。「如果你从传统自动化过来：不要去注册事件处理函数，你描述条件」这个冒号什么都没加。改写，让观点自己站住，不要用对比来框。「用平白的话描述调度器该在什么时候触发，效果最好。」意思一样，没有拐杖标点。
15. **加粗用得太多。** 不要把每个专名或缩写都加粗。
16. **行内标题列表。** 特征是一个加粗标签加冒号，把这一行又说了一遍：「**性能：** 性能提高了……」。这种改成散文。加粗起句以句号结束、点名这一项、后面跟着真正的新细节（「**TypeScript 里的 schema。** 表住在一个文件里。」）可以，不是特征。
17. **标题每个词都大写。** 用句首大写。
18. **装饰性 emoji。** 从标题和列表里去掉。
19. **弯引号。** 用直引号。

### 对话腔

20. **聊天机器人套话。** 「I hope this helps!」「Let me know if...」「Of course!」「Certainly!」「Found the smoking gun!」删掉。
22. **奉承语气。** 「Great question! You're absolutely right!」直接回应。

### 填充

23. **填充短语。** 「In order to」改成「To」。「Due to the fact that」改成「Because」。删掉「It is important to note that」。
24. **过度含糊。** 「could potentially possibly be argued that it might」改成「may」。
25. **空泛的结尾。** 「The future looks bright.」改成具体的计划或事实。

### 行话

26. **抽象的比喻名词。** Substrate（底）、wedge、wedge in（加进去）、vector（方式、方法）、locus、vantage、nexus、作名词的 primitive、作比喻的 harness、surface（如「API surface」）、bedrock、作比喻的 scaffolding、modality、paradigm、gold-plating（超出这份工作需要的部分）、作比喻的 ratchet（机制的真名，或只会收紧的限制）、用 evacuate 表示挪代码（挪出去）、endgame（最后一阶段）、north star、flywheel。这些读起来像技术词，通常有一个更平白、更具体的词。选那个具体的词。

### 平白说法

27. **说它做什么，不要说它感觉怎样。** 「the database stays close at hand」「SQL you can read」「types that follow your schema」说的是一种感觉。改法是点名机制或一个数字：「`.toSQL()` 返回发给数据库的那个精确字符串」「列重命名会让构建失败」。问这句话要读者去做什么或知道什么，然后把那个写出来。你没法把它重述成一条具体指示、一个事实或一个数字时，删掉。再检查一次：如果这句话原样放进另一个项目的文档也成立，它对这个项目什么都没说。删掉。
28. **把密的句子缩短或拆开。** 读者必须回头才能把一个句子读通时，拆成两句，或丢掉从句。一句一个想法。
29. **主动语态。** 优先用它。抓住「is/are/was/were + 过去分词」，点名施动者：「queries are validated」改成「the compiler validates queries」，「the file is parsed by the loader」改成「the loader parses the file」。只有施动者未知，或确实无关时，被动才可以。
30. **砍掉副词，或用一个更强的动词。** 「runs quickly」改成「is fast」或那个数字，「significantly improves」改成测到的差值。一个副词撑着一个弱动词，说明动词错了。
31. **优先平白的词。** 「utilize」和「leverage」改成「use」，「facilitate」改成「help」，「numerous」改成「many」，「in the event that」改成「if」。更花的同义词很少更清楚。
32. **做作的散文。** 有字面说法的地方却用比喻或花活：格言（「wire it or delete it」）、为了效果的修辞断片、把代码拟人（「the plan holds it」）、比喻动词（「rides along」「stands on」）、套用的框定短语。「A dial worth turning」改成「a parameter worth varying」。说你的意思。规则 26 管比喻名词。
33. **压得太狠。** 丢掉的冠词、没有动词的断片、符号说法，以及让读者去解码而不是去读的缩写。「Parser rejects bad date → exit 2, no write」改成「The parser rejects a bad date, exits with code 2, and writes nothing.」用带冠词和动词的完整句子来写，并把箭头和缩写写开。
