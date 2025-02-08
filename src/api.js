// Dify API 配置
const DIFY_API_URL = 'https://api.dify.ai/v1';
const DIFY_API_KEY = 'app-l3SdhDG6QxQCYYlvMGMVbBpc';

// 创建对话
async function createConversation() {
    try {
        const response = await fetch(`${DIFY_API_URL}/chat-messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${DIFY_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                conversation_id: null,
                inputs: {},
                query: '',
                response_mode: 'streaming',
                user: 'user'
            })
        });
        
        if (!response.ok) {
            throw new Error('创建对话失败');
        }
        
        const data = await response.json();
        return data.conversation_id;
    } catch (error) {
        console.error('创建对话失败:', error);
        throw error;
    }
}

// 发送消息并获取流式响应
async function sendMessage(conversationId, message, expert) {
    try {
        const response = await fetch(`${DIFY_API_URL}/chat-messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${DIFY_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                conversation_id: conversationId,
                inputs: {
                    expert: expert.name,
                    role: expert.id,
                    background: `您是一位${expert.description}。请用专业、友善的语气回答问题。`
                },
                query: message,
                response_mode: 'streaming',
                user: 'user'
            })
        });
        
        if (!response.ok) {
            throw new Error('发送消息失败');
        }
        
        return response.body;
    } catch (error) {
        console.error('发送消息失败:', error);
        throw error;
    }
}

// 处理流式响应
async function* handleStream(stream) {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');
            
            for (const line of lines) {
                if (line.trim() === '') continue;
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') return;
                    try {
                        const parsed = JSON.parse(data);
                        yield parsed;
                    } catch (e) {
                        console.error('解析响应数据失败:', e);
                    }
                }
            }
        }
    } finally {
        reader.releaseLock();
    }
}

// 获取对话历史
async function getConversationHistory(conversationId) {
    try {
        const response = await fetch(`${DIFY_API_URL}/messages?conversation_id=${conversationId}`, {
            headers: {
                'Authorization': `Bearer ${DIFY_API_KEY}`
            }
        });
        
        if (!response.ok) {
            throw new Error('获取对话历史失败');
        }
        
        const data = await response.json();
        return data.messages;
    } catch (error) {
        console.error('获取对话历史失败:', error);
        throw error;
    }
}

// 导出API函数
window.api = {
    createConversation,
    sendMessage,
    handleStream,
    getConversationHistory
}; 