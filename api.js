// Dify API 配置
const DIFY_API_URL = config.isDemoMode ? `${config.proxyEndpoint}/dify` : 'https://api.dify.ai/v1';
const DIFY_API_KEY = config.dify?.apiKey || '';

// ... rest of the code ... 