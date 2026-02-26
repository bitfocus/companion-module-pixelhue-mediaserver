const { InstanceBase, Regex, UDPHelper, runEntrypoint, InstanceStatus } = require('@companion-module/base')

const actions = require('./actions.js')
const UpgradeScripts = require('./upgrades.js')
const presets = require('./presets.js')

const { getPrograms } = require('../utils/getPrograms.js')
const { decodePrograms, decodeControlProtocol } = require('../utils/cmdCodec.js')
const { PRODUCTS_INFO, PRODUCTS_INFORMATION, ADD_ACTIONS_DEVICES } = require('../utils/constant.js')

class ModuleInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		Object.assign(this, {
			...actions,
		})

		this.PRODUCTS_INFO = PRODUCTS_INFO
		this.log('debug', `PRODUCTS_INFO ${this.PRODUCTS_INFO}`)
		this.PRODUCTS = Object.values(this.PRODUCTS_INFO)
	}

	updateActions() {
		this.setActionDefinitions(
			ADD_ACTIONS_DEVICES.includes(this.config.modelId) ? actions.getAllActions(this) : actions.getActions(this)
		)
	}

	updatePresets() {
		this.setPresetDefinitions(
			ADD_ACTIONS_DEVICES.includes(this.config.modelId)
				? presets.getAllPresetDefinitions()
				: presets.getPresetDefinitions()
		)
	}

	initUDP() {
		if (this.udp) {
			this.udp.destroy()
			delete this.udp
		}

		if (this.config.host) {
			this.udp = new UDPHelper(this.config.host, this.config.port ?? 18960, {
				bind_ip: '0.0.0.0',
				bind_port: 18961,
			})

			this.udp.on('error', (err) => {
				this.log('error', 'Network error: ' + err.message)
				this.updateStatus(InstanceStatus.ConnectionFailure, err.message)
			})

			this.udp.on('listening', () => {
				this.log('debug', 'UDP listening')
				this.updateStatus(InstanceStatus.Ok)
				getPrograms(this)
			})

			// If we get data, thing should be good
			this.udp.on('data', (msg) => {
				this.log('debug', 'initUDP getData')

				const res = decodeControlProtocol(msg)

				if (res.tag !== 129) {
					this.log('debug', `response tag: ${res.tag}`)
					return
				}

				const result = decodePrograms(res.data)
			})

			this.udp.on('status_change', (status, message) => {
				this.updateStatus(status, message)
				this.log('debug', 'UDP status_change: ' + status)
			})
			this.log('debug', 'initUDP finish')
		} else {
			this.log('error', 'No host configured')
			this.updateStatus(InstanceStatus.BadConfig)
		}
	}

	async init(config) {
		this.config = config

		if (this.config.modelID !== undefined) {
			this.model = this.PRODUCTS_INFO[this.config.modelID]
		} else {
			this.config.modelID = this.PRODUCTS[0]
			this.model = this.PRODUCTS_INFO[this.config.modelID]
		}

		// 当前节目列表及节目id
		this.programList = []
		this.programId = 0

		this.updateStatus(InstanceStatus.Connecting)

		this.initUDP()

		this.updateActions()
		this.updatePresets()
	}

	// When module gets deleted
	async destroy() {
		if (this.socket !== undefined) {
			this.socket.destroy()
		}
		if (this.udp !== undefined) {
			this.udp.destroy()
		}
		this.log('debug', 'destroy')
	}

	// Return config fields for web config
	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: PRODUCTS_INFORMATION,
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'IP Address',
				width: 6,
				default: '192.168.0.10',
				regex: Regex.IP,
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'UDP Port',
				width: 6,
				default: '18960',
				regex: Regex.PORT,
			},
			{
				type: 'dropdown',
				id: 'modelId',
				label: 'Model',
				width: 6,
				choices: this.PRODUCTS,
				default: this.PRODUCTS[0].id,
			},
		]
	}

	async configUpdated(config) {
		let resetConnection = false

		if (this.config.host != config.host) {
			resetConnection = true
		}

		this.log('info', 'configUpdated module....')

		this.config = {
			...this.config,
			...config,
		}
		this.model = this.PRODUCTS[config.modelID]
		this.updatePresets()
		this.updateActions()
		if (resetConnection === true || this.socket === undefined) {
			this.updateStatus(InstanceStatus.Connecting)
			this.initUDP()
		}
	}
}

runEntrypoint(ModuleInstance, UpgradeScripts)
