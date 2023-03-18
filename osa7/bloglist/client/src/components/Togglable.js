import React, { useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })
  return (
    <div>
      <Button onClick={toggleVisibility} style={hideWhenVisible}>
        {props.buttonLabel}
      </Button>
      <div style={showWhenVisible}>
        <span className={'btn-danger'}>
          {props.children}
          <Button onClick={toggleVisibility} className={'btn-danger'}>
            cancel
          </Button>
        </span>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
