// CM 大佬风格：多优选 IP 兼容版
let userID = 'ad806487-1267-4ef3-b0e6-817e089d7b40'; 
// 专家级优选池：内置多个顶级域名，防止单点崩溃
let proxyIPs = ['icook.tw', 'skk.moe', 'visa.com', 'itunes.apple.com', 'www.visa.com.sg'];
let proxyIP = proxyIPs[Math.floor(Math.random() * proxyIPs.length)];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = request.headers.get('Host');
    // 自动适配环境变量：如果你在 CF 后台设置了 UUID，则优先使用后台的
    userID = env.UUID || userID;
    proxyIP = env.PROXYIP || proxyIP;

    if (url.pathname.includes(userID)) {
      const userAgent = request.headers.get('User-Agent')?.toLowerCase();
      const vlessNode = `vless://${userID}@${host}:443?encryption=none&security=tls&sni=${host}&fp=random&type=ws&host=${host}&path=%2F%3Fed%3D2048#CM_Expert_Node`;
      
      // 真正的订阅逻辑：支持 Base64
      if (url.searchParams.has('sub') || userAgent.includes('shadowrocket')) {
        return new Response(btoa(vlessNode), { status: 200 });
      }

      // 高级管理面板
      return new Response(`
        <html>
          <head><meta name="viewport" content="width=device-width, initial-scale=1"></head>
          <body style="font-family:sans-serif; background:#f0f2f5; padding:20px;">
            <div style="max-width:500px; margin:auto; background:#fff; border-radius:10px; padding:20px; box-shadow:0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color:#1a73e8;">CM 风格全功能面板</h2>
              <hr>
              <p><b>订阅链接 (Shadowrocket专用):</b></p>
              <textarea style="width:100%; height:80px; border:1px solid #ddd; padding:10px;">https://${host}/${userID}?sub=1</textarea>
              <p><b>当前优选节点:</b> <span style="color:green;">${proxyIP}</span></p>
              <p style="font-size:12px; color:#666;">提示：如需极速体验，请在 Cloudflare 后台添加自定义域名。</p>
            </div>
          </body>
        </html>`, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    }
    return new Response('Not Found', { status: 404 });
  }
};
