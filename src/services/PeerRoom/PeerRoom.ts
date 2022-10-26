import { joinRoom, Room, BaseRoomConfig } from 'trystero'
import { TorrentRoomConfig } from 'trystero/torrent'

export class PeerRoom {
  private room: Room

  private roomConfig: TorrentRoomConfig & BaseRoomConfig

  constructor(config: TorrentRoomConfig & BaseRoomConfig, roomId: string) {
    this.roomConfig = config
    this.room = joinRoom(this.roomConfig, roomId)
  }

  leaveRoom = () => {
    if (!this.room) return
    this.room.leave()
  }

  onPeerJoin: Room['onPeerJoin'] = fn => {
    if (!this.room) return
    this.room.onPeerJoin((...args) => fn(...args))
  }

  onPeerLeave: Room['onPeerLeave'] = fn => {
    if (!this.room) return
    this.room.onPeerLeave((...args) => fn(...args))
  }

  makeAction = <T>(namespace: string) => {
    return this.room.makeAction<T>(namespace)
  }
}