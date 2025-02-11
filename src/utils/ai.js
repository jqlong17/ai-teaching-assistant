import config from '../config.js';

// Deepseek API 调用
async function callDeepseekAPI(messages, options = {}) {
    const { apiKey, endpoint, defaultModel } = config.deepseek;

    if (!apiKey) {
        throw new Error('Deepseek API key not found');
    }

    const defaultOptions = {
        model: defaultModel,
        temperature: 0.7,
        max_tokens: 2000,
        top_p: 0.95,
        stream: false
    };

    const requestOptions = {
        ...defaultOptions,
        ...options
    };

    try {
        const response = await fetch(`${endpoint}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                messages,
                ...requestOptions
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        if (requestOptions.stream) {
            return response; // 返回流式响应
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Deepseek API 调用失败:', error);
        throw error;
    }
}

// 智谱 API 调用
async function callZhipuAPI(messages, options = {}) {
    const { apiKey, endpoint, defaultModel } = config.zhipu;

    if (!apiKey) {
        throw new Error('Zhipu API key not found');
    }

    const defaultOptions = {
        model: defaultModel,
        temperature: 0.7,
        top_p: 0.95,
        stream: false
    };

    const requestOptions = {
        ...defaultOptions,
        ...options
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                messages,
                ...requestOptions
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        if (requestOptions.stream) {
            return response; // 返回流式响应
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('智谱 API 调用失败:', error);
        throw error;
    }
}

// 处理流式响应的辅助函数
async function* handleStream(response) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            
            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(line => line.trim() !== '');
            
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    try {
                        const parsed = JSON.parse(data);
                        yield parsed;
                    } catch (e) {
                        console.warn('解析响应数据失败:', e);
                    }
                }
            }
        }
    } finally {
        reader.releaseLock();
    }
}

// 示例用法
async function example() {
    try {
        // 非流式调用示例
        const response1 = await callDeepseekAPI([
            { role: 'user', content: '你好，请介绍一下自己' }
        ]);
        console.log('Deepseek 响应:', response1);

        // 流式调用示例
        const streamResponse = await callDeepseekAPI([
            { role: 'user', content: '讲一个故事' }
        ], { stream: true });

        for await (const chunk of handleStream(streamResponse)) {
            console.log('收到数据块:', chunk);
        }

        // 智谱 API 调用示例
        const response2 = await callZhipuAPI([
            { role: 'user', content: '你好，请介绍一下自己' }
        ]);
        console.log('智谱响应:', response2);

    } catch (error) {
        console.error('调用示例失败:', error);
    }
}

// 导出函数
export {
    callDeepseekAPI,
    callZhipuAPI,
    handleStream
}; 