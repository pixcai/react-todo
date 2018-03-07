import { createContext } from 'react'

export default createContext({
  themes: {
    light: {
      color: 'black',
      background: 'white'
    },
    dark: {
      color: 'white',
      background: 'black'
    }
  }
})
