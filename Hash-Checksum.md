Hash 校验，通过文件生成并显示加密哈希。


# Windows

## Get-FileHash

Reference:
- [Microsoft.PowerShell.Utility Get-FileHash](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/get-filehash)

> 使用指定的散列算法计算文件的散列值。

> 在 PowerShell 下可用，在 cmd 下不可用。

使用说明 `Get-FileHash -?`

Windows PowerShell 命令可以校验的 Hash 值类型，包括：
`SHA1`, `SHA256`, `SHA384`, `SHA512`, `MACTripleDES`, `MD5`, `RIPEMD160`, 暂不支持校验 `CRC32` 值。

常用命令
`Get-FileHash [文件路径] -Algorithm [校验的Hash值类型] | Format-List`

```sh
PS D:\> Get-FileHash .\file.txt -Algorithm MD5 | Format-List


Algorithm : MD5
Hash      : E99A18C428CB38D5F260853678922E03
Path      : D:\file.txt



PS D:\> Get-FileHash .\file.txt -Algorithm MD5

Algorithm       Hash                                                                   Path
---------       ----                                                                   ----
MD5             E99A18C428CB38D5F260853678922E03                                       D:\file.txt


PS D:\> Get-FileHash .\file.txt

Algorithm       Hash                                                                   Path
---------       ----                                                                   ----
SHA256          6CA13D52CA70C883E0F0BB101E425A89E8624DE51DB2D2392593AF6A84118090       D:\file.txt


PS D:\> Get-FileHash .\file.txt -Algorithm SHA256

Algorithm       Hash                                                                   Path
---------       ----                                                                   ----
SHA256          6CA13D52CA70C883E0F0BB101E425A89E8624DE51DB2D2392593AF6A84118090       D:\file.txt


```


## CertUtil

> CertUtil 是证书相关的管理工具，涉及到证书的加解密，所以相关的 `MD5`/`SHA1` 之类的加密算法都是支持的，在 CertUtil 中有个参数 -hashfile 可以帮助我们计算任意文件的哈希校验值。

使用说明 `CertUtil -hashfile -?`


常用命令
`CertUtil -hashfile [文件路径] [校验的Hash值类型]`

```sh
D:\>CertUtil -hashfile .\file.txt MD5
MD5 的 .\file.txt 哈希:
e99a18c428cb38d5f260853678922e03
CertUtil: -hashfile 命令成功完成。

D:\>CertUtil -hashfile .\file.txt
SHA1 的 .\file.txt 哈希:
6367c48dd193d56ea7b0baad25b19455e529f5ee
CertUtil: -hashfile 命令成功完成。

D:\>CertUtil -hashfile .\file.txt SHA1
SHA1 的 .\file.txt 哈希:
6367c48dd193d56ea7b0baad25b19455e529f5ee
CertUtil: -hashfile 命令成功完成。

D:\>CertUtil -hashfile .\file.txt SHA256
SHA256 的 .\file.txt 哈希:
6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090
CertUtil: -hashfile 命令成功完成。


```




# Linux

## md5sum

> 打印或检查MD5(128位)校验和。

使用说明 `md5sum --help`

常用命令 `md5sum .\file.txt`

```sh
$ md5sum ./file.txt
e99a18c428cb38d5f260853678922e03 *./file.txt

```


## sha256sum

> 打印或检查SHA256(256位)校验和。

使用说明 `sha256sum --help`

常用命令 `sha256sum .\file.txt`

```sh
$ sha256sum ./file.txt
6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090 *./file.txt

```

