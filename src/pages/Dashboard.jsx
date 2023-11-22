import React from 'react'

export default function Dashboard(props) {
  console.log(props)
  return (
    <>
      <h1>{props && props.user}</h1>
      <div className=''>Dashboard</div>
    </>
  )
}
