const codec = require('../utils/cmdCodec.js')

const VOLUME_STEP = 5
const BRIGHTNESS_STEP = 2
const PROGRAM_CHOICES = [...Array(256)].map((_, index) => ({
	id: index,
	label: `ProgramId ${index}`,
}))
const getActions = function (instance) {
	let actions = {}

	actions['program'] = {
		name: 'program',
		options: [
			{
				type: 'dropdown',
				name: 'Program',
				id: 'program',
				default: 0,
				choices: PROGRAM_CHOICES,
			},
		],
		callback: async (event) => {
			try {
				const programId = Number(event.options.program)
				instance.programId = programId

				/** 此处变更协为366，处理为下发节目坑位id */
				// const select_program_cmd = codec.encodeControlProtocol({
				// 	tag: 130,
				// 	dataLen: 4,
				// 	data: programId,
				// })
				// await instance.udp.send(select_program_cmd)
				const play_program_cmd = codec.encodeControlProtocol({
					tag: 366,
					dataLen: 4,
					data: programId,
				})
				await instance.udp.send(play_program_cmd)
			} catch (error) {
				instance.log('error', 'program cmd send error')
			}
		},
	}

	// actions['update_program'] = {
	// 	name: 'update_program',
	// 	options: [],
	// 	callback: async (event) => {
	// 		try {
	// 			getPrograms(instance)
	// 		}catch(error){
	// 			instance.log('error', 'update_program cmd send error')
	// 		}
	// 	}
	// }

	actions['pause_program'] = {
		name: 'pause_program',
		options: [],
		callback: async (event) => {
			try {
				const id = instance.programId
				const cmd = codec.encodeControlProtocol({
					tag: 133,
					dataLen: 4,
					data: id,
				})
				await instance.udp.send(cmd)
			} catch (error) {
				instance.log('error', 'pause_program cmd send error')
			}
		},
	}

	actions['play_program'] = {
		name: 'play_program',
		options: [],
		callback: async (event) => {
			try {
				const id = instance.programId
				const cmd = codec.encodeControlProtocol({
					tag: 271,
					dataLen: 4,
					data: id,
				})
				await instance.udp.send(cmd)
			} catch (error) {
				instance.log('error', 'play_program cmd send error')
			}
		},
	}

	actions['stop_program'] = {
		name: 'stop_program',
		options: [],
		callback: async (event) => {
			try {
				const id = instance.programId
				const cmd = codec.encodeControlProtocol({
					tag: 272,
					dataLen: 4,
					data: id,
				})
				await instance.udp.send(cmd)
			} catch (error) {
				instance.log('error', 'stop_program cmd send error')
			}
		},
	}

	actions['open_ftb'] = {
		name: 'open_ftb',
		options: [],
		callback: async (event) => {
			try {
				const cmd = codec.encodeControlProtocol({
					tag: 260,
					dataLen: 0,
				})
				await instance.udp.send(cmd)
			} catch (error) {
				instance.log('error', 'open_ftb cmd send error')
			}
		},
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
			} catch (error) {
				instance.log('error', 'close_ftb cmd send error')
			}
		},
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
			} catch (error) {
				instance.log('error', 'open_volume cmd send error')
			}
		},
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
			} catch (error) {
				instance.log('error', 'close_volume cmd send error')
			}
		},
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
					data: triggerID,
				})
				await instance.udp.send(cmd)
			} catch (error) {
				instance.log('error', 'ppt_pgup cmd send error')
			}
		},
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
					data: triggerID,
				})
				await instance.udp.send(cmd)
			} catch (error) {
				instance.log('error', 'ppt_pgdn cmd send error')
			}
		},
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
					data: VOLUME_STEP,
				})
				instance.log('info', `volume_up cmd send: ${cmd}`)

				await instance.udp.send(cmd)
			} catch (error) {
				instance.log('error', 'volume_up cmd send error')
			}
		},
	}
	actions['volume_down'] = {
		name: 'volume_down',
		options: [],
		callback: async (event) => {
			try {
				const cmd = codec.encodeControlProtocol({
					tag: 329,
					dataLen: 4,
					data: VOLUME_STEP,
				})
				instance.log('info', `volume_down cmd send: ${cmd}`)

				await instance.udp.send(cmd)
			} catch (error) {
				instance.log('error', 'volume_down cmd send error')
			}
		},
	}

	actions['brightness_up'] = {
		name: 'brightness_up',
		options: [],
		callback: async (event) => {
			try {
				const cmd = codec.encodeControlProtocol({
					tag: 391,
					dataLen: 2,
					dataType: 'hex',
					data: [0x01, BRIGHTNESS_STEP], // 亮度增加：步进5
				})
				instance.log('info', `brightness_up cmd send: ${cmd}`)

				await instance.udp.send(cmd)
			} catch (error) {
				instance.log('error', 'brightness_up cmd send error')
			}
		},
	}

	actions['brightness_down'] = {
		name: 'brightness_down',
		options: [],
		callback: async (event) => {
			try {
				const cmd = codec.encodeControlProtocol({
					tag: 391,
					dataLen: 2,
					dataType: 'hex',
					data: [0x00, BRIGHTNESS_STEP], // 亮度减少：步进5
				})
				instance.log('info', `brightness_down cmd send: ${cmd}`)

				await instance.udp.send(cmd)
			} catch (error) {
				instance.log('error', 'brightness_down cmd send error')
			}
		},
	}

	actions['play'] = {
		name: 'play',
		options: [],
		callback: async (event) => {
			try {
				const cmd = codec.encodeControlProtocol({
					tag: 387,
					dataLen: 2,
					data: 0,
				})
				await instance.udp.send(cmd)
			} catch (error) {
				instance.log('error', 'play cmd send error')
			}
		},
	}

	actions['pause'] = {
		name: 'pause',
		options: [],
		callback: async (event) => {
			try {
				const cmd = codec.encodeControlProtocol({
					tag: 387,
					dataLen: 2,
					data: 1,
				})
				await instance.udp.send(cmd)
			} catch (error) {
				instance.log('error', 'pause cmd send error')
			}
		},
	}

	actions['stop'] = {
		name: 'stop',
		options: [],
		callback: async (event) => {
			try {
				const cmd = codec.encodeControlProtocol({
					tag: 387,
					dataLen: 2,
					data: 2,
				})
				await instance.udp.send(cmd)
			} catch (error) {
				instance.log('error', 'stop cmd send error')
			}
		},
	}
	return actions
}

