// eslint-disable-next-line no-use-before-define
import React = require('react')
import ReactDOM = require('react-dom')
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
ReactDOM.render(<Index />, document.getElementById('root'))
