export const authenticated = async () => {
  try {
    const response = await fetch('http://marcoas19b.4hx.net:1337/api/v1/status', {
      credentials: 'include'
    })

    const data = await response.json()
    console.log('STATUS RESPONSE:', data)

    return response.ok && !!data.user
  } catch (error) {
    console.error('authenticated() error:', error)
    return false
  }
}