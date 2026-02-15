// 核心配置：只需修改这两个变量
let userID = 'ad806487-1267-4ef3-b0e6-817e089d7b40'; 
// 专家推荐：icook.tw 是目前公认的顶级优选域名，无需手动测速
let proxyIP = 'icook.tw'; 

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = request.headers.get('Host');
    const userAgent = request.headers.get('User-Agent')?.toLowerCase();

    // 只有访问你的 UUID 路径才会触发
    if (url.pathname.includes(userID)) {
      // 节点配置信息
      const vlessNode = `vless://${userID}@${host}:443?encryption=none&security=tls&sni=${host}&fp=random&type=ws&host=${host}&path=%2F%3Fed%3D2048#Gemini_Expert_Node`;
      
      // 自动识别小火箭/v2rayNG，返回 Base64 订阅内容
      if (url.searchParams.has('sub') || userAgent.includes('shadowrocket') || userAgent.includes('v2ray')) {
        return new Response(btoa(vlessNode), { status: 200 });
      }

      // 普通浏览器访问，显示管理面板
      const subLink = `https://${host}/${userID}?sub=1`;
      return new Response(`
        <html>
          <head><meta charset="utf-8"><title>Expert Panel</title></head>
          <body style="font-family:sans-serif;padding:30px;line-height:1.8;background:#f4f7f9;">
            <div style="max-width:600px;margin:0 auto;background:#fff;padding:20px;border-radius:15px;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
              <h2 style="color:#2c3e50;">🚀 顶级专家节点已就绪</h2>
              <p><b>1. 自动更新订阅链接：</b></p>
              <div style="background:#f0f0f0;padding:10px;word-break:break-all;border-radius:5px;border:1px solid #ddd;">${subLink}</div>
              <p style="font-size:14px;color:#e74c3c;">* 在小火箭中选择“类型：Subscribe”并填入此链接，即可实现一键更新！</p>
              <hr>
              <p><b>2. 当前优选地址：</b> <span style="color:#27ae60;">${proxyIP}</span></p>
              <p style="font-size:14px;color:#7f8c8d;">提示：若需更换更猛的 IP，直接在 GitHub 修改代码中的 proxyIP 变量即可，软件端点更新立即可见。</p>
            </div>
          </body>
        </html>`, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    }
    return new Response('Not Found', { status: 404 });
  }
};
