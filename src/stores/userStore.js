// src/stores/userStore.ts
import { reactive, readonly } from 'vue';
const STORAGE_KEY = 'membership_app_users';
const AUTH_KEY = 'membership_app_auth'; // 保持しておくためのキー（ログイン中のuser id）
function loadUsers() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    }
    catch {
        return [];
    }
}
function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}
function loadAuth(users) {
    try {
        const id = localStorage.getItem(AUTH_KEY);
        if (!id)
            return null;
        return users.find(u => u.id === id) ?? null;
    }
    catch {
        return null;
    }
}
const state = reactive({
    users: loadUsers(),
    currentUser: null,
});
// 初期化して currentUser を復元
state.currentUser = loadAuth(state.users);
// ユーティリティ
function generateId() {
    return 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
function generateMemberCode() {
    // M + ランダム6桁（表示用途）
    const num = Math.floor(Math.random() * 900000) + 100000;
    return 'M' + String(num);
}
// API-like functions
export function registerUser(payload) {
    const { name, email, password } = payload;
    if (!name || !email || !password)
        return { ok: false, error: '必須項目を入力してください' };
    // 既存メールチェック
    if (state.users.find(u => u.email === email)) {
        return { ok: false, error: 'そのメールアドレスは既に登録されています' };
    }
    const user = {
        id: generateId(),
        name,
        email,
        password, // デモ: 平文保存（本番はハッシュ必須）
        memberCode: generateMemberCode(),
    };
    state.users.push(user);
    saveUsers(state.users);
    return { ok: true, user };
}
export function login(email, password) {
    const u = state.users.find(x => x.email === email && x.password === password);
    if (!u)
        return { ok: false, error: 'メールアドレスかパスワードが違います' };
    state.currentUser = u;
    localStorage.setItem(AUTH_KEY, u.id);
    return { ok: true, user: u };
}
export function logout() {
    state.currentUser = null;
    localStorage.removeItem(AUTH_KEY);
}
export function getCurrentUser() {
    return state.currentUser;
}
export function isAuthenticated() {
    return state.currentUser !== null;
}
export default readonly(state);
