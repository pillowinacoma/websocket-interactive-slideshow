import { Button } from '@windmill/react-ui'
import * as React from 'react'

const Header = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 h-1/2">
        <Button
          className="flex justify-between content-center w-full"
          layout="outline"
        >
          Start Slide Show
        </Button>
      </div>
    </div>
  )
}
export default Header
