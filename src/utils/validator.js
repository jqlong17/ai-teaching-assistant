// 表单验证工具类
window.Validator = class Validator {
    // 手机号验证
    static isValidPhone(phone) {
        const phoneRegex = /^1[3-9]\d{9}$/;
        return phoneRegex.test(phone);
    }

    // 密码验证（至少8位，包含数字和字母）
    static isValidPassword(password) {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    }

    // 验证码验证（6位数字）
    static isValidVerifyCode(code) {
        const codeRegex = /^\d{6}$/;
        return codeRegex.test(code);
    }

    // 表单验证
    static validateForm(formData, rules) {
        const errors = {};
        
        for (const [field, value] of formData.entries()) {
            if (rules[field]) {
                const fieldRules = rules[field];
                
                // 必填验证
                if (fieldRules.required && !value) {
                    errors[field] = fieldRules.message || '此项不能为空';
                    continue;
                }
                
                // 正则验证
                if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
                    errors[field] = fieldRules.message || '格式不正确';
                    continue;
                }
                
                // 自定义验证
                if (fieldRules.validator && !fieldRules.validator(value)) {
                    errors[field] = fieldRules.message || '验证失败';
                    continue;
                }
            }
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

    // 获取验证规则
    static getRules(type) {
        const rules = {
            login: {
                phone: {
                    required: true,
                    validator: this.isValidPhone,
                    message: '请输入正确的手机号'
                },
                password: {
                    required: true,
                    message: '请输入密码'
                }
            },
            register: {
                phone: {
                    required: true,
                    validator: this.isValidPhone,
                    message: '请输入正确的手机号'
                },
                verifyCode: {
                    required: true,
                    validator: this.isValidVerifyCode,
                    message: '请输入6位数字验证码'
                },
                password: {
                    required: true,
                    validator: this.isValidPassword,
                    message: '密码至少8位，需包含数字和字母'
                }
            },
            reset: {
                phone: {
                    required: true,
                    validator: this.isValidPhone,
                    message: '请输入正确的手机号'
                },
                verifyCode: {
                    required: true,
                    validator: this.isValidVerifyCode,
                    message: '请输入6位数字验证码'
                },
                newPassword: {
                    required: true,
                    validator: this.isValidPassword,
                    message: '密码至少8位，需包含数字和字母'
                }
            }
        };
        
        return rules[type] || {};
    }
} 