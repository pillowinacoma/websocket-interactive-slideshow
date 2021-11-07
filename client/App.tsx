import * as React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import AppToolbar from './components/AppToolbar'
import ThemeToggle from './components/ThemeToggle'
import { isMobile } from 'react-device-detect'
import SocketHandler from './components/SocketHandler'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'
import { Button, Card, CardBody } from '@windmill/react-ui'
import { RefreshIcon } from './utils/Icons'
import { resetSlides, setSlide } from './slices/slideShowSlice'
import ReactMarkdown from 'react-markdown'

const App: React.FC = () => {
  const slideData = useSelector((state: RootState) => state.slides)
  const currentSlideId = useSelector((state: RootState) => state.currentSlideId)
  const drawing = useSelector((state: RootState) => state.drawing)
  const dispatch = useDispatch<AppDispatch>()

  if (Number(window.location.hash.split('/')[2]) !== currentSlideId) {
    const wh = window.location.hash.split('/')
    wh[2] = String(currentSlideId)
    window.location.hash = wh.join('/')
  }

  window.onpopstate = (event) => {
    if (window.location.hash.split('/')[2] !== currentSlideId + '') {
      const slID = Number(window.location.hash.split('/')[2])
      if (slID || slID === 0) {
        dispatch(setSlide(slID, true))
      } else {
        dispatch(setSlide(0, true))
      }
    }
  }
  return (
    <div className="app dark:bg-gray-800 bg-gray-300 min-h-screen h-full flex justify-center content-center">
      <HashRouter>
        <Switch>
          <Route exact path="/Present/:slideId">
            {slideData.length > 0 && currentSlideId !== undefined ? (
              <SocketHandler
                drawing={drawing}
                slides={slideData}
                currentSlideId={currentSlideId}
              />
            ) : (
              <Card>
                <CardBody>
                  <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
                    Waiting For Slides
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Controller removed all the slides, the server will serve you
                    some whenever there is ...
                  </p>
                </CardBody>
              </Card>
            )}
          </Route>
          <Route exact path="/Control/:slideId">
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
                  <div id="markdownContainer" className="prose">
                    <ReactMarkdown className="children:dark:text-white">
                      {slideData[currentSlideId].notes}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ) : (
              <Button
                layout="outline"
                className="justify-self-center place-self-center self-center w-1/2 h-1/2"
                icon={RefreshIcon}
                onClick={() => dispatch(resetSlides(null, true))}
              />
            )}
          </Route>
          <Route path="*">
            {isMobile ? (
              <Redirect exact to="/Control/0" />
            ) : (
              <Redirect exact to="/Present/0" />
            )}
          </Route>
        </Switch>
      </HashRouter>
    </div>
  )
}

export default App
