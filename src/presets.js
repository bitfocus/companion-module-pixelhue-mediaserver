const { combineRgb } = require('@companion-module/base')

const getPrograms = (num) => {
	const playPrograms = {}
	for(let i = 1; i <= num; i++) {
		const programs = {
			type: 'button',
			category: 'Program List',
			name: 'Program ' + i,
			style: {
				text: 'Program\\n' + i,
				size: '14',
				color: combineRgb(0, 0, 0),
				bgcolor: combineRgb(0, 255, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: 'program',
							options: {
								program: i,
							},
						},
					],
				},
			],
			feedbacks: [],
		}
		playPrograms['program-play' + i] = programs
	}
	return playPrograms
}
const programListPresets = getPrograms(256)

const programOptPresets = {
	pause: {
		type: 'button',
		category: 'Program Basics Operations',
		name: 'Pause',
		style: {
			text: 'Pause',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(255, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'pause_program',
						options: {},
					},
				],
			},
		],
		feedbacks: [],
	},
	play: {
		type: 'button',
		category: 'Program Basics Operations',
		name: 'Play',
		style: {
			text: 'Play',
			size: '24',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(255, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'play_program',
						options: {},
					},
				],
			},
		],
		feedbacks: [],
	},
	stop: {
		type: 'button',
		category: 'Program Basics Operations',
		name: 'Stop',
		style: {
			text: 'Stop',
			size: '24',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(255, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'stop_program',
						options: {},
					},
				],
			},
		],
		feedbacks: [],
	},
	/** 全局停止 */
	global_stop: {
		type: 'button',
		category: 'Program Basics Operations',
		name: 'Global Stop',
		style: {
			text: 'Global\nStop',
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(255, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'stop',
						options: {},
					},
				],
			},
		],
		feedbacks: [],
	},
	// update: {
	//   type: 'button',
	//   category: 'Program Basics Operations',
	//   name: 'Update',
	//   style: {
	//     text: 'Update',
	//     size: '18',
	//     color: combineRgb(255, 255, 255),
	//     bgcolor: combineRgb(0, 0, 0),
	//   },
	//   steps: [
	//     {
	//       down: [
	//         {
	//           actionId: 'update_program',
	//           options: {},
	//         },
	//       ],
	//     },
	//   ],
	//   feedbacks: [],
	// }
}

const basicPresets = {
	open_ftb: {
		type: 'button',
		category: 'Basics',
		name: 'Open FTB',
		style: {
			text: 'Open FTB',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'open_ftb',
						options: {},
					},
				],
			},
		],
		feedbacks: [],
	},
	close_ftb: {
		type: 'button',
		category: 'Basics',
		name: 'Close FTB',
		style: {
			text: 'Close FTB',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'close_ftb',
						options: {},
					},
				],
			},
		],
		feedbacks: [],
	},
	open_volume: {
		type: 'button',
		category: 'Basics',
		name: 'Open Volume',
		style: {
			text: 'Open Volume',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'open_volume',
						options: {},
					},
				],
			},
		],
		feedbacks: [],
	},
	close_volume: {
		type: 'button',
		category: 'Basics',
		name: 'Close Volume',
		style: {
			text: 'Close Volume',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'close_volume',
						options: {},
					},
				],
			},
		],
		feedbacks: [],
	},
	ppt_pgup: {
		type: 'button',
		category: 'Basics',
		name: 'PPT pg up',
		style: {
			text: 'PPT\\npg up',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'ppt_pgup',
						options: {},
					},
				],
			},
		],
		feedbacks: [],
	},
	ppt_pgdn: {
		type: 'button',
		category: 'Basics',
		name: 'PPT pg dn',
		style: {
			text: 'PPT\\npg dn',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'ppt_pgdn',
						options: {},
					},
				],
			},
		],
		feedbacks: [],
	},
	volume_up: {
		type: 'button',
		category: 'Basics',
		name: 'Volume +',
		style: {
			text: 'Volume +',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'volume_up',
						options: {},
					},
				],
			},
		],
		feedbacks: [],
	},
	volume_down: {
		type: 'button',
		category: 'Basics',
		name: 'Volume -',
		style: {
			text: 'Volume -',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'volume_down',
						options: {},
					},
				],
			},
		],
		feedbacks: [],
	},
	// 音量旋钮
	volumeOpt: {
		type: 'button',
		category: 'Basics',
		name: 'Volume',
		style: {
			text: 'Volume',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				rotate_left: [
					{
						actionId: 'volume_down',
						options: {},
					},
				],
				rotate_right: [
					{
						actionId: 'volume_up',
						options: {},
					},
				],
			},
		],
		options: {
			rotaryActions: true,
		},
		feedbacks: [],
	},
	bind_media: {
		type: 'button',
		category: 'Basics',
		name: 'Bind Media',
		style: {
			text: 'Bind Media',
			size: '16',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'bind_media',
						options: {
							layer_index: '1',
							program_index: '1',
						},
					},
				],
			},
		],
		feedbacks: [],
	},
	bind_cue_tag: {
		type: 'button',
		category: 'Basics',
		name: 'Bind CUE Tag',
		style: {
			text: 'Bind CUE Tag',
			size: '16',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'bind_cue_tag',
						options: {
							cue_tag_index: 0,
						},
					},
				],
			},
		],
		feedbacks: [],
	}
}

