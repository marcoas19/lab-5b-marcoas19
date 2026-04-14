export async function authenticated() {
  try {
    const response = await fetch('/api/v1/status', {
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

export async function getStatus() {
  try {
    const response = await fetch('/api/v1/status', {
      credentials: 'include'
    })

    return await response.json()
  } catch (error) {
    console.error('STATUS ERROR:', error)
    return { ok: false, user: null }
  }
}