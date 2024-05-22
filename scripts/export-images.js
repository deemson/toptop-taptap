import { $ } from 'execa'
import { expect } from 'chai'
import { asepriteBinaryPath } from '../env.js'
import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs/promises'

const tmpDirPath = path.join(os.tmpdir(), 'toptop-taptap-tmp', 'gamepad')
const topDirPath = path.dirname(import.meta.dirname)
const asepriteDirPath = path.join(topDirPath, 'aseprite')
const assetsDirPath = path.join(topDirPath, 'assets', 'images')

const iconNames = [
  'square',
  'cross',
  'circle',
  'triangle',
  'up',
  'down',
  'left',
  'right',
  'options',
  'bumper',
  'trigger'
]

await fs.mkdir(tmpDirPath, { recursive: true })
try {
  await $`${asepriteBinaryPath} --batch ${asepriteDirPath}/gamepad-icons-15.aseprite --save-as ${tmpDirPath}/gamepad.png`
  const exportedNames = await fs.readdir(tmpDirPath)
  expect(exportedNames).to.have.lengthOf(iconNames.length)
  await Promise.all(exportedNames.map(exportedName => {
    const index = Number.parseInt(exportedName.replaceAll('gamepad', ''), 10) - 1
    return fs.rename(
      path.join(tmpDirPath, exportedName),
      path.join(assetsDirPath, iconNames[index] + '.png')
    )
  }))
} finally {
  await fs.rm(tmpDirPath, { recursive: true, force: true })
}
