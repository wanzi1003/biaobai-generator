export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { name, traits, memory, style } = req.body;
  const prompt = `请帮我写一段${style}风格的表白文案。对象名字：${name}。ta的特点：${traits}。我们之间的小事：${memory || '暂无'}。要求：真诚自然，200字左右，不要太浮夸，像一个真实的人在说话。`;
  try {
    const response = await fetch(
      'https://api.siliconflow.cn/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SILICONFLOW_API_KEY}`
        },
        body: JSON.stringify({
          model: 'Qwen/Qwen2.5-7B-Instruct',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1000
        })
      }
    );
    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) return res.status(200).json({ text: '错误：' + JSON.stringify(data) });
    res.status(200).json({ text });
  } catch(e) {
    res.status(200).json({ text: '请求失败：'
