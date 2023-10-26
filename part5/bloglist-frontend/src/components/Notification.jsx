export const Notification = ({ message, classType }) => {
  const messageStylesSuccess = {
    color: 'green',
    background: 'black',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const messageStylesError = {
    color: 'red',
    background: 'black',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null) return null

  if (classType === 'success') return <div style={messageStylesSuccess}>{message}</div>
  else return <div style={messageStylesError}>{message}</div>
}
