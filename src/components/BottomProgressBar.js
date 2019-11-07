import React from 'react'

const BottomProgressBar = (props) => {
  const { current, total, correctAns } = props
  const remQuiz = total - current
  const minScore = (correctAns / total) * 100
  const currScore = (correctAns / current) * 100
  const currProg = currScore - minScore
  const maxScore = ((correctAns + remQuiz) / total) * 100
  const maxProg = maxScore - currScore
  const remProg = 100 - maxScore
  const vals = [minScore, currProg, maxProg, remProg]
  const totalVals = vals && vals.length

  const style = (width, opacity) => ({
    width: `${width}%`,
    backgroundColor: 'black',
    minHeight: '5px',
    opacity
  })
  return (

    <span style={{ display: 'flex', height: '-webkit-fill-available' }}>
      {vals.map((val, index) => (
        (index === 0)
          ? <div
            key={`BottomProgressBar${index}${val}`}
            style={style(val, 1)}
          />
          : <div
            key={`BottomProgressBar${index}${val}`}
            style={style(val, (totalVals - (index + 1)) / totalVals)}
          />
      ))}
    </span>
  )
}

export default BottomProgressBar
