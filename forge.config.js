const { join } = require('path')

module.exports = {
  packagerConfig: {
    asar: true,
    icon: 'src/icons/app',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        skipUpdateIcon: false,
        authors: '@wlln.rds',
        description: 'Seu cenário em forma de enciclopédia',
        setupIcon: join(__dirname,'src', 'icons','setup.ico'),
        iconUrl: 'https://raw.githubusercontent.com/walmeidaw/project-bill/master/src/icons/setup.ico',
        setupExe: 'Projeto Bill.exe'
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: join(__dirname,'src', 'icons','setup.png'),
        }
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {

      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
};