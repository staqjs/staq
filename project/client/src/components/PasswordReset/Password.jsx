import React from 'react'

function Password(props) {
  const { sendPasswordResetEmail, passwordResetMessage } = props

  const handleSubmit = (event) => {
    event.preventDefault()
    sendPasswordResetEmail()
  }

  return (
    <div className={''}>
      <h4 className={''}>Password Reset</h4>
      <form className={''}>
        <div className={''}>
          <button className={''} onClick={handleSubmit} type="submit">
            Send Reset Instructions
          </button>

          {passwordResetMessage ? (
            <span className={''}>{passwordResetMessage}</span>
          ) : null}
        </div>
      </form>
    </div>
  )
}

export default Password
