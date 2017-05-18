**HTTP(HyperText Transfer Protocol)**是一套计算机通过网络进行通信的规则。HTTP是一种无状态的协议，无状态是指Web浏览器和Web服务器之间不需要建立持久的连接，这意味着当一个客户端向服务器端发出请求，然后Web服务器返回响应(response)，连接就被关闭了，在服务器端不保留连接的有关信息.HTTP遵循*请求(Request)/应答(Response)模型*。

HTTP通信机制在一次完整的HTTP通信过程中，Web浏览器与Web服务器之间将完成下列7个步骤：
1. 建立TCP连接
在HTTP工作开始之前，Web浏览器首先要通过网络与Web服务器建立连接，该连接是通过TCP来完成的，该协议与IP协议共同构建Internet，即著名的TCP/IP协议族，因此Internet又被称作是TCP/IP网络。HTTP是比TCP更高层次的*应用层协议*，根据规则，只有低层协议建立之后才能，才能进行更层协议的连接，因此，首先要建立TCP连接，一般TCP连接的端口号是80
2. Web浏览器向Web服务器发送请求命令
一旦建立了TCP连接，Web浏览器就会向Web服务器发送请求命令，例如：```GET /sample/hello.jsp HTTP/1.1```
3. Web浏览器发送请求头信息
浏览器发送其请求命令之后，还要以头信息的形式向Web服务器发送一些别的信息，之后浏览器发送了一空白行来通知服务器，它已经结束了该头信息的发送。
4.    Web服务器应答
客户机向服务器发出请求后，服务器会客户机回送应答，
```HTTP/1.1 200 OK```
应答的第一部分是协议的版本号和应答状态码
5. Web服务器发送应答头信息
正如客户端会随同请求发送关于自身的信息一样，服务器也会随同应答向用户发送关于它自己的数据及被请求的文档。
6.    Web服务器向浏览器发送数据
Web服务器向浏览器发送头信息后，它会发送一个空白行来表示头信息的发送到此为结束，接着，它就以Content-Type应答头信息所描述的格式发送用户所请求的实际数据
7.    Web服务器关闭TCP连接
一般情况下，一旦Web服务器向浏览器发送了请求数据，它就要关闭TCP连接，然后如果浏览器或者服务器在其头信息加入了这行代码```Connection:keep-alive```TCP连接在发送后将仍然保持打开状态，于是，浏览器可以继续通过相同的连接发送请求。保持连接节省了为每个请求建立新连接所需的时间，还节约了网络带宽。


**HTTP请求格式**
当浏览器向Web服务器发出请求时，它向服务器传递了一个数据块，也就是请求信息，HTTP请求信息由3部分组成：
- 请求方法 URI 协议/版本
- 请求头(Request Header)
- 请求正文

1. 请求方法 URI 协议/版本
例如：```GET /sample/hello.jsp HTTP/1.1```
HTTP1.1支持7种请求方法：GET、POST、HEAD、OPTIONS、PUT、DELETE和TRACE。在Internet应用中，最常用的方法是GET和POST。

2. 请求头
默认情况下，在发送XHR请求的同时，还会发送下列头部信息:
-Accept：浏览器能够处理的内容类型
-Accept-Charset：浏览器能够显示的字符集
-Accept-Encoding：浏览器能够处理的压缩编码
-Accept-Language：浏览器当前设置的语言
-Connection：浏览器与服务器之间连接的类型
-Cookie：当前页面设置的任何Cookie
-Host：发出请求所在的域。
-Refer：发送请求的页面的URI。注意，HTTP规范将这个头部字段写错了，而为保证与规范一致，也只能将错就错了。（正确写法是referrer）。
-User-Agent：浏览器的用户代理字符串。

3. 请求正文
请求头和请求正文之间有一个空行，用来告诉请求头已经结束，接下来是请求正文。请求正文中可以包含客户提交的查询字符串信息：
``` username=jinqiao&password=1234 ```


**HTTP响应格式**
HTTP响应也由3部分构成，分别是：
- 协议/版本 状态代码 描述
- 响应头
- 响应正文

1. 协议/版本 状态代码 描述
例如：``` HTTP/1.1 200 OK ```
*HTTP状态码*
1XX-信息类，表示收到Web浏览器请求，正在进一步的处理中
2XX-成功类，表示用户请求被正确的接收，理解和处理
3XX-重定向类，表示请求没有成功，客户必须采取进一步的动作
4XX-客户端错误，表示客户端提交的请求有错误
5XX-服务器错误，表示服务器不能完成对请求的处理


2. 响应头
响应头中包含很多有用的信息，例如服务器类型、日期时间、内容类型和长度等。
```
Server:Apache Tomcat/5.0.12
Date:Mon,6Oct2003 13:13:33 GMT
Content-Type:text/html
Last-Moified:Mon,6 Oct 2003 13:23:42 GMT
Content-Length:112
```

**HTTP请求方法**
- GET    通过请求URI得到资源
- POST    用于添加新的内容
- PUT    用于修改某个内容
- DELETE    删除某个内容
- CONNET    用于代理进行传输，如使用SSL
- OPTIONS    询问可以执行哪些方法
- PATCH    部分文档更改
- PROPPATCH    设置属性
- MKCOL    创建集合
- COPY    拷贝
- MOVE    移动
- LOCK    加锁
- UNLOCK    解锁
- TRACE    用于远程诊断服务器
- HEAD    类似于GET，但是不返回body信息，用于检查对象是否存在，以及得到对象的元数据

其中，HEAD、GET、POST、OPTIONS、PROPFIND是和读取相关的方法，MKCOL、PUT、DELETE、LOCK、UNLOCK、COPY、MOVE、PROPPATCH是和修改相关的方法
