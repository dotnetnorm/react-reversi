import React from "react";
import io from 'socket.io-client'
let socket = io(`http://localhost:3000`)

class App extends Component {
  constructor () {
    super()

    socket.on(`server:event`, data => {
      this.setState({ data })
    })
  }

  sendMessage = message => {
    socket.emit(`client:sendMessage`, message)
  }

  render () {
    return (
      <Child
        socket = { socket }
        sendMessage = { this.sendMessage }
      />
    )
  }
}
