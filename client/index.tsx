// eslint-disable-next-line no-use-before-define
import { Provider } from 'react-redux'
import { store } from './store/index' // verifiez que le chemin est correct
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Windmill } from '@windmill/react-ui'
import App from './App'
import './style.css'

ReactDOM.render(
  <Provider store={store}>
    <Windmill usePreferences>
      <App />
    </Windmill>
  </Provider>,
  document.getElementById('root')
)
