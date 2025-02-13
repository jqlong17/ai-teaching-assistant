// API 配置
const DIFY_API_URL = window.config?.isDemoMode ? `${window.config?.proxyEndpoint}/dify` : 'https://api.dify.ai/v1';
const DIFY_API_KEY = window.config?.dify?.apiKey || '';

// API 函数
const api = {
    // 创建对话
    async createConversation() {
        console.log('开始创建对话...');
        try {
            // 直接返回空字符串，因为 Dify API 不需要预先创建对话
            return '';
        } catch (error) {
            console.error('创建对话发生异常:', error);
            throw error;
        }
    },

    // 发送消息并获取流式响应
    async sendMessage(conversationId, message, expert) {
        console.log('开始发送消息...', {conversationId, message, expert: expert.id});
        try {
            const requestBody = {
                inputs: {
                    role: expert.id,
                    background: `您是一位${expert.description}。请用专业、友善的语气回答问题。`,
                    greeting: expert.greeting
                },
                query: message,
                user: 'user',
                response_mode: 'streaming',
                conversation_id: conversationId || undefined
            };
            
            console.log('发送消息请求体:', requestBody);
            
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'text/event-stream'
            };

            // 只在开发环境添加 API key
            if (!window.config?.isDemoMode) {
                headers['Authorization'] = `Bearer ${DIFY_API_KEY}`;
            }
            
            const response = await fetch(`${DIFY_API_URL}/chat-messages`, {
                method: 'POST',
                headers,
                body: JSON.stringify(requestBody)
            });
            
            console.log('发送消息响应状态:', response.status);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('发送消息失败，API错误:', errorData);
                throw new Error(errorData.message || `HTTP错误 ${response.status}`);
            }
            
            return response.body;
        } catch (error) {
            console.error('发送消息发生异常:', error);
            throw error;
        }
    },

    // 处理流式响应
    async* handleStream(stream) {
        console.log('开始处理流式响应...');
        const reader = stream.getReader();
        const decoder = new TextDecoder();
        
        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    console.log('流式响应结束');
                    break;
                }
                
                const chunk = decoder.decode(value);
                console.log('收到数据块:', chunk);
                
                const lines = chunk.split('\n');
                for (const line of lines) {
                    if (line.trim() === '') continue;
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') {
                            console.log('收到结束标记');
                            return;
                        }
                        try {
                            const parsed = JSON.parse(data);
                            console.log('解析的消息:', parsed);
                            yield {
                                event: 'message',
                                message: parsed.answer || parsed.message || ''
                            };
                        } catch (e) {
                            console.error('解析响应数据失败:', e, '原始数据:', data);
                        }
                    }
                }
            }
        } finally {
            reader.releaseLock();
            console.log('释放流读取器');
        }
    },

    // 获取对话历史
    async getConversationHistory(conversationId) {
        try {
            const response = await fetch(`${DIFY_API_URL}/messages?conversation_id=${conversationId}`, {
                headers: {
                    'Authorization': `Bearer ${DIFY_API_KEY}`
                }
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error('API错误:', errorData);
                throw new Error(errorData.message || '获取对话历史失败');
            }
            
            const data = await response.json();
            return data.messages;
        } catch (error) {
            console.error('获取对话历史失败:', error);
            throw error;
        }
    }
};

// 设置为全局对象
window.api = api; 