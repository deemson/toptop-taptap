import { Application, Container, ContainerChild, Renderer, Sprite, Texture } from 'pixi.js'
import { globals } from './globals'

export const makeTopBackgroundContainer = async (app: Application<Renderer>): Promise<Container<ContainerChild>> => {
  const container = new Container({
    width: globals.width,
    height: globals.height,
    x: app.screen.width / 2 - globals.width / 2,
    y: app.screen.height / 2 - globals.height / 2
  })

  const background = new Sprite({
    texture: Texture.WHITE,
    width: globals.width,
    height: globals.height,
    tint: globals.topContainerBackgroundColor,
    x: 0,
    y: 0,
  })
  container.addChild(background)

  app.stage.addChild(container)

  app.ticker.add(() => {
    const scale = Math.min(
      Math.floor(app.screen.width / globals.width),
      Math.floor(app.screen.height / globals.height),
    )
    container.scale = scale
    container.position
    container.x = app.screen.width / 2 - globals.width * scale / 2
    container.y = app.screen.height / 2 - globals.height * scale / 2
  })

  return container
}