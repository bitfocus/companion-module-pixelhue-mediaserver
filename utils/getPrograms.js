const codec = require('../utils/cmdCodec.js');

exports.getPrograms = function (instance) {
  const data = {
    tag: 129,
    dataLen: 0,
  }
  const cmd = codec.encodeControlProtocol(data);
  instance.udp.send(cmd);
}