- [Debug JavaScript](https://developer.chrome.com/docs/devtools/javascript/) 
- [Tasks, microtasks, queues and schedules （任务，微任务，队列和调度）【事件循环】](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/) 



当我们在浏览器中打开新标签时，就会创建一个**任务队列**。这是因为每个标签都是单线程处理所有的任务，称为**事件循环**。浏览器要负责多个任务，如渲染 HTML，执行 JavaScript 代码，处理用户交互（用户输入，鼠标点击等），执行和处理异步请求。

Chrome 浏览器中，你可以访问 `chrome://flags/#enable-javascript-harmony`，开启 Experimental JavaScript 标志，启用新功能。

# Tor(the onion router) Browser

- official site: [https://www.torproject.org/](https://www.torproject.org/) 
- download page: [https://www.torproject.org/download/](https://www.torproject.org/download/) 
- [How can I verify Tor Browser's signature?](https://support.torproject.org/tbb/#how-to-verify-signature) 
- for exe file signature verification [Encryption](../Security/Encryption.md) 

**Info**
- [Wiki - The Tor Project](https://en.wikipedia.org/wiki/The_Tor_Project) 
- [Wiki - Tor (network)](https://en.wikipedia.org/wiki/Tor_(network)) 

- [The 10 Best .onion Sites on the Internet](https://privacypros.io/tor/best-onion-sites/) 

**Tech Detail**
- [Length of new onion addresses](https://lists.torproject.org/pipermail/tor-dev/2007-June/001442.html) 

## .onion sites

### wiki & directory

- The Hidden Wiki
	http://paavlaytlfsqyvkg3yqj7hflfg5jw2jdg2fgkza5ruf6lplwseeqtvyd.onion/
	http://zqktlwiuavvvqqt4ybvgvi7tyo4hjl5xgfuvpdf6otjiycgwqbym2qad.onion/wiki/
    
    > duo to the Crackdown, frequent downtime and instability of the main wiki,
    > there is no longer one single official Hidden Wiki:
    > Refer to this: [https://en.wikipedia.org/wiki/The_Hidden_Wiki](https://en.wikipedia.org/wiki/The_Hidden_Wiki) 

- OnionLinks
	http://s4k4ceiapwwgcm3mkb6e4diqecpo7kvdnfr5gg7sph7jjppqkvwwqtyd.onion/

still can’t get it, same site have several url link, don’t know which one is correct, need to find some more reliable info before interacte in the net.


# Browser Security

## WebRTC Related

- https://ip.voidsec.com/ check your WebRTC
- [[meta] WebRTC Internal IP Address Leakage](https://bugzilla.mozilla.org/show_bug.cgi?id=959893) 
- Chromium based browsers leak user local IP via WebRTC foundation attribute https://news.ycombinator.com/item?id=33327678
- [WebRTC Local IP Leak Test 🍌](https://niespodd.github.io/webrtc-local-ip-leak/) 
- [See how trackers view your browser](https://coveryourtracks.eff.org/) 

the test run in Tor Broswer seems did’t catch me.

the local IPs would be exposed even if i enable the **EXPERIMENTAL FEATURES: Anonymize local IPs exposed by WebRTC**

