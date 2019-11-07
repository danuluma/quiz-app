import React from 'react'

const TopProgressBar = (props) => {
  const { current, total } = props
  const progress = ((current) / total) * 100
  const vals = [progress, 100 - progress]
  const totalVals = vals && vals.length
  const style = (width, opacity) => ({
    width: `${width}%`,
    backgroundColor: 'black',
    height: '10px',
    opacity
  })
  return (
    <span style={{ display: 'flex' }}>
      {vals.map((val, index) => (
        <div
          key={`TopProgressBar${index}${val}`}
          style={style(val, (totalVals - (index + 1)) / totalVals)}
        />
      ))}
    </span>
  )
}

export default TopProgressBar
