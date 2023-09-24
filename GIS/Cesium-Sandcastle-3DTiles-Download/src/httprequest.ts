//作者：迷途的小书童
//微信公众号:g0415shenweri

import request = require('request')
import * as zlib from 'zlib'
import * as fs from 'fs'
import * as path from 'path'

//最大同时http请求数量
var maxDownload: number = 10
//文件保存的路径
var filePath = 'D:\\data\\'
/*
baseUrl:http的url地址
version：cesiumicon需要加上
urlType：要下载tile名称，不需要填写，程序自动设置
Authorization:token的校验，cesiumicon需要填写
*/
class cesiumUrl {
  baseUrl: string = 'https://sandcastle.cesium.com/SampleData/Cesium3DTiles/Instanced/InstancedOrientation/' // 'https://assets.cesium.com/75343/'
  version: string = '' // '?v=1'
  urlType: string
  Authorization: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzNmU5ZTZhOS1lOThmLTRlM2QtYjg2NS1iMGQ1Y2JiZGQyYzUiLCJpZCI6MTA4NDQ0LCJpYXQiOjE2NjM1Njc5OTR9.CuE8Bqn8X02o64kfjVHZUiUU1bKiNeqWYXoY7e5_BCc'
    // 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwODUwZTY5Mi0xZWJmLTRlZTAtYTY2NS03NDFkYmMzOTZkN2YiLCJpZCI6MjU5LCJhc3NldHMiOnsiMTI0MDQwMiI6eyJ0eXBlIjoiM0RUSUxFUyJ9fSwic3JjIjoiNzg2ZDA0MzktN2RiYy00M2VlLWI5ZmMtOGZjOWNlMDczYTJmIiwiaWF0IjoxNjcxODUxMDMwLCJleHAiOjE2NzE4NTQ2MzB9.H3iq9pNE4BtvgmmAbePYXDl5CRw9IEXJzRV6dzqp350'
  ToString(): string {
    return this.baseUrl + this.urlType + this.version
  }
}

class dataResult {
  result: boolean
  data: Buffer

  constructor(result: boolean, data: Buffer) {
    this.result = result
    this.data = data
  }
}

/*
将request的回调处理的方式修改为await的处理，代码更加简洁
*/
function synchronousRequest(options: request.RequiredUriUrl) {
  return new Promise(function (resolve, reject) {
    request(options, function (error, response, body) {
      if (error) {
        reject(error)
        return
      }
      if (response.statusCode != 200) {
        reject(response.statusCode)
        return
      }
      resolve(body)
    })
  })
}

/*
获取tile的数据
*/
async function getData(urlType: string) {
  let _cesiumUrl = new cesiumUrl()
  _cesiumUrl.urlType = urlType

  const options = {
    method: 'get',
    uri: _cesiumUrl.ToString(),
    headers: {
      Authorization: _cesiumUrl.Authorization,
    },
    encoding: null, // it is very import!!
  }

  try {
    let _data = await synchronousRequest(options)
    return new dataResult(true, <Buffer>_data)
  } catch (e) {
    console.log(e)
    return new dataResult(false, null)
  }
}

/*
获取tileset的json里面的所有的children的content的url信息
*/
function getTotalContentUrl(children: any) {
  let stack = []
  const length = children.length
  if (0 == length) {
    return stack
  }
  for (let i = 0; i < length; i++) {
    const _child = children[i]
    if (_child.hasOwnProperty('content')) {
      stack.push(_child.content.uri)
    }
    if (_child.hasOwnProperty('children')) {
      stack = stack.concat(getTotalContentUrl(_child.children))
    }
  }
  return stack
}
//判断是否为gzip的压缩格式
function isGzipped(buffer: Buffer) {
  return buffer[0] === 0x1f && buffer[1] === 0x8b
}

//获取tile的数据，如果是压缩格式会进行解压
async function getRemoteData(tileString: string) {
  let assetBuffer: Buffer
  let _dataResule = await getData(tileString)
  if (true == _dataResule.result) {
    if (isGzipped(_dataResule.data)) {
      assetBuffer = zlib.gunzipSync(_dataResule.data)
    } else {
      assetBuffer = _dataResule.data
    }
  } else {
    console.log('getdata false ' + tileString)
    return null
  }
  return assetBuffer
}

