import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = dirname(dirname(__dirname));

// 手动加载环境变量
function loadEnvFile() {
    try {
        const envPath = join(process.cwd(), '.env');
        console.log('尝试加载环境变量文件:', envPath);
        const envContent = readFileSync(envPath, 'utf8');
        const envVars = {};
        
        envContent.split('\n').forEach(line => {
            line = line.trim();
            if (line && !line.startsWith('#')) {
                const [key, ...valueParts] = line.split('=');
                const value = valueParts.join('=').trim();
                if (key && value) {
                    envVars[key.trim()] = value;
                }
            }
        });
        
        console.log('环境变量加载成功');
        return envVars;
    } catch (error) {
        console.error('加载环境变量失败:', error);
        return {};
    }
}

// 加载环境变量
const envVars = loadEnvFile();

// 环境变量配置
const config = {
    // 是否使用演示模式
    isDemoMode: process.env.NODE_ENV === 'production',
    
    // API代理服务器地址（使用实际的 Vercel 部署地址）
    proxyEndpoint: process.env.NODE_ENV === 'production' 
        ? 'https://ai-teaching-assistant-three.vercel.app/api'  // 使用实际的 Vercel 域名
        : '',  // 开发环境直接调用API
    
    deepseek: {
        apiKey: envVars.DEEPSEEK_API_KEY || '',
        endpoint: envVars.DEEPSEEK_API_ENDPOINT || 'https://api.deepseek.com/v1',
        defaultModel: 'deepseek-chat'
    },
    zhipu: {
        apiKey: envVars.ZHIPU_API_KEY || '',
        endpoint: envVars.ZHIPU_API_ENDPOINT || 'https://open.bigmodel.cn/api/paas/v3/model-api',
        defaultModel: 'chatglm_turbo'
    },
    dify: {
        apiKey: envVars.DIFY_API_KEY || '',
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

export default config; 