// src/callback.ts

/**
 * スマレジのOAuth認可後にリダイレクトされてくるとここが呼ばれる
 * ?code=xxxx がURLに含まれているので、それを取り出してログ表示するだけのサンプル
 */

export function handleSmaregiCallback(url: string) {
  const parsedUrl = new URL(url)
  const code = parsedUrl.searchParams.get('code')

  if (code) {
    console.log('スマレジの認可コード:', code)
    // ここでCloudflare Workerにfetchなどで送ることもできる（後で追加）
  } else {
    console.log('認可コードが含まれていません')
  }
}
