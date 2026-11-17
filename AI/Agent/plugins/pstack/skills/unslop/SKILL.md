---
name: unslop
description: 去掉任何文字里的 AI 腔。
disable-model-invocation: true
---

# Unslop

编辑文本，去掉 AI 的模式。先按下面的模式扫描，再改写。保住意思，对齐本来要的语气。

规则编号是稳定 id，其他 skill 会引用。删掉一条规则就留下一个空号。

3. 不要用不添加任何事实的尾随「-ing」短语（「highlighting...」「ensuring...」）。
5. 不要含糊的归因（「experts believe」）。点名来源，或删掉。
7. 不要 AI 词汇：additionally、crucial、delve、enhance、foster、landscape、pivotal、showcase、testament、underscore、vibrant。
8. 说「is」或「has」，不要说「serves as」「stands as」「boasts」「features」。
9. 不要「not just X, but Y」。直接说出观点。
10. 不要硬把想法凑成三个。
11. 一样东西一个名字。重复它。
12. 不要「from X to Y」，除非 X 和 Y 落在一个真实的尺度上。
13. 不要破折号、短破折号，或充当破折号的连字符，也不要用括号代替它们。用句号或逗号。
14. 冒号放在列表或例子前面，绝不在句中当连接。
15. 不要把每个专名或缩写都加粗。
16. 不要用加粗标签加冒号，把这一行又说一遍（「**性能：** 性能提高了……」）。加粗起句以句号结束、并添加新细节，可以。
17. 标题用句首大写。
18. 不要装饰性 emoji。
19. 用直引号。
20. 不要聊天机器人套话（「I hope this helps!」「Let me know if...」）。
22. 不要用夸赞或附和开场。直接回应。
23. 砍掉填充。「In order to」改成「to」。删掉「it is important to note that」。
24. 至多一个含糊词：「may」。
25. 不要空泛的结尾。写出具体的计划或事实。
26. 不要抽象的比喻名词：substrate、wedge、vector、nexus、primitive、harness、surface、scaffolding、paradigm、ratchet、north star、flywheel。用具体的词。
27. 说它做什么，不要说它感觉怎样。点名机制或数字。一句话原样放进另一个项目的文档也成立时，删掉。
28. 一句一个想法。读者得重读的句子，拆开。
29. 主动语态。点名施动者，除非它未知或无关紧要。
30. 砍掉副词，或用一个更强的动词。给出数字。
31. 用平白的词：「use」，不要「utilize」或「leverage」。
32. 有字面说法的地方，不要用比喻、格言、拟人化的代码或比喻动词。
33. 用带冠词和动词的完整句子来写。把箭头和缩写写开。
