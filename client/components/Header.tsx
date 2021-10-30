import { Button } from '@windmill/react-ui'
import * as React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 h-1/2">
        <Link to="/0">
          <Button className="w-full h-full" layout="outline">
            Start Slide Show
          </Button>
        </Link>
      </div>
    </div>
  )
}
export default Header
