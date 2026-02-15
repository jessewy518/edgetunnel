// 核心变量
let userID = 'ad806487-1267-4ef3-b0e6-817e089d7b40'; 
// 专家级优选池：内置多个顶级域名，防止单点崩溃
let proxyIPs = ['icook.tw', 'skk.moe', 'visa.com', 'itunes.apple.com', 'www.visa.com.sg'];
let proxyIP = proxyIPs[Math.floor(Math.random() * proxyIPs.length)];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = request.headers.get('Host');
    
    // 自动适配环境变量：如果你在 CF 后台 Variables 设了 UUID，则优先用后台的
    userID = env.UUID || userID;
    proxyIP = env.PROXYIP || proxyIP;

    if (url.pathname.includes(userID)) {
      const userAgent = request.headers.get('User-Agent')?.toLowerCase();
      // 构建标准的 VLESS 节点字符串
      const vlessNode = `vless://${userID}@${host}:443?encryption=none&security=tls&sni=${host}&fp=random&type=ws&host=${host}&path=%2F%3Fed%3D2048#Gemini_Expert_Node`;
      
      // 关键：判断是否是小火箭在拉取订阅
      if (url.searchParams.has('sub') || userAgent.includes('shadowrocket') || userAgent.includes('v2ray')) {
        // 返回 Base64 编码，解决“本地节点”无法更新的问题
        return new Response(btoa(vlessNode), { 
          status: 200, 
          headers: { "Content-Type": "text/plain;charset=utf-8" } 
        });
      }

      // 浏览器访问显示漂亮的控制面板
      return new Response(`
        <html>
          <head><meta name="viewport" content="width=device-width, initial-scale=1"></head>
          <body style="font-family:sans-serif; background:#f4f7f9; padding:20px;">
            <div style="max-width:500px; margin:auto; background:#fff; border-radius:15px; padding:25px; box-shadow:0 5px 15px rgba(0,0,0,0.1);">
              <h2 style="color:#1a73e8;">顶级专家管理面板</h2>
              <hr style="border:0; border-top:1px solid #eee;">
              <p><b>1. 订阅链接 (填入小火箭):</b></p>
              <div style="background:#f8f9fa; padding:15px; word-break:break-all; border-radius:8px; border:1px solid #ddd; font-family:monospace;">https://${host}/${userID}?sub=1</div>
              <p style="color:#666; font-size:13px;">* 复制上方链接，在小火箭添加“Subscribe”类型订阅。</p>
              <p><b>2. 当前自动分配优选:</b> <span style="color:#27ae60; font-weight:bold;">${proxyIP}</span></p>
            </div>
          </body>
        </html>`, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    }
    return new Response('Not Found', { status: 404 });
  }
};
