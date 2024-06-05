import { Container, Texture } from 'pixi.js'

export interface GamepadButtonOptions {

}

export class GamepadButton {
  constructor (
    private readonly parent: Container,
    private readonly texture: Texture
  ) {}
}
