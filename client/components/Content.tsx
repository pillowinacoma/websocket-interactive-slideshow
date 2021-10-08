import { Button, WindmillContext } from '@windmill/react-ui'
import * as React from 'react'
import { useContext } from 'react'

const Content = () => {
  const { mode, toggleMode } = useContext(WindmillContext)
  return (
    <>
      <Button onClick={toggleMode}>Toggle Theme</Button>
      <p>Current theme is : {mode}</p>
    </>
  )
}
export default Content
