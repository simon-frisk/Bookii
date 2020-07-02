export default error => {
  if (!error) return
  if (error.graphQLErrors.length) {
    return error.graphQLErrors.map(error => error.message).join(', ')
  }
  if (error.networkError) return 'Network error'
  if (error.error) return error.error.message
  return 'Unknown error occured'
}
