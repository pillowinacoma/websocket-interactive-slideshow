import * as React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import AppToolbar from './components/AppToolbar'
import ThemeToggle from './components/ThemeToggle'
import SlideShow from './components/SlideShow'
import { initialSlides } from './mock/slides'
import Header from './components/Header'

const App: React.FC = () => {
  const [slideData] = React.useState(initialSlides)

  return (
    <div className="app dark:bg-gray-800 bg-gray-300">
      <HashRouter>
        <Switch>
          <Route exact path="/:stringSlideId">
            <div className="grid grid-cols-3 grid-rows-20 gap-0 md:h-screen">
              <ThemeToggle />
              <AppToolbar slideData={slideData} />
              <div className="flex justify-center h-full w-full col-span-3 row-span-20">
                <SlideShow slideData={slideData} />
              </div>
            </div>
          </Route>
          <Route exact path="/">
            <Header />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App
