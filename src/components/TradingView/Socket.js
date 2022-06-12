class socket {
  constructor(options) {
      this.heartBeatTimer = null
      this.options = options
      this.messageMap = {}
      this.connState = 0
      this.socket = null
  }
  doOpen() {
      if (this.connState) return
      this.connState = 1
      this.afterOpenEmit = []
      const BrowserWebSocket = window.WebSocket || window.MozWebSocket
      const socketArg = new BrowserWebSocket(this.url)
      socketArg.binaryType = 'arraybuffer'
      socketArg.onopen = evt => this.onOpen(evt)
      socketArg.onclose = evt => this.onClose(evt)
      socketArg.onmessage = evt => this.onMessage(evt.data)
      // socketArg.onerror = err => this.onError(err)
      this.socket = socketArg
  }
  onOpen() {
      this.connState = 2
      this.heartBeatTimer = setInterval(this.checkHeartbeat.bind(this), 20000)
      this.onReceiver({ Event: 'open' })
  }
  checkOpen() {
      return this.connState === 2
  }
  onClose() {
      this.connState = 0
      if (this.connState) {
          this.onReceiver({ Event: 'close' })
      }
  }
  send(data) {
      this.socket.send(JSON.stringify(data))
  }
  emit(data) {
      return new Promise((resolve) => {
          this.socket.send(JSON.stringify(data))
          this.on('message', (dataArray) => {
              resolve(dataArray)
          })
      })
  }
  onMessage(message) {
      try {
          const data = JSON.parse(message)
          this.onReceiver({ Event: 'message', Data: data })
      } catch (err) {
          // console.error(' >> Data parsing error:', err)
      }
  }
  checkHeartbeat() {
      const data = {
          cmd: 'ping',
          args: [Date.parse(new Date())]
      }
      this.send(data)
  }
  onReceiver(data) {
      const callback = this.messageMap[data.Event]
      if (callback) callback(data.Data)
  }
  on(name, handler) {
      this.messageMap[name] = handler
  }
  doClose() {
      this.socket.close()
  }
  destroy() {
      if (this.heartBeatTimer) {
          clearInterval(this.heartBeatTimer)
          this.heartBeatTimer = null
      }
      this.doClose()
      this.messageMap = {}
      this.connState = 0
      this.socket = null
  }
}
export default socket