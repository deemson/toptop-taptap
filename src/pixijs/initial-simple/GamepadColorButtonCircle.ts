import { Container, ContainerChild, Graphics } from 'pixi.js'
import { GamepadColorButton } from './GamepadColorButton'
import { rosy42 } from '../palettes'

export class GamepadColorButtonCircle {
  readonly square: GamepadColorButton
  readonly triangle: GamepadColorButton
  readonly circle: GamepadColorButton
  readonly cross: GamepadColorButton

  constructor (
    parent: Container<ContainerChild>,
    x: number,
    y: number
  ) {
    const outlineCircle = new Graphics()
    outlineCircle.circle(x, y, 40)
    outlineCircle.stroke({
      width: 2,
      color: rosy42[1]
    })
    parent.addChild(outlineCircle)
    const butR = 25
    this.square = new GamepadColorButton(parent, 'square', x - butR, y)
    this.triangle = new GamepadColorButton(parent, 'triangle', x, y - butR)
    this.circle = new GamepadColorButton(parent, 'circle', x + butR, y)
    this.cross = new GamepadColorButton(parent, 'cross', x, y + butR)
  }
}