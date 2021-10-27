import * as React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import AppToolbar from './components/AppToolbar'
import ThemeToggle from './components/ThemeToggle'
import SlideShow from './components/SlideShow'
import Header from './components/Header'
import { useSelector } from 'react-redux'
import { RootState } from './store'

const App: React.FC = () => {
  const slideData = useSelector((state: RootState) => state.slides)
  const currentSlideId = useSelector((state: RootState) => state.currentSlideId)
  return (
    <div className="app dark:bg-gray-800 bg-gray-300">
      <HashRouter>
        <Switch>
          <Route exact path="/:stringSlideId">
            <div className="grid grid-cols-3 grid-rows-20 gap-0 md:h-screen">
              <ThemeToggle />
              <AppToolbar
                slideData={slideData}
                currentSlideId={currentSlideId}
              />
              <div className="flex justify-center h-full w-full col-span-3 row-span-20">
                <SlideShow slides={slideData} currentSlideId={currentSlideId} />
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
