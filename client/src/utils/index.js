export const errorMessage = (error) => {
  if (error.response.status === 401) {
    return 'you are not logged in'
  }
}
