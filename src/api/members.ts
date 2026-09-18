// Cloudflare Worker のエンドポイント
const BASE_URL = 'https://smaregi-callback-worker.mcrn-ch.workers.dev'

export type RegisterMemberInput = {
  lastName: string
  firstName: string
  mailAddress: string
  password: string
}

export async function registerMember(formData: RegisterMemberInput) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error || `会員登録に失敗しました (${res.status})`)
  }

  return data
}
