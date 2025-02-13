// API 基础配置
const API_BASE_URL = 'https://api.example.com'; // TODO: 替换为实际的 API 地址

// 处理 API 响应
async function handleResponse(response) {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || '请求失败');
    }
    return data;
}

// 登录
export async function login(phone, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, password }),
    });
    return handleResponse(response);
}

// 注册
export async function register(phone, password, verifyCode) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, password, verifyCode }),
    });
    return handleResponse(response);
}

// 发送验证码
export async function sendVerifyCode(phone, type = 'register') {
    const response = await fetch(`${API_BASE_URL}/auth/send-code`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, type }),
    });
    return handleResponse(response);
}

// 验证验证码
export async function verifyCode(phone, code) {
    const response = await fetch(`${API_BASE_URL}/auth/verify-code`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, code }),
    });
    return handleResponse(response);
}

// 重置密码
export async function resetPassword(phone, newPassword, verifyCode) {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, newPassword, verifyCode }),
    });
    return handleResponse(response);
}

// 检查登录状态
export async function checkLoginStatus() {
    const response = await fetch(`${API_BASE_URL}/auth/status`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return handleResponse(response);
}

// 退出登录
export async function logout() {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    localStorage.removeItem('token');
    return handleResponse(response);
} 