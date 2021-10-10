import { Button, HelperText, WindmillContext } from '@windmill/react-ui'
import * as React from 'react'
import { useContext } from 'react'

const Content = () => {
  const { mode, toggleMode } = useContext(WindmillContext)
  return (
    <div className="col-span-3 flex justify-between">
      <div className=" w-1/2  ">
        <Button
          className="w-full rounded-t-sm rounded-b-sm dark:bg-gray-800"
          layout="outline"
          onClick={toggleMode}
        >
          Toggle Theme
        </Button>
      </div>
      <div className="flex justify-center content-center w-1/2 h-1/6 ">
        <HelperText className="dark:text-white text-black">
          Current theme is : {mode}
        </HelperText>
      </div>
    </div>
  )
}
export default Content
