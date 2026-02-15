// 核心面板代码（带 UUID 自动匹配）
let userID = 'ad806487-1267-4ef3-b0e6-817e089d7b40'; 
let proxyIP = 'cdn.cloudflare.net'; 

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = request.headers.get('Host');
    // 如果访问 UUID 路径，返回 CM 大佬风格的节点配置
    if (url.pathname.includes(userID)) {
      const vless = `vless://${userID}@${host}:443?encryption=none&security=tls&sni=${host}&fp=random&type=ws&host=${host}&path=%2F%3Fed%3D2048#Cloudflare_Node`;
      return new Response(`
      <html>
      <body style="font-family:sans-serif;padding:20px;line-height:1.6;">
        <h2 style="color:#f60;">恭喜！你的专属节点已成功上线</h2>
        <p><b>您的 VLESS 节点链接：</b></p>
        <textarea style="width:100%;height:100px;word-break:break-all;">${vless}</textarea>
        <p style="margin-top:20px;color:#666;">复制上方内容，直接导入小火箭(Shadowrocket)或 v2rayNG 即可使用。</p>
        <hr>
        <p>项目作者：cmliu | 部署助手：Gemini</p>
      </body>
      </html>`, { headers: { "Content-Type": "text/html;charset=UTF-8" } });
    }
    return new Response('Not Found', { status: 404 });
  }
};
