export async function authenticated() {
  try {
    const response = await fetch(`${process.env.VUE_APP_API_ORIGIN}/api/v1/status`, {
      credentials: 'include'
    })

    const data = await response.json()
    return !!(data.ok && data.user)
  } catch (error) {
    return false
  }
}

export async function getStatus() {
  try {
    const response = await fetch(`${process.env.VUE_APP_API_ORIGIN}/api/v1/status`, {
      credentials: 'include'
    })

    return await response.json()
  } catch (error) {
    return { ok: false, user: null }
  }
}