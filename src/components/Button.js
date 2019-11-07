import React from 'react'
import { Button } from 'antd'

const MyButton = props => {
  const { text, btnClass, onClick, disabled, pos } = props
  return (
    <Button value={pos} onClick={onClick} className={btnClass} disabled={disabled}>
      {text}
    </Button>
  )
}

export default MyButton
