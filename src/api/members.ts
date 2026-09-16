// src/api/members.ts
import axios from 'axios'

// Cloudflare Worker のエンドポイント
const BASE_URL = 'https://smaregi-callback-worker.mcrn-ch.workers.dev'

export async function registerMember(formData: any) {
  try {
    const res = await axios.post(`${BASE_URL}/register`, formData)
    console.log('✅ 会員登録成功:', res.data)
    return res.data
  } catch (err: any) {
    console.error('❌ 会員登録失敗:', err.response?.data || err.message)
    throw err
  }
}
