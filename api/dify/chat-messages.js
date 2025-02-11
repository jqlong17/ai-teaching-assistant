// Dify API 代理服务器
export default async function handler(req, res) {
    // 只允许 POST 请求
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }

    try {
        // 从环境变量获取 API key
        const { DIFY_API_KEY } = process.env;
        
        if (!DIFY_API_KEY) {
            throw new Error('DIFY_API_KEY not configured');
        }

        // 转发请求到 Dify API
        const response = await fetch('https://api.dify.ai/v1/chat-messages', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${DIFY_API_KEY}`,
                'Content-Type': 'application/json',
                'Accept': 'text/event-stream'
            },
            body: JSON.stringify(req.body)
        });

        // 设置响应头
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        // 流式转发响应
        const reader = response.body.getReader();
        const encoder = new TextEncoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            // 转发数据块
            const chunk = encoder.encode(value);
            res.write(chunk);
        }

        res.end();
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
} 