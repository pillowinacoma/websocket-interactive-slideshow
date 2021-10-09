// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Windmill } from '@windmill/react-ui'
import App from './App'
import './style.css'

ReactDOM.render(
  <Windmill usePreferences>
    <App />
  </Windmill>,
  document.getElementById('root')
)