const displayPresets = {
	ftb: {
		type: 'button',
		category: 'Display',
		name: 'Toggle FTB',
		style: {
			text: 'Toggle FTB',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(255, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'open_ftb',
						options: {},
					},
				],
			},
			{
				down: [
					{
						actionId: 'close_ftb',
						options: {},
					},
				],
			},
		],
		feedbacks: [],
	},
	volume: {
		type: 'button',
		category: 'Display',
		name: 'Toggle Volume',
		style: {
			text: 'Toggle Volume',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(255, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'open_volume',
						options: {},
					},
				],
			},
			{
				down: [
					{
						actionId: 'close_volume',
						options: {},
					},
				],
			},
		],
		feedbacks: [],
	},
}

const addForFX3ProPresets = {
	/** 本次版本不做 */
	// /** take带效果 */
	// take: {
	// 	type: 'button',
	// 	category: 'Program Basics Operations',
	// 	name: 'Take',
	// 	style: {
	// 		text: 'Take',
	// 		size: '18',
	// 		color: combineRgb(255, 255, 255),
	// 		bgcolor: combineRgb(0, 0, 0),
	// 	},
	// 	steps: [
	// 		{
	// 			down: [
	// 				{
	// 					actionId: 'take_program',
	// 					options: {},
	// 				},
	// 			],
	// 		},
	// 	],
	// 	feedbacks: [],
	// },
	// /** 直切 */
	// cut: {
	// 	type: 'button',
	// 	category: 'Program Basics Operations',
	// 	name: 'Cut',
	// 	style: {
	// 		text: 'Cut',
	// 		size: '18',
	// 		color: combineRgb(255, 255, 255),
	// 		bgcolor: combineRgb(0, 0, 0),
	// 	},
	// 	steps: [
	// 		{
	// 			down: [{ actionId: 'cut_program', options: {} }],
	// 		},
	// 	],
	// 	feedbacks: [],
	// },
	/**
	 * 切换测试画面
	 */
	test_program: {
		type: 'button',
		category: 'Display',
		name: 'Toggle Test Program',
		style: {
			text: 'Toggle Test Program',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'open_test_program', options: {} }],
			},
			{
				down: [{ actionId: 'close_test_program', options: {} }],
			},
		],
		feedbacks: [],
	},
	/** 打开测试画面 */
	open_test_program: {
		type: 'button',
		category: 'Basics',
		name: 'Open Test Pic',
		style: {
			text: 'On Test Pic',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'open_test_program', options: {} }],
			},
		],
		feedbacks: [],
	},
	/** 关闭测试画面 */
	close_test_program: {
		type: 'button',
		category: 'Basics',
		name: 'OFF Test Pic',
		style: {
			text: 'OFF Test Pic',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'close_test_program', options: {} }],
			},
		],
		feedbacks: [],
	},
	/** 播放上一个画面 */
	previous_program: {
		type: 'button',
		category: 'Basics',
		name: 'Prev Program',
		style: {
			text: 'Prev Program',
			size: '16',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'previous_program', options: {} }],
			},
		],
		feedbacks: [],
	},
	/** 播放下一个画面 */
	next_program: {
		type: 'button',
		category: 'Basics',
		name: 'Next Program',
		style: {
			text: 'Next Program',
			size: '16',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [{ actionId: 'next_program', options: {} }],
			},
		],
		feedbacks: [],
	},
	/** 亮度调节 + */
	brightness_up: {
		type: 'button',
		category: 'Basics',
		name: 'Brightness +',
		style: {
			text: 'Brightness\n+',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'brightness_up',
						options: {},
					},
				],
			},
		],
		feedbacks: [],
	},
	/** 亮度调节 - */
	brightness_down: {
		type: 'button',
		category: 'Basics',
		name: 'Brightness -',
		style: {
			text: 'Brightness\n-',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'brightness_down',
						options: {},
					},
				],
			},
		],
		feedbacks: [],
	},
	/** 亮度旋钮 */
	brightness: {
		type: 'button',
		category: 'Basics',
		name: 'Brightness',
		style: {
			text: 'Brightness',
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
		},
		steps: [
			{
				rotate_left: [
					{
						actionId: 'brightness_down',
						options: {},
					},
				],
				rotate_right: [
					{
						actionId: 'brightness_up',
						options: {},
					},
				],
			},
		],
		options: {
			rotaryActions: true,
		},
		feedbacks: [],
	},
	/** 全局暂停 */
	global_pause: {
		type: 'button',
		category: 'Program Basics Operations',
		name: 'Global Pause',
		style: {
			text: 'Global\nPause',
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(255, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'pause',
						options: {},
					},
				],
			},
		],
		feedbacks: [],
	},
	/** 全局播放 */
	global_play: {
		type: 'button',
		category: 'Program Basics Operations',
		name: 'Global Play',
		style: {
			text: 'Global\nPlay',
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(255, 0, 0),
		},
		steps: [
			{
				down: [
					{
						actionId: 'play',
						options: {},
					},
				],
			},
		],
		feedbacks: [],
	},
}

const getPresetDefinitions = function() {
	return {
		...programListPresets,
		...programOptPresets,
		...basicPresets,
		...displayPresets,
	}
}

const getAllPresetDefinitions = function() {
	return {
		...getPresetDefinitions(),
		...addForFX3ProPresets,
	}
}

module.exports = {
	getPresetDefinitions,
	getAllPresetDefinitions,
}