function mkdirsSync(dirname: string) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}
function exitData(fileName: string) {
  return fs.existsSync(filePath + fileName)
}
function writeData(data: Buffer, fileName: string) {
  mkdirsSync(path.dirname(filePath + fileName))
  fs.writeFile(filePath + fileName, data, 'binary', (err) => {
    if (err) {
      console.log(err + ' ' + filePath + fileName)
    } else {
      //console.log('The file was saved!')
    }
  })
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(() => resolve(0), ms))
}

class TaskNumber {
  currentTask: number
  writeTileCount: number
  totalUrlLength: number
}

async function writeTile(tileUrl: string, taskNumber: TaskNumber) {
  //如果文件存在，就不再请求，考虑网络原因，会有部分tile 请求失败，可以重新请求
  if (true == exitData(tileUrl)) {
    taskNumber.writeTileCount++
    console.log(
      `writeTileCount/totalUrlLength:${taskNumber.writeTileCount}/${taskNumber.totalUrlLength}`
    )
    return true
  }
  taskNumber.currentTask = taskNumber.currentTask + 1
  const buffer = await getRemoteData(tileUrl)
  taskNumber.currentTask = taskNumber.currentTask - 1
  if (null == buffer) {
    return false
  }
  writeData(buffer, tileUrl)
  taskNumber.writeTileCount++
  console.log(
    `writeTileCount/totalUrlLength:${taskNumber.writeTileCount}/${taskNumber.totalUrlLength}`
  )
  return true
}

async function writeTileSet(tilesetUrl: string) {
  const assetBuffer = await getRemoteData(tilesetUrl)
  if (null === assetBuffer) {
    return null
  }
  writeData(assetBuffer, tilesetUrl)

  let assetString = assetBuffer.toString()
  let assetJson = JSON.parse(assetString)

  let totalUrl = getTotalContentUrl(assetJson.root.children)
  totalUrl.push(assetJson.root.content.uri)
  const taskNumber = new TaskNumber()
  taskNumber.currentTask = 0
  taskNumber.writeTileCount = 0
  taskNumber.totalUrlLength = totalUrl.length
  let jsonStack = []

  let jsonUrlLength = 0

  const urlDir = path.dirname(tilesetUrl)
  while (totalUrl.length > 0) {
    if (taskNumber.currentTask > maxDownload) {
      await sleep(50)
      continue
    }
    let tileUrl: string = totalUrl.pop()
    tileUrl = urlDir + '/' + tileUrl
    if (true == tileUrl.startsWith('./', 0)) {
      tileUrl = tileUrl.substring(2)
    }
    if (tileUrl.includes('.json')) {
      jsonStack.push(tileUrl)
      continue
    }
    writeTile(tileUrl, taskNumber)
  }
  jsonUrlLength = jsonStack.length

  console.log(
    `jsonUrlLength/totalUrlLength:${jsonUrlLength}/${taskNumber.totalUrlLength}`
  )
  //等待任务完成再返回函数
  while (true) {
    if (0 != taskNumber.currentTask) {
      await sleep(50)
    } else {
      break
    }
  }
  return jsonStack
}

async function main() {
  //获取root的json
  let tilesetString = 'tileset.json'
  let tilesetTask = []
  tilesetTask.push(tilesetString)
  while (true) {
    let newtilesetTask = []
    for (const index in tilesetTask) {
      console.log(`start writeTileSet =${tilesetTask[index]}`)
      let newTilesetStack = await writeTileSet(tilesetTask[index])
      console.log(`end writeTileSet =${tilesetTask[index]}`)
      if (null == newTilesetStack) {
        continue
      }
      if (0 == newTilesetStack.length) {
        continue
      }
      newtilesetTask = newtilesetTask.concat(newTilesetStack)
    }
    if (0 == newtilesetTask.length) {
      return
    }
    tilesetTask = newtilesetTask
  }
}
main()
//console.log('end')
