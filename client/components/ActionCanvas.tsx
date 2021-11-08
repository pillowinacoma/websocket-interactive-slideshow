import * as React from 'react'
import { FC, PointerEvent, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { nextSlide, previousSlide } from '../slices/slideShowSlice'
import { AppDispatch } from '../store'
import recognizer from '../onedollar/recognizer'

const ActionCanvas: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  let clickX: number[] = []
  let clickY: number[] = []
  let clickDrag: boolean[] = []
  let gesturePoints: [number, number][] = []
  let gesture: any
  let paint: boolean = false

  // Cette ligne permet d'avoir accès à notre canvas après que le composant aie été rendu. Le canvas est alors disponible via refCanvas.current
  // Si vous utilisez des Class Components plutôt que des function Components, voir ici https://stackoverflow.com/a/54620836
  const refCanvas = useRef(null)

  const addClick = (x: number, y: number, dragging: boolean) => {
    clickX.push(x)
    clickY.push(y)
    clickDrag.push(dragging)
    if (dragging) gesturePoints.push([x, y])
  }
  const redraw = () => {
    const context = refCanvas.current.getContext('2d')
    const width = refCanvas.current.getBoundingClientRect().width
    const height = refCanvas.current.getBoundingClientRect().height

    // Ceci permet d'adapter la taille du contexte de votre canvas à sa taille sur la page
    refCanvas.current.setAttribute('width', width)
    refCanvas.current.setAttribute('height', height)
    context.clearRect(0, 0, context.width, context.height) // Clears the canvas

    context.strokeStyle = '#df4b26'
    context.lineJoin = 'round'
    context.lineWidth = 2

    for (let i = 0; i < clickX.length; i++) {
      context.beginPath()
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i - 1] * width, clickY[i - 1] * height)
      } else {
        context.moveTo(clickX[i] * width - 1, clickY[i] * height)
      }
      context.lineTo(clickX[i] * width, clickY[i] * height)
      context.closePath()
      context.stroke()
    }
  }
  function pointerDownHandler(ev: PointerEvent<HTMLCanvasElement>) {
    if (ev.pointerType === 'touch') {
      const width = refCanvas.current.getBoundingClientRect().width
      const height = refCanvas.current.getBoundingClientRect().height
      const mouseX = (ev.pageX - refCanvas.current.offsetLeft) / width
      const mouseY = (ev.pageY - refCanvas.current.offsetTop) / height

      paint = true
      addClick(mouseX, mouseY, false)
      redraw()
    }
  }

  function pointerMoveHandler(ev: PointerEvent<HTMLCanvasElement>) {
    if (ev.pointerType === 'touch') {
      if (paint) {
        const width = refCanvas.current.getBoundingClientRect().width
        const height = refCanvas.current.getBoundingClientRect().height
        addClick(
          (ev.pageX - refCanvas.current.offsetLeft) / width,
          (ev.pageY - refCanvas.current.offsetTop) / height,
          true
        )
        redraw()
      }
    }
  }
  function pointerUpEvent(ev: PointerEvent<HTMLCanvasElement>) {
    if (ev.pointerType === 'touch') {
      gesture = recognizer.check(gesturePoints)
      console.log('gesture', gesture)
      gesturePoints = []
      paint = false

      if (gesture?.recognized) {
        if (gesture?.name === 'right') {
          dispatch(nextSlide())
        } else if (gesture?.name === 'left') {
          dispatch(previousSlide())
        }
      }
      clickX = []
      clickY = []
      clickDrag = []
      redraw()
    }
  }
  return (
    <canvas
      className="stroke absolute w-full h-auto"
      ref={refCanvas}
      onPointerDown={pointerDownHandler}
      onPointerMove={pointerMoveHandler}
      onPointerUp={pointerUpEvent}
    ></canvas>
  )
}
export default ActionCanvas
