// eslint-disable-next-line no-use-before-define
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Windmill } from '@windmill/react-ui'
import Header from './components/Header'
import Content from './components/Content'
const Index = () => {
  return (
    <div className="container">
      <Header />
      <Content />
    </div>
  )
}
ReactDOM.render(
  <Windmill>
    <Index />
  </Windmill>,
  document.getElementById('root')
)
