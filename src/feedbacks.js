const getFeedbacks = function (instance) {
	return {
		selected_media: {
			type: 'advanced',
			name: 'Selected Media',
			description: "Show this button's Select Media action program and layer",
			options: [],
			callback: (feedback) => {
				const selected = instance.selectMediaByControl?.[feedback.controlId]
				if (!selected) {
					return {}
				}

				return {
					text: `Select Media\n(${selected.program_index}-${selected.layer_index})`,
				}
			},
		},
		bind_media: {
			type: 'advanced',
			name: 'Bind Media',
			description: "Show this button's Bind Media action program and layer",
			options: [],
			callback: (feedback) => {
				const bound = instance.bindMediaByControl?.[feedback.controlId]
				if (!bound) {
					return {}
				}

				return {
					text: `Bind Media\n(${bound.program_index}-${bound.layer_index})`,
				}
			},
		},
	}
}

module.exports = {
	getFeedbacks,
}
