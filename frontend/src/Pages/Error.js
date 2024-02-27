import React from 'react'

import { useRouteError } from 'react-router-dom'

const Error = () => {

    const err = useRouteError()

  return (
    <div><h1>{err.data}</h1></div>
  )
}

export default Error

/**
 * useRouteError - use this hook to display specific type of error .
 */