import * as React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import AppToolbar from './components/AppToolbar'
import ThemeToggle from './components/ThemeToggle'
import SlideShow from './components/SlideShow'
import Header from './components/Header'
import SocketHandler from './components/SocketTest'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'
import { Button } from '@windmill/react-ui'
import { RefreshIcon } from './utils/Icons'
import { resetSlides } from './slices/slideShowSlice'

const App: React.FC = () => {
  const slideData = useSelector((state: RootState) => state.slides)
  const currentSlideId = useSelector((state: RootState) => state.currentSlideId)
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div className="app dark:bg-gray-800 bg-gray-300 min-h-screen h-full flex justify-center content-center">
      <HashRouter>
        <Switch>
          <Route exact path="/testSocket">
            <SocketHandler slides={slideData} currentSlideId={currentSlideId} />
          </Route>
          <Route exact path="/:stringSlideId">
            {slideData.length > 0 && currentSlideId !== undefined ? (
              <div className="static grid grid-cols-1 grid-rows-20 gap-0 h-full">
                <div className=" bottom-0 right-0 left-0">
                  <ThemeToggle />
                  <AppToolbar
                    slideData={slideData}
                    currentSlideId={currentSlideId}
                  />
                </div>
                <div className="flex justify-center h-full w-full col-span-3 row-span-20">
                  <SlideShow
                    slides={slideData}
                    currentSlideId={currentSlideId}
                  />
                </div>
              </div>
            ) : (
              <Button
                layout="outline"
                className="justify-self-center place-self-center self-center w-1/2 h-1/2"
                icon={RefreshIcon}
                onClick={() => dispatch(resetSlides())}
              />
            )}
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
