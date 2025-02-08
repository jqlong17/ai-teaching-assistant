// Dify API 配置
const DIFY_API_URL = 'https://api.dify.ai/v1';
const DIFY_API_KEY = ''; // 需要填入您的API KEY

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
                conversation_id: null, // 新对话
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

// 发送消息
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
                    expert: expert.name
                },
                query: message,
                response_mode: 'streaming',
                user: 'user'
            })
        });
        
        if (!response.ok) {
            throw new Error('发送消息失败');
        }
        
        // 返回响应的 ReadableStream
        return response.body;
    } catch (error) {
        console.error('发送消息失败:', error);
        throw error;
    }
}

// 导出API函数
window.api = {
    createConversation,
    sendMessage
}; 