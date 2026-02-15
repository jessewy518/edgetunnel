// 专家增强版：换成更稳的 skk.moe
let userID = 'ad806487-1267-4ef3-b0e6-817e089d7b40'; 
// 换成这个深度优化的域名
let proxyIP = 'skk.moe'; 

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = request.headers.get('Host');
    const userAgent = request.headers.get('User-Agent')?.toLowerCase();

    if (url.pathname.includes(userID)) {
      const vlessNode = `vless://${userID}@${host}:443?encryption=none&security=tls&sni=${host}&fp=random&type=ws&host=${host}&path=%2F%3Fed%3D2048#Gemini_Skk_Node`;
      
      // 自动识别小火箭，返回 Base64 订阅内容
      if (url.searchParams.has('sub') || userAgent.includes('shadowrocket')) {
        return new Response(btoa(vlessNode), { status: 200 });
      }

      // 浏览器访问显示管理面板
      const subLink = `https://${host}/${userID}?sub=1`;
      return new Response(`
        <html>
          <body style="font-family:sans-serif;padding:30px;background:#f4f7f9;">
            <div style="max-width:600px;margin:0 auto;background:#fff;padding:20px;border-radius:15px;">
              <h2>🚀 深度优化节点已就绪</h2>
              <p><b>订阅链接（填入小火箭）：</b></p>
              <div style="background:#eee;padding:10px;word-break:break-all;">${subLink}</div>
              <p>当前优选：<span style="color:blue;">${proxyIP}</span></p>
            </div>
          </body>
        </html>`, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    }
    return new Response('Not Found', { status: 404 });
  }
};
