/**
 * protobuf 接口 axios封装
 */

import axios from 'axios'
import adapterRequest from 'axios/lib/adapters/xhr'
import { Root } from 'protobufjs'
import jsonName from '@/protobuf/proto.json'
import btoa from "../utils/obtaUtil"
const isDebug = process.env.VUE_APP_REQ_DEBUG === '1' // debug
const Console = window.console // eslint no-console的原因，这里重新赋值一个新的console
// const REQUESTDOMAIN = process.env.VUE_APP_REQ_DOMAIN // 接口域名
const REQUESTDOMAIN = ""
const root = Root.fromJSON(jsonName) // pb结构对象
/**
 * 生成消息体
 * @param {string} desction 请求体名字
 * @param {object} data 请求数据
 * @return {Buffer} 返回Buffer对象
 */
const encode = (desction, data) => {
  const dataDesction = root.lookupType(desction)
  const err = dataDesction.verify(data) // 检验参数格式是否对应
  if (err) return false
  const message = dataDesction.create(data)
  const buffer = dataDesction.encode(message).finish()
  return buffer
}
/**
 * 解析响应体
 * @param {string} desction 返回体名字
 * @param {object} data 返回的数据
 * @return {object} 解析完的数据
 */
export const decode = (desction, data) => {
  const dataDesction = root.lookupType(desction)
  const err = dataDesction.verify(data) // 检验参数格式是否对应
  if (err) return false
  const res = dataDesction.decode(data)
  const result = dataDesction.toObject(res, {
    defaults: true,
  })
  return result
}
/**
 * 适配器请求
 * @param {object} config 请求的配置数据
 */
function xhrAdapter (config) {
  config.data = config.rpcBuffer
  return adapterRequest(config)
}

const request = axios.create({
  timeout: 10000,
  responseType: 'arraybuffer',
  headers: {
    'Content-Type': 'application/x-protobuf',
    'Accept': 'application/x-protobuf',
  },
  baseURL: REQUESTDOMAIN,
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    if (!root.nested) {
      alert('错误的proto.json')
      return Promise.reject(new Error('错误的proto.json'))
    }
    const reqBuffer = encode(config.reqDesction, config.data || {}) // 请求数据 => 数据流
    let strings = [];
    let chunkSize = 10000;
    let allLength = reqBuffer.length;
    for (let ii = 0; ii * chunkSize < allLength; ii++) {
      strings.push(String.fromCharCode.apply(null, reqBuffer.subarray(ii * chunkSize, (ii + 1) * chunkSize)));
    }
    strings.join('')
    let reqBufferStr = btoa(strings)
    config.data = reqBufferStr
    return config
  },
  error => {
    isDebug && Console.log(error)
    return Promise.reject(error)
  },
)

// 响应拦截器
request.interceptors.response.use(
  res => {
    const opts = res.config // 请求配置
    if (res.status !== 200) {
      alert('发生错误')
      const error = {
        message: '发生错误',
        description: res.data.message,
      }
      return Promise.reject(error)
    } else {
      // 解析处理返回体
      let originData = new Uint8Array(res.data)
      const headData = new Uint8Array(originData, 0, 2);
      let state = ((headData[0] & 0x0ff) << 8) + headData[1];
      let realData = originData.subarray(2, originData.length);
      const rpcOut = decode(opts.resDesction, new Uint8Array(realData))
      if (state === 1) {
        return {
          state,
          data:rpcOut||{}
        }
      } else {

        return Promise.reject(error)
      }
    }
  },
  err => {
    isDebug && Console.log(err)
    alert('接口异常')
    const error = {
      description: err.message,
      message: '接口异常',
    }
    return Promise.reject(error)
  },
)

export default request
