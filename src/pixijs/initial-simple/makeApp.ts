import { Application, Renderer } from 'pixi.js'
import { globals } from './globals'

export const makeApp = async (): Promise<Application<Renderer>> => {
  const app = new Application()

  await app.init({
    width: globals.width,
    height: globals.height,
    backgroundColor: globals.appBackgroundColor,
    roundPixels: false
  })
  app.resizeTo = window

  document.body.append(app.canvas)

  return app
}