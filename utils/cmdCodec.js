// 十进制转十六进制
const toHex = (number, length) => {
  // 将十进制数字转换为16进制字符串
  let hexString = number.toString(16);

  // 补全零
  hexString = hexString.padStart(length*2, 0)

  // 将每两个字符分组，并倒序排列
  let byteArr = [];
  for (let i = hexString.length - 2; i >= 0; i -= 2) {
    byteArr.push(`0x${hexString.substr(i, 2)}`);
  }

  // 返回小端16进制的参数一的值
  return byteArr;
}

/**
 * 按照小端字节序补齐数组，空位填0x00
 * @param {number[]} arr - 当前数组
 * @param {number} len - 目标长度
 * @returns {number[]} - 补齐后的数组
 */
function padArrayLittleEndian(arr, len) {
  const result = arr.slice(); // 复制原数组
  while (result.length < len) {
    result.push(0x00);
  }
  return result.slice(0, len);
}

/**
 * 解析中控协议返回的响应数据为tag、valBuffer
 * @param data 中控协议回的包：二进制数据
 * @returns
 */
exports.decodeControlProtocol = (data) => {
  // 业务TLV的长度的起始位置
  const tlvStartFind = 12;
  // 收到的整个字节流
  const totalBuf = new Uint8Array(data).buffer;
  // 获取全量TLV的数据
  const dataView = new DataView(totalBuf);
  // 获取业务TLV的Tag
  const tag = dataView.getUint16(tlvStartFind, true);
  // 获取业务TLV的Data的长度，起始位置+2
  const tlvDataLength = dataView.getUint16(tlvStartFind + 2, true);
  // 获取业务TLV的Data字节数组
  const valBuffer = totalBuf.slice(
    tlvStartFind + 4,
    tlvDataLength + tlvStartFind + 4,
  );
  // 返回响应的tag及数据buffer
  const result = {
    tag,
    data: valBuffer,
  };
  // console.info('tlv-result', new Date().getTime(), result);
  return result;
};

/**
 * 将json数据编码为二进制
 * @param data data.tag | data.data | data.dataLen
 * @returns
 */
exports.encodeControlProtocol = (data) => {
  // console.info('tlv-send', data);
  // 固定头信息
  const PROTOCOL_HEAD = [0xcc, 0x55, 0xcc, 0x55];
  const PACKET_TYPE = [0x01, 0x00];
  const PROTOCOL_VERSION = [0x00, 0x01];
  const SEQUENCE = [0x02, 0x00];
  const HEAD = [
    ...PROTOCOL_HEAD,
    ...PACKET_TYPE,
    ...PROTOCOL_VERSION,
    ...SEQUENCE,
  ];
  // 业务数据长度，协议业务数据长度固定，dataLen
  const valLenBuffer = toHex(data.dataLen, 2);
  // 业务数据：固定位，dataType不存在则默认为数值进行转换；dataType为hex则为字节数组, 按 dataLen 补齐
  let dataBuffer = [];
  if (data.dataLen > 0) {
    if (data.dataType === 'hex') {
      dataBuffer = data.data.length === data.dataLen
        ? data.data
        : padArrayLittleEndian(data.data, data.dataLen);
    } else {
      dataBuffer = toHex(data.data, data.dataLen);
    }
  }
  // content长度: 内容区总长度
  const contentLenBuffer = toHex(data.dataLen + 4, 2);
  // buffer总长度
  const bufferLen = data.dataLen + 16;

  // 合并buffer
  const buffer = new ArrayBuffer(bufferLen);
  const unit8 = new Uint8Array(buffer);

  unit8.set(HEAD, 0);
  unit8.set(contentLenBuffer, 10);
  unit8.set(toHex(data.tag, 2), 12);
  unit8.set(valLenBuffer, 14);
  unit8.set(dataBuffer, 16);

  return unit8;
};

/**
 * 解析节目信息
 * @param {*} data Buffer
 */
exports.decodePrograms = (data) => {
  const dataView = new DataView(data);
  const counts = dataView.getUint32(0, true);
  const index = dataView.getUint32(4, true);
  const id = dataView.getUint32(8, true);

  //获取name数组
  const nameArray = data.slice(12, -1);
  const name = new TextDecoder().decode(nameArray);

  const res = {
    counts,
    index,
    id,
    name
  }

  return res
}
