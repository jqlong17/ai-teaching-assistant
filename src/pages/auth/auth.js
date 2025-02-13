class Auth {
    constructor() {
        this.container = null;
        this.currentView = 'login'; // login, register, verify, reset
        this.phone = '';
        this.verifyCode = '';
        this.password = '';
        this.isLoading = false;
        this.countdownTimer = null;
        this.countdown = 0;
    }

    async init() {
        this.container = document.createElement('div');
        this.container.className = 'auth-container';
        await this.renderView();
        return this.container;
    }

    async renderView() {
        switch (this.currentView) {
            case 'login':
                this.container.innerHTML = this.getLoginTemplate();
                break;
            case 'register':
                this.container.innerHTML = this.getRegisterTemplate();
                break;
            case 'verify':
                this.container.innerHTML = this.getVerifyTemplate();
                break;
            case 'reset':
                this.container.innerHTML = this.getResetTemplate();
                break;
        }
        this.bindEvents();
    }

    getLoginTemplate() {
        return `
            <div class="auth-card">
                <h2 class="auth-title">登录</h2>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="phone">手机号</label>
                        <input type="tel" id="phone" placeholder="请输入手机号" required>
                    </div>
                    <div class="form-group">
                        <label for="password">密码</label>
                        <input type="password" id="password" placeholder="请输入密码" required>
                    </div>
                    <button type="submit" class="submit-btn">登录</button>
                </form>
                <div class="auth-footer">
                    <span>还没有账号？</span>
                    <a href="#" class="switch-view" data-view="register">立即注册</a>
                    <span class="separator">|</span>
                    <a href="#" class="switch-view" data-view="reset">忘记密码</a>
                </div>
            </div>
        `;
    }

    getRegisterTemplate() {
        return `
            <div class="auth-card">
                <h2 class="auth-title">注册</h2>
                <form id="registerForm">
                    <div class="form-group">
                        <label for="phone">手机号</label>
                        <input type="tel" id="phone" placeholder="请输入手机号" required>
                    </div>
                    <div class="form-group">
                        <label for="verifyCode">验证码</label>
                        <div class="verify-code-group">
                            <input type="text" id="verifyCode" placeholder="请输入验证码" required>
                            <button type="button" id="sendCode">获取验证码</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password">设置密码</label>
                        <input type="password" id="password" placeholder="请设置密码" required>
                    </div>
                    <button type="submit" class="submit-btn">注册</button>
                </form>
                <div class="auth-footer">
                    <span>已有账号？</span>
                    <a href="#" class="switch-view" data-view="login">立即登录</a>
                </div>
            </div>
        `;
    }

    getVerifyTemplate() {
        return `
            <div class="auth-card">
                <h2 class="auth-title">手机验证</h2>
                <form id="verifyForm">
                    <div class="form-group">
                        <label for="verifyCode">验证码</label>
                        <div class="verify-code-group">
                            <input type="text" id="verifyCode" placeholder="请输入验证码" required>
                            <button type="button" id="sendCode">重新获取</button>
                        </div>
                    </div>
                    <button type="submit" class="submit-btn">验证</button>
                </form>
            </div>
        `;
    }

    getResetTemplate() {
        return `
            <div class="auth-card">
                <h2 class="auth-title">重置密码</h2>
                <form id="resetForm">
                    <div class="form-group">
                        <label for="phone">手机号</label>
                        <input type="tel" id="phone" placeholder="请输入手机号" required>
                    </div>
                    <div class="form-group">
                        <label for="verifyCode">验证码</label>
                        <div class="verify-code-group">
                            <input type="text" id="verifyCode" placeholder="请输入验证码" required>
                            <button type="button" id="sendCode">获取验证码</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="newPassword">新密码</label>
                        <input type="password" id="newPassword" placeholder="请设置新密码" required>
                    </div>
                    <button type="submit" class="submit-btn">重置密码</button>
                </form>
                <div class="auth-footer">
                    <a href="#" class="switch-view" data-view="login">返回登录</a>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // 切换视图事件
        const switchButtons = this.container.querySelectorAll('.switch-view');
        switchButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.currentView = button.dataset.view;
                this.renderView();
            });
        });

        // 表单提交事件
        const form = this.container.querySelector('form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                if (this.isLoading) return;

                const formData = new FormData(form);
                await this.handleSubmit(formData);
            });
        }

        // 发送验证码事件
        const sendCodeButton = this.container.querySelector('#sendCode');
        if (sendCodeButton) {
            sendCodeButton.addEventListener('click', async () => {
                if (this.isLoading) return;
                await this.handleSendCode();
            });
        }
    }

    async handleSubmit(formData) {
        this.isLoading = true;
        const submitButton = this.container.querySelector('.submit-btn');
        submitButton.classList.add('loading');

        try {
            // 表单验证
            const rules = window.Validator.getRules(this.currentView);
            const { isValid, errors } = window.Validator.validateForm(formData, rules);
            
            if (!isValid) {
                const firstError = Object.values(errors)[0];
                throw new Error(firstError);
            }

            // 获取表单数据
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // 处理表单提交
            switch (this.currentView) {
                case 'login':
                    await this.handleLogin(data);
                    break;
                case 'register':
                    await this.handleRegister(data);
                    break;
                case 'verify':
                    await this.handleVerify(data);
                    break;
                case 'reset':
                    await this.handleReset(data);
                    break;
            }
        } catch (error) {
            console.error('提交失败:', error);
            this.showError(error.message);
        } finally {
            this.isLoading = false;
            submitButton.classList.remove('loading');
        }
    }

    async handleLogin(data) {
        const { phone, password } = data;
        // 临时模拟登录成功
        console.log('登录:', { phone, password });
        localStorage.setItem('token', 'mock_token');
        window.location.hash = '/my';
    }

    async handleRegister(data) {
        const { phone, password, verifyCode } = data;
        // 临时模拟注册成功
        console.log('注册:', { phone, password, verifyCode });
        localStorage.setItem('token', 'mock_token');
        window.location.hash = '/my';
    }

    async handleVerify(data) {
        const { verifyCode } = data;
        // 临时模拟验证成功
        console.log('验证:', { phone: this.phone, verifyCode });
        if (this.verifyScene === 'register') {
            this.currentView = 'register';
        } else if (this.verifyScene === 'reset') {
            this.currentView = 'reset';
        }
        this.renderView();
    }

    async handleReset(data) {
        const { phone, newPassword, verifyCode } = data;
        // 临时模拟重置密码成功
        console.log('重置密码:', { phone, newPassword, verifyCode });
        this.currentView = 'login';
        this.renderView();
        this.showSuccess('密码重置成功，请登录');
    }

    async handleSendCode() {
        if (this.countdown > 0) return;

        const phoneInput = this.container.querySelector('#phone');
        const phone = phoneInput.value;

        // 验证手机号
        if (!window.Validator.isValidPhone(phone)) {
            this.showError('请输入正确的手机号');
            return;
        }

        const sendCodeButton = this.container.querySelector('#sendCode');
        try {
            sendCodeButton.disabled = true;
            // 临时模拟发送验证码
            console.log('发送验证码到:', phone);
            
            // 开始倒计时
            this.countdown = 60;
            this.updateCountdown(sendCodeButton);
            
            this.countdownTimer = setInterval(() => {
                this.countdown--;
                this.updateCountdown(sendCodeButton);
                
                if (this.countdown <= 0) {
                    clearInterval(this.countdownTimer);
                    sendCodeButton.disabled = false;
                    sendCodeButton.textContent = '获取验证码';
                }
            }, 1000);
            
        } catch (error) {
            console.error('发送验证码失败:', error);
            this.showError(error.message);
            sendCodeButton.disabled = false;
        }
    }

    updateCountdown(button) {
        button.textContent = `重新发送(${this.countdown}s)`;
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;

        const form = this.container.querySelector('form');
        form.insertBefore(errorDiv, form.firstChild);

        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;

        const form = this.container.querySelector('form');
        form.insertBefore(successDiv, form.firstChild);

        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
}

// 创建全局对象
window.auth = {
    render: function() {
        console.log('开始渲染认证页面');
        const container = document.getElementById('page-container');
        if (!container) {
            console.error('找不到页面容器元素');
            return;
        }
        
        // 清空容器
        container.innerHTML = '';
        
        // 初始化页面
        const page = new Auth();
        page.init().then(content => {
            container.appendChild(content);
            console.log('认证页面初始化完成');
        }).catch(error => {
            console.error('初始化失败:', error);
            container.innerHTML = '<div class="error-message">页面加载失败，请刷新重试</div>';
        });
    }
};

// 路由处理
window.addEventListener('hashchange', () => {
    const hash = location.hash.slice(1);
    if (hash === '/auth') {
        window.auth.render();
    }
}); 