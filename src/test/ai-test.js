import { callDeepseekAPI, callZhipuAPI, handleStream } from '../utils/ai.js';

// 测试 Deepseek API 的基本调用
async function testDeepseekBasic() {
    console.log('测试 Deepseek API 基本调用...');
    try {
        const response = await callDeepseekAPI([
            { role: 'user', content: '你是一位数学老师，请用简短的话介绍一下自己' }
        ]);
        console.log('Deepseek 响应:', response);
        return true;
    } catch (error) {
        console.error('Deepseek 基本调用测试失败:', error);
        return false;
    }
}

// 测试 Deepseek API 的流式调用
async function testDeepseekStream() {
    console.log('测试 Deepseek API 流式调用...');
    try {
        const response = await callDeepseekAPI([
            { role: 'user', content: '请用简短的话描述一下二次函数的性质' }
        ], { stream: true });

        console.log('开始接收流式响应...');
        for await (const chunk of handleStream(response)) {
            console.log('收到数据块:', chunk);
        }
        console.log('流式响应接收完成');
        return true;
    } catch (error) {
        console.error('Deepseek 流式调用测试失败:', error);
        return false;
    }
}

// 测试 Zhipu API 的基本调用
async function testZhipuBasic() {
    console.log('测试智谱 API 基本调用...');
    try {
        const response = await callZhipuAPI([
            { role: 'user', content: '你是一位数学老师，请用简短的话介绍一下自己' }
        ]);
        console.log('智谱响应:', response);
        return true;
    } catch (error) {
        console.error('智谱基本调用测试失败:', error);
        return false;
    }
}

// 测试 Zhipu API 的流式调用
async function testZhipuStream() {
    console.log('测试智谱 API 流式调用...');
    try {
        const response = await callZhipuAPI([
            { role: 'user', content: '请用简短的话描述一下二次函数的性质' }
        ], { stream: true });

        console.log('开始接收流式响应...');
        for await (const chunk of handleStream(response)) {
            console.log('收到数据块:', chunk);
        }
        console.log('流式响应接收完成');
        return true;
    } catch (error) {
        console.error('智谱流式调用测试失败:', error);
        return false;
    }
}

// 测试多轮对话
async function testConversation() {
    console.log('测试多轮对话...');
    try {
        const messages = [
            { role: 'user', content: '你是一位数学老师' },
            { role: 'assistant', content: '好的，我是一位专注于数学教育的老师。' },
            { role: 'user', content: '请设计一道关于二次函数的题目' }
        ];

        const response = await callDeepseekAPI(messages);
        console.log('多轮对话响应:', response);
        return true;
    } catch (error) {
        console.error('多轮对话测试失败:', error);
        return false;
    }
}

// 运行所有测试
async function runAllTests() {
    console.log('开始运行所有测试...\n');

    const tests = [
        { name: 'Deepseek 基本调用', fn: testDeepseekBasic },
        { name: 'Deepseek 流式调用', fn: testDeepseekStream },
        { name: 'Zhipu 基本调用', fn: testZhipuBasic },
        { name: 'Zhipu 流式调用', fn: testZhipuStream },
        { name: '多轮对话', fn: testConversation }
    ];

    const results = [];
    for (const test of tests) {
        console.log(`\n运行测试: ${test.name}`);
        console.log('-'.repeat(50));
        
        const startTime = Date.now();
        const success = await test.fn();
        const duration = Date.now() - startTime;

        results.push({
            name: test.name,
            success,
            duration
        });

        console.log('-'.repeat(50));
        console.log(`测试完成: ${test.name}`);
        console.log(`耗时: ${duration}ms`);
        console.log(`结果: ${success ? '通过' : '失败'}\n`);
    }

    // 打印测试总结
    console.log('\n测试总结');
    console.log('='.repeat(50));
    results.forEach(result => {
        console.log(`${result.name}: ${result.success ? '✅ 通过' : '❌ 失败'} (${result.duration}ms)`);
    });

    const successCount = results.filter(r => r.success).length;
    console.log('='.repeat(50));
    console.log(`总计: ${results.length} 个测试`);
    console.log(`通过: ${successCount} 个`);
    console.log(`失败: ${results.length - successCount} 个`);
}

// 运行测试
runAllTests().catch(error => {
    console.error('测试运行出错:', error);
}); 