import * as React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import AppToolbar from './components/AppToolbar'
import Content from './components/Content'
import SlideShow from './components/SlideShow'
import { initialSlides } from './mock/slides'

const App: React.FC = () => {
  const [slideData] = React.useState(initialSlides)

  return (
    <div className="app">
      <HashRouter>
        <Switch>
          <Route exact path="/:stringSlideId?">
            <Content/>
            <SlideShow slideData={slideData} />
            <AppToolbar slideData={slideData} />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App
