const asyncActionCreator =
  ({ dispatch }) =>
  next =>
  async action => {
    const {
      baseType,
      asyncCall,
      payload = {},
      onSuccess = () => {},
      onFailure = () => {}
    } = action

    if (!asyncCall) {
      return next(action)
    }

    if (typeof asyncCall !== 'function') {
      throw new Error('Expected asyncCall to be a function.')
    }

    try {
      dispatch({
        type: `${baseType}`,
        meta: {
          payload,
          lifecycle: 'request'
        }
      })
      const response = await asyncCall(dispatch)

      if (response.status) {
        dispatch({
          type: `${baseType}`,
          payload: response,
          meta: {
            payload,
            lifecycle: 'success'
          }
        })
        onSuccess(dispatch, response)
      } else {
        dispatch({
          type: `${baseType}`,
          payload: response,
          meta: {
            payload,
            lifecycle: 'failure'
          }
        })
        onFailure(dispatch, response)
      }
      return response
    } catch (error) {
      dispatch({
        type: `${baseType}`,
        payload: error,
        meta: {
          payload,
          lifecycle: 'failure'
        }
      })
      onFailure(dispatch, error)
      return error
    }
  }

export default asyncActionCreator
