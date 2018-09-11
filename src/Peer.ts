import { Socket, createConnection } from 'net'
import { hexId, print } from './tools'

const port = parseInt(process.env.PORT || '60030')
const host = process.env.HOST || '127.0.0.1'

export class Peer {

  private client: Socket
  private address: string
  private port = 0

  constructor(public account = hexId()) {
    this.client = createConnection(port, host)
  }

  async run() {
    print(`Peer`, `${this.account}`, this.port)

    this.client
      .on('data', this.onData.bind(this))
      .on('error', this.onError.bind(this))
      .on('end', this.onEnd.bind(this))
      .on('heartbit', this.onHeartbit.bind(this))
      .on('timeout', this.onTimeout.bind(this))
      .on('connect', this.onConnected.bind(this))
  }

  private onError(error: Error) {
    print(`Boot`, host, port, `Error`, error.message)
    this.client.destroy()
  }

  private onData(buffer: Buffer) {
    print(`Boot`, host, port, `Data`, JSON.parse(buffer.toString()).ts)
  }

  private onHeartbit(socket: Socket) {
    print(`Boot`, host, port, `Heartbit`)
    socket.end()
  }

  private onTimeout(socket: Socket) {
    print(`Boot`, host, port, `Timeout`)
    socket.end()
  }

  private onConnected(status = 'Connected') {
    print(`Peer`, host, port, status)
    this.client.emit('ping', [{ name: 0 }])
  }

  private onEnd() {
    print(`Peer`, host, port, `End`)
  }

}
