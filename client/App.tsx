import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppToolbar from './components/AppToolbar'
import SlideShow from './components/SlideShow'
import { initialSlides } from './mock/slides'

const App: React.FC = () => {
  const [slides] = React.useState(initialSlides)

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/:slideId?">
            <SlideShow slides={slides} />
            <AppToolbar slides={slides} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