const getAllActions = function (instance) {
	let actions = getActions(instance)
	/**
	 目前先不做
	 */
	// /** take淡入淡出 */
	// actions['take_program'] = {
	// 	name: 'take_program',
	// 	options: [],
	// 	callback: async (event) => {
	// 		instance.log('info', 'take_program')
	// 	},
	// }

	// /** cut 直切 */
	// actions['cut_program'] = {
	// 	name: 'cut_program',
	// 	options: [],
	// 	callback: async (event) => {
	// 		instance.log('info', 'cut_program')
	// 	},
	// }

	/** 打开测试画面 */
	actions['open_test_program'] = {
		name: 'open_test_program',
		options: [],
		callback: async (event) => {
			try {
				const cmd = codec.encodeControlProtocol({
					tag: 258,
					dataLen: 0,
				})
				instance.log('info', `open_test_program cmd send: ${cmd}`)

				await instance.udp.send(cmd)
			} catch (error) {
				instance.log('error', 'open_test_program cmd send error')
			}
		},
	}

	/** 关闭测试画面 */
	actions['close_test_program'] = {
		name: 'close_test_program',
		options: [],
		callback: async (event) => {
			try {
				const cmd = codec.encodeControlProtocol({
					tag: 259,
					dataLen: 0,
				})
				instance.log('info', `close_test_program cmd send: ${cmd}`)

				await instance.udp.send(cmd)
			} catch (error) {
				instance.log('error', 'close_test_program cmd send error')
			}
		},
	}

	/**
	 * 播放上一个节目
	 */
	actions['previous_program'] = {
		name: 'previous_program',
		options: [],
		callback: async (event) => {
			try {
				const cmd = codec.encodeControlProtocol({
					tag: 388,
					dataLen: 1,
					data: 0,
				})
				instance.log('info', `previous_program cmd send: ${cmd}`)

				await instance.udp.send(cmd)
			} catch (error) {
				instance.log('error', 'previous_program cmd send error')
			}
		},
	}

	/**
	 *  播放下一个节目
	 */
	actions['next_program'] = {
		name: 'next_program',
		options: [],
		callback: async (event) => {
			try {
				const cmd = codec.encodeControlProtocol({
					tag: 388,
					dataLen: 1,
					data: 1,
				})
				instance.log('info', `next_program cmd send: ${cmd}`)

				await instance.udp.send(cmd)
			} catch (error) {
				instance.log('error', 'next_program cmd send error')
			}
		},
	}

	actions['bind_media'] = {
		name: 'bind_media',
		options: [
			{
				id: 'layer_index',
				label: 'Select Layer',
				type: 'dropdown',
				minChoicesForSearch: 1,
				default: '0',
				choices: new Array(50).fill(0).map((item, index) => {
					return {
						id: `${index}`,
						label: `Layer ${index + 1}`,
					}
				}),
			},
			{
				id: 'program_index',
				label: 'Select Program',
				type: 'dropdown',
				minChoicesForSearch: 1,
				default: 0,
				choices: PROGRAM_CHOICES,
			},
		],
		subscribe: (action) => {
			if (!instance.bindMediaByControl) {
				instance.bindMediaByControl = {}
			}

			instance.bindMediaByControl[action.controlId] = {
				actionId: action.id,
				program_index: Number(action.options.program_index ?? 0),
				layer_index: Number(action.options.layer_index ?? 0),
			}
			instance.checkFeedbacks('bind_media')
		},
		unsubscribe: (action) => {
			const stored = instance.bindMediaByControl?.[action.controlId]
			if (stored && stored.actionId === action.id) {
				delete instance.bindMediaByControl[action.controlId]
				instance.checkFeedbacks('bind_media')
			}
		},
		callback: async (event) => {
			try {
				const { program_index = '0', layer_index = '0' } = event.options

				const real_layer_index = Number(`${layer_index}`)
				const real_program_index = Number(`${program_index}`)

				// 将每个索引值转换为2字节（小端序），然后合并
				// 例如：1 -> [1, 0], 2 -> [2, 0]
				const programBytes = [
					real_program_index & 0xff, // 低字节
					(real_program_index >> 8) & 0xff, // 高字节
				]
				const layerBytes = [
					real_layer_index & 0xff, // 低字节
					(real_layer_index >> 8) & 0xff, // 高字节
				]

				const cmd = codec.encodeControlProtocol({
					tag: 10004,
					dataLen: 4,
					dataType: 'hex',
					data: [...programBytes, ...layerBytes],
				})
				await instance.udp.send(cmd)
			} catch (error) {
				instance.log('error', 'bind_media cmd send error')
			}
		},
	}

	actions['bind_cue_tag'] = {
		name: 'bind_cue_tag',
		options: [
			{
				id: 'cue_tag_index',
				label: 'Cue Index',
				type: 'number',
				default: 0,
				min: 0,
				max: 99999,
			},
		],
		callback: async (event) => {
			try {
				const { cue_tag_index = 0 } = event.options
				const cmd = codec.encodeControlProtocol({
					tag: 10005,
					dataLen: 2,
					data: [cue_tag_index],
				})
				await instance.udp.send(cmd)
			} catch (error) {
				instance.log('error', 'bind_cue_tag cmd send error')
			}
		},
	}

	/** 计分器加分：对当前选中的计分器媒体加分，可选步进值（先用 select_media 选中媒体） */
	actions['score_up'] = {
		name: 'score_up',
		options: [
			{
				id: 'step',
				label: 'Step',
				type: 'number',
				default: 1,
				min: 1,
				max: 999,
				tooltip: '每次增加的步进值',
			},
		],
		callback: async (event) => {
			try {
				const { step = 1 } = event.options
				const real_step = Number(step)

				// 对当前选中的计分器媒体加分（tag 10039, Type=0x01, Value=step）
				const scoreCmd = codec.encodeControlProtocol({
					tag: 10039,
					dataLen: 3,
					dataType: 'hex',
					data: [0x01, real_step & 0xff, (real_step >> 8) & 0xff],
				})
				await instance.udp.send(scoreCmd)
			} catch (error) {
				instance.log('error', 'score_up cmd send error')
			}
		},
	}

	/** 计分器减分：对当前选中的计分器媒体减分，可选步进值（先用 select_media 选中媒体） */
	actions['score_down'] = {
		name: 'score_down',
		options: [
			{
				id: 'step',
				label: 'Step',
				type: 'number',
				default: 1,
				min: 1,
				max: 999,
				tooltip: '每次减少的步进值',
			},
		],
		callback: async (event) => {
			try {
				const { step = 1 } = event.options
				const real_step = Number(step)

				// 对当前选中的计分器媒体减分（tag 10039, Type=0xFF, Value=step）
				const scoreCmd = codec.encodeControlProtocol({
					tag: 10039,
					dataLen: 3,
					dataType: 'hex',
					data: [0xff, real_step & 0xff, (real_step >> 8) & 0xff],
				})
				await instance.udp.send(scoreCmd)
				instance.log('info', `score_down cmd: ${Buffer.from(scoreCmd).toString('hex')}`)
			} catch (error) {
				instance.log('error', 'score_down cmd send error')
			}
		},
	}

	/** 计分器重置：重置当前选中的计分器媒体主分（先用 select_media 选中媒体） */
	actions['score_reset'] = {
		name: 'score_reset',
		options: [],
		callback: async (event) => {
			try {
				// 重置当前选中的计分器媒体主分（tag 10041, 空数据）
				const resetCmd = codec.encodeControlProtocol({
					tag: 10041,
					dataLen: 0,
				})
				instance.log('info', `score_reset cmd: ${Buffer.from(resetCmd).toString('hex')}`)
				await instance.udp.send(resetCmd)
			} catch (error) {
				instance.log('error', 'score_reset cmd send error')
			}
		},
	}

	/** 计分器撤销：撤销当前选中计分器媒体前一步操作（先用 select_media 选中媒体） */
	actions['score_undo'] = {
		name: 'score_undo',
		options: [],
		callback: async (event) => {
			try {
				// 撤销当前选中的计分器媒体前一步操作（tag 10042, 空数据）
				const undoCmd = codec.encodeControlProtocol({
					tag: 10042,
					dataLen: 0,
				})
				await instance.udp.send(undoCmd)
			} catch (error) {
				instance.log('error', 'score_undo cmd send error')
			}
		},
	}

	/** 计分器设分：将当前选中的计分器媒体主分设为指定分值（先用 select_media 选中媒体） */
	actions['score_set'] = {
		name: 'score_set',
		options: [
			{
				id: 'score',
				label: 'Score',
				type: 'number',
				default: 0,
				min: 0,
				max: 999,
				step: 1,
				asInteger: true,
				clampValues: true,
				tooltip: '目标分值，范围 0~999',
			},
		],
		callback: async (event) => {
			try {
				const { score = 0 } = event.options
				const real_score = Math.min(999, Math.max(0, Number(score)))

				// 对当前选中的计分器媒体设置主分（tag 10040, 2字节无符号整数）
				const setCmd = codec.encodeControlProtocol({
					tag: 10040,
					dataLen: 2,
					data: real_score,
				})
				await instance.udp.send(setCmd)
			} catch (error) {
				instance.log('error', 'score_set cmd send error')
			}
		},
	}

	/** 选中指定媒体：根据节目ID和图层ID选中指定媒体（tag 10038） */
	actions['select_media'] = {
		name: 'select_media',
		options: [
			{
				id: 'program_index',
				label: 'Select Program',
				type: 'dropdown',
				minChoicesForSearch: 1,
				default: 0,
				choices: PROGRAM_CHOICES,
			},
			{
				id: 'layer_index',
				label: 'Select Layer',
				type: 'dropdown',
				minChoicesForSearch: 1,
				default: '0',
				choices: new Array(50).fill(0).map((item, index) => {
					return {
						id: `${index}`,
						label: `Layer ${index + 1}`,
					}
				}),
			},
		],
		subscribe: (action) => {
			if (!instance.selectMediaByControl) {
				instance.selectMediaByControl = {}
			}

			instance.selectMediaByControl[action.controlId] = {
				actionId: action.id,
				program_index: Number(action.options.program_index ?? 0),
				layer_index: Number(action.options.layer_index ?? 0),
			}
			instance.checkFeedbacks('selected_media')
		},
		unsubscribe: (action) => {
			const stored = instance.selectMediaByControl?.[action.controlId]
			if (stored && stored.actionId === action.id) {
				delete instance.selectMediaByControl[action.controlId]
				instance.checkFeedbacks('selected_media')
			}
		},
		callback: async (event) => {
			try {
				const { program_index = '0', layer_index = '0' } = event.options

				// 选中指定媒体（tag 10038）：ProgramId(低4字节) + LayerId(高4字节)，codec 按小端序自动展开为8字节
				const selectCmd = codec.encodeControlProtocol({
					tag: 10038,
					dataLen: 8,
					data: Number(program_index) + Number(layer_index) * 0x100000000,
				})
				await instance.udp.send(selectCmd)
			} catch (error) {
				instance.log('error', 'select_media cmd send error')
			}
		},
	}

	return actions
}

module.exports = {
	getActions,
	getAllActions,
}
