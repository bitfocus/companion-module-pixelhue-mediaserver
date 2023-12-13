const { combineRgb } = require('@companion-module/base');

const getPrograms = (num) => {
	const playPrograms = {}
	for (let i = 1; i <= num; i++) {
		const programs = {
			type: 'button',
			category: 'Program List',
			name: 'Program ' + i,
			style: {
				text: 'Program\\n' + i,
				size: '18',
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
const programListPresets = getPrograms(256);

const programOptPresets = {
  pause: {
    type: 'button',
    category: 'Program Basics Operations',
    name: 'Pause',
    style: {
      text: 'Pause',
			size: '24',
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
	update: {
		type: 'button',
    category: 'Program Basics Operations',
    name: 'Update',
    style: {
      text: 'Update',
			size: '18',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
    },
    steps: [
			{
				down: [
					{
						actionId: 'update_program',
						options: {},
					},
				],
			},
		],
		feedbacks: [],
	}
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


exports.getPresetDefinitions = function () {
	return {
    ...programListPresets,
    ...programOptPresets,
		...basicPresets,
    ...displayPresets,
	}
}
