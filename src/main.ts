import { GamepadColorButtonCircle, makeApp, makeTopBackgroundContainer } from './pixijs/initial-simple'
import { Assets } from 'pixi.js'
import { globals } from './pixijs/initial-simple/globals'
import { Howl } from 'howler'

(async () => {
  const app = await makeApp()
  const container = await makeTopBackgroundContainer(app)

  await Promise.all(['circle', 'cross', 'square', 'triangle'].map(name => {
    return Assets.load(`/assets/images/simple/${name}.json`)
  }))

  const circle = new GamepadColorButtonCircle(
    container,
    globals.width / 2,
    globals.height / 2
  )
  const popSound = new Howl({ src: 'assets/sounds/zapsplat_cartoon_pop_mouth_mid_pitch_001_86611.mp3' })

  window.addEventListener('keydown', event => {
    switch (event.code) {
      case 'KeyJ':
        popSound.play()
        circle.square.onPress()
        break
      case 'KeyI':
        popSound.play()
        circle.triangle.onPress()
        break
      case 'KeyL':
        popSound.play()
        circle.circle.onPress()
        break
      case 'KeyK':
        popSound.play()
        circle.cross.onPress()
        break
    }
  })
  window.addEventListener('keyup', event => {
    switch (event.code) {
      case 'KeyJ':
        popSound.stop()
        circle.square.onRelease()
        break
      case 'KeyI':
        popSound.stop()
        circle.triangle.onRelease()
        break
      case 'KeyL':
        popSound.stop()
        circle.circle.onRelease()
        break
      case 'KeyK':
        popSound.stop()
        circle.cross.onRelease()
        break
    }
  })
})()