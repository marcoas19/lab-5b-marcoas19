export async function authenticated() {
  try {
    const response = await fetch('http://localhost:1337/api/v1/status', {
      credentials: 'include'
    })

    const data = await response.json()
    console.log('STATUS DATA:', data)

    return !!(data.ok && data.user)
  } catch (error) {
    console.error('AUTH ERROR:', error)
    return false
  }
}