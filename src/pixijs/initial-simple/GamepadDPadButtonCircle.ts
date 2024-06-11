import {
  Container,
  ContainerChild,
  Graphics,
  Texture,
} from 'pixi.js'
import { rosy42 } from '../palettes'
import { GamepadButton } from './GamepadButton'

const onPressFrames = [2, 1, 0, 1]
const onReleaseFrames = [1, 2, 3, 4]
const innerRadius = 12
const outerCircleRadius = 40
const outerCircleColor = rosy42[23]

interface GamepadDPadButtonCircleOpts {
  parent: Container<ContainerChild>
  textures: Texture[]
  x: number
  y: number
}

export class GamepadDPadButtonCircle {
  readonly up: GamepadButton
  readonly down: GamepadButton
  readonly left: GamepadButton
  readonly right: GamepadButton

  constructor (opts: GamepadDPadButtonCircleOpts) {
    const { parent, x, y } = opts

    const outlineCircle = new Graphics()
    outlineCircle.circle(x, y, outerCircleRadius)
    outlineCircle.stroke({
      width: 2,
      color: outerCircleColor
    })
    parent.addChild(outlineCircle)

    const onPressTextures = onPressFrames.map(num => opts.textures[num])
    const onReleaseTextures = onReleaseFrames.map(num => opts.textures[num])

    this.up = new GamepadButton({
      parent,
      onPressTextures,
      onReleaseTextures,
      x,
      y: y - innerRadius,
      rotation: 0
    })
    this.right = new GamepadButton({
      parent,
      onPressTextures,
      onReleaseTextures,
      x: x + innerRadius,
      y,
      rotation: 90
    })
    this.down = new GamepadButton({
      parent,
      onPressTextures,
      onReleaseTextures,
      x,
      y: y + innerRadius,
      rotation: 180
    })
    this.left = new GamepadButton({
      parent,
      onPressTextures,
      onReleaseTextures,
      x: x - innerRadius,
      y,
      rotation: 270
    })
  }
}