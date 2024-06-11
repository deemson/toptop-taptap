import { Container, ContainerChild, Graphics, Texture } from 'pixi.js'
import { rosy42 } from '../palettes'
import { GamepadButton } from './GamepadButton'

const onPressFrames = [2, 1, 0, 1]
const onReleaseFrames = [1, 2, 3, 4]
const innerRadius = 22
const outerCircleRadius = 40
const outerCircleColor = rosy42[23]

interface GamepadColorButtonCircleOpts {
  parent: Container<ContainerChild>
  x: number
  y: number
  textures: {
    square: Texture[]
    triangle: Texture[]
    circle: Texture[]
    cross: Texture[]
  }
}

export class GamepadColorButtonCircle {
  readonly square: GamepadButton
  readonly triangle: GamepadButton
  readonly circle: GamepadButton
  readonly cross: GamepadButton

  constructor (opts: GamepadColorButtonCircleOpts) {
    const { parent, x, y } = opts

    const outlineCircle = new Graphics()
    outlineCircle.circle(x, y, outerCircleRadius)
    outlineCircle.stroke({
      width: 2,
      color: outerCircleColor
    })
    parent.addChild(outlineCircle)

    this.square = new GamepadButton({
      parent,
      onPressTextures: onPressFrames.map(num => opts.textures.square[num]),
      onReleaseTextures: onReleaseFrames.map(num => opts.textures.square[num]),
      x: x - innerRadius,
      y,
      rotation: 0
    })
    this.triangle = new GamepadButton({
      parent,
      onPressTextures: onPressFrames.map(num => opts.textures.triangle[num]),
      onReleaseTextures: onReleaseFrames.map(num => opts.textures.triangle[num]),
      x,
      y: y - innerRadius,
      rotation: 0
    })
    this.circle = new GamepadButton({
      parent,
      onPressTextures: onPressFrames.map(num => opts.textures.circle[num]),
      onReleaseTextures: onReleaseFrames.map(num => opts.textures.circle[num]),
      x: x + innerRadius,
      y,
      rotation: 0
    })
    this.cross = new GamepadButton({
      parent,
      onPressTextures: onPressFrames.map(num => opts.textures.cross[num]),
      onReleaseTextures: onReleaseFrames.map(num => opts.textures.cross[num]),
      x,
      y: y + innerRadius,
      rotation: 0
    })
  }
}