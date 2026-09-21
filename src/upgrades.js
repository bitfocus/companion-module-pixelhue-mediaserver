module.exports = [
	/*
	 * Place your upgrade scripts here
	 * Remember that once it has been added it cannot be removed!
	 */
	function (context, props) {
		const updatedActions = []

		for (const action of props.actions) {
			if (action.actionId !== 'program' || action.options?.program === undefined) {
				continue
			}

			const oldProgram = Number(action.options.program)
			if (Number.isNaN(oldProgram) || oldProgram < 1) {
				continue
			}

			action.options.program = oldProgram - 1
			updatedActions.push(action)
		}

		return {
			updatedConfig: null,
			updatedActions,
			updatedFeedbacks: [],
		}
	},
]
