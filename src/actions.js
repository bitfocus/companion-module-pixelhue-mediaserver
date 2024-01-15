const codec = require('../utils/cmdCodec.js');
const { getPrograms } = require('../utils/getPrograms')

const VOLUME_STEP = 5; 

exports.getActions = function (instance) {
	let actions = {}
	
	actions['program'] = {
		name: 'program',
		options: [
			{
				type: 'dropdown',
				name: 'Program',
				id: 'program',
				default: '1',
				choices: [
					...Array(256),
				].map((_, index) => ({
					id: index + 1, // 需要对应节目id，从instance中获取
					label: `Program ${index + 1}`,
				})),
			}
		],
		callback: async (event) => {
			try {
				// 节目对应的id
				const programId = event.options.program - 1;
				instance.programId = programId;

				const select_program_cmd = codec.encodeControlProtocol({
					tag: 130,
					dataLen: 4,
					data: programId
				})
				await instance.udp.send(select_program_cmd)
				const play_program_cmd = codec.encodeControlProtocol({
					tag: 271,
					dataLen: 4,
					data: programId
				})
				await instance.udp.send(play_program_cmd)
			}catch(error){
				instance.log('error', 'program cmd send error')
			}
		}
	}

	actions['pause_program'] = {
		name: 'pause_program',
		options: [],
		callback: async (event) => {
			try {
				const id  = instance.programId 
				const cmd = codec.encodeControlProtocol({
					tag: 133,
					dataLen: 4,
					data: id
				})
				await instance.udp.send(cmd)
			}catch(error){
				instance.log('error', 'pause_program cmd send error')
			}
		}
	}

	actions['play_program'] = {
		name: 'play_program',
		options: [],
		callback: async (event) => {
			try {
				const id  = instance.programId 
				const cmd = codec.encodeControlProtocol({
					tag: 271,
					dataLen: 4,
					data: id
				})
				await instance.udp.send(cmd)
			}catch(error){
				instance.log('error', 'play_program cmd send error')
			}
		}
	}

	actions['stop_program'] = {
		name: 'stop_program',
		options: [],
		callback: async (event) => {
			try {
				const id  = instance.programId 
				const cmd = codec.encodeControlProtocol({
					tag: 272,
					dataLen: 4,
					data: id
				})
				await instance.udp.send(cmd)
			}catch(error){
				instance.log('error', 'stop_program cmd send error')
			}
		}
	}

	actions['open_ftb'] = {
		name: 'open_ftb',
		options: [],
		callback: async (event) => {
			try {
				const cmd = codec.encodeControlProtocol({
					tag: 260,
					dataLen: 0
				})
				await instance.udp.send(cmd)
			}catch(error){
				instance.log('error', 'open_ftb cmd send error')
			}
		}
	}

	actions['close_ftb'] = {
		name: 'close_ftb',
		options: [],
		callback: async (event) => {
			try {
				const cmd = codec.encodeControlProtocol({
					tag: 261,
					dataLen: 0,
				})
				await instance.udp.send(cmd)
			}catch(error){
				instance.log('error', 'close_ftb cmd send error')
			}
		}
	}

	actions['open_volume'] = {
		name: 'open_volume',
		options: [],
		callback: async (event) => {
			try {
				const cmd = codec.encodeControlProtocol({
					tag: 262,
					dataLen: 0,
				})
				await instance.udp.send(cmd)
			}catch(error){
				instance.log('error', 'open_volume cmd send error')
			}
		}
	}

	actions['close_volume'] = {
		name: 'close_volume',
		options: [],
		callback: async (event) => {
			try {
				const cmd = codec.encodeControlProtocol({
					tag: 263,
					dataLen: 0,
				})
				await instance.udp.send(cmd)
			}catch(error){
				instance.log('error', 'close_volume cmd send error')
			}
		}
	}

	// TODO: 第一版先不做
	/**
	 * 全局音量调节
	 */
	/*
	actions['set_volume'] = {
		name: 'set_volume',
		options: [],
		callback: async (event) => {
			try {
				const id  = event.options.id
				const cmd = codec.encodeControlProtocol({
					tag: 264,
					data: id
				})
				await instance.udp.send(cmd)
			}catch(error){
				instance.log('error', 'set_volume cmd send error')
			}
		}
	}
	*/

	// TODO: 第一版先不做
	/**
	 * 打开图层声音
	 */
	/*
	actions['open_layer_volume'] = {
		name: 'open_layer_volume',
		options: [
			{
				type: 'dropdown',
				name: 'open_layer_volume',
				id: 'open_layer_volume',
				default: '1',
				choices: [
					...Array(256),
				].map((_, index) => ({
					id: index + 1, 
					label: `打开图层${index + 1}声音`,
				})),
			}
		],
		callback: async (event) => {
			try {
				const id  = event.options.layerId
				const cmd = codec.encodeControlProtocol({
					tag: 265,
					dataLen: 4,
					data: id
				})
				await instance.udp.send(cmd)
			}catch(error){
				instance.log('error', 'open_layer_volume cmd send error')
			}
		}
	}
	*/

	// TODO: 第一版先不做
	/**
	 * 关闭图层声音
	 */
	/*
	actions['close_layer_volume'] = {
		name: 'close_layer_volume',
		options: [
			{
				type: 'dropdown',
				name: 'close_layer_volume',
				id: 'close_layer_volume',
				default: '1',
				choices: [
					...Array(256),
				].map((_, index) => ({
					id: index + 1, 
					label: `关闭图层${index + 1}声音`,
				})),
			}
		],
		callback: async (event) => {
			try {
				const id  = event.options.layerId
				const cmd = codec.encodeControlProtocol({
					tag: 266,
					dataLen: 4,
					data: id
				})
				await instance.udp.send(cmd)
			}catch(error){
				instance.log('error', 'close_layer_volume cmd send error')
			}
		}
	}
	*/

	// PPT上一页
	actions['ppt_pgup'] = {
		name: 'ppt_pgup',
		options: [],
		callback: async (event) => {
			try {
				const triggerID = 0 // 36位
				const cmd = codec.encodeControlProtocol({
					tag: 286,
					dataLen: 36,
					data: triggerID
				})
				await instance.udp.send(cmd)
			}catch(error){
				instance.log('error', 'ppt_pgup cmd send error')
			}
		}
	}

	// PPT下一页
	actions['ppt_pgdn'] = {
		name: 'ppt_pgdn',
		options: [],
		callback: async (event) => {
			try {
				const triggerID = 0 // 36位
				const cmd = codec.encodeControlProtocol({
					tag: 287,
					dataLen: 64,
					data: triggerID
				})
				await instance.udp.send(cmd)
			}catch(error){
				instance.log('error', 'ppt_pgdn cmd send error')
			}
		}
	}

	// TODO: 第一版先不做
	/**
	 * 刷新图层网页
	 */
	/*
	actions['refresh'] = {
		name: 'refresh',
		options: [
			{
				type: 'dropdown',
				name: 'refresh',
				id: 'refresh',
				default: '1',
				choices: [
					...Array(256),
				].map((_, index) => ({
					id: index + 1, 
					label: `刷新图层${index + 1}网页`,
				})),
			}
		],
		callback: async (event) => {
			try {
				const id  = event.options.layerId
				const cmd = codec.encodeControlProtocol({
					tag: 327,
					dataLen: 4,
					data: id
				})
				await instance.udp.send(cmd)
			}catch(error){
				instance.log('error', 'refresh cmd send error')
			}
		}
	}
	*/

	actions['volume_up'] = {
		name: 'volume_up',
		options: [],
		callback: async (event) => {
			try {
				const cmd = codec.encodeControlProtocol({
					tag: 328,
					dataLen: 4,
					data: VOLUME_STEP
				})
				await instance.udp.send(cmd)
			}catch(error){
				instance.log('error', 'volume_up cmd send error')
			}
		}
	}

	actions['volume_down'] = {
		name: 'volume_down',
		options: [],
		callback: async (event) => {
			try {
				const cmd = codec.encodeControlProtocol({
					tag: 329,
					dataLen: 4,
					data: VOLUME_STEP
				})
				await instance.udp.send(cmd)
			}catch(error){
				instance.log('error', 'volume_down cmd send error')
			}
		}
	}

	return actions
}
