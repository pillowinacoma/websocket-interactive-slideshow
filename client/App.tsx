import * as React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import AppToolbar from './components/AppToolbar'
import Content from './components/Content'
import SlideShow from './components/SlideShow'
import { initialSlides } from './mock/slides'

const App: React.FC = () => {
  const [slideData] = React.useState(initialSlides)

  return (
    <div className="app dark:bg-gray-800">
      <HashRouter>
        <Switch>
          <Route exact path="/:stringSlideId">
            <div className="grid grid-cols-3 grid-rows-20 gap-0">
              <Content />
              <AppToolbar slideData={slideData} />
              <div className="flex justify-center h-full w-full col-span-3 row-span-20">
                <SlideShow slideData={slideData} />
              </div>
            </div>
          </Route>
          <Route exact path="/">
            <Content />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App
