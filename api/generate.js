export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const key = process.env.GEMINI_API_KEY;
  
  if (!key) {
    return res.status(200).json({ text: 'KEY为空' });
  }
  
  return res.status(200).json({ text: 'KEY存在，长度：' + key.length });
}
