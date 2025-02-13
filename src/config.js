// 配置对象
const config = {
    // 是否使用演示模式（根据URL判断）
    isDemoMode: window.location.hostname.includes('vercel.app'),
    
    // API代理服务器地址
    proxyEndpoint: window.location.hostname.includes('vercel.app')
        ? 'https://ai-teaching-assistant-three.vercel.app/api'
        : '',
    
    deepseek: {
        apiKey: '',  // 从环境变量中获取
        endpoint: 'https://api.deepseek.com/v1',
        defaultModel: 'deepseek-chat'
    },
    zhipu: {
        apiKey: '',  // 从环境变量中获取
        endpoint: 'https://open.bigmodel.cn/api/paas/v3/model-api',
        defaultModel: 'chatglm_turbo'
    },
    dify: {
        apiKey: '',  // 从环境变量中获取
        endpoint: 'https://api.dify.ai/v1'
    }
};

// 验证配置
function validateConfig() {
    // 生产环境使用代理服务器，不需要验证API keys
    if (config.isDemoMode) {
        return;
    }
    
    if (!config.deepseek.apiKey) {
        console.warn('警告: Deepseek API key 未设置');
    }
    if (!config.zhipu.apiKey) {
        console.warn('警告: 智谱 API key 未设置');
    }
    if (!config.dify.apiKey) {
        console.warn('警告: Dify API key 未设置');
    }
}

// 初始化时验证配置
validateConfig();

// 设置为全局对象
window.config = config; 