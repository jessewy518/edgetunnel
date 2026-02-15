// edgetunnel 核心代码
let userID = 'ad806487-1267-4ef3-b0e6-817e089d7b40'; 
let proxyIP = 'cdn.cloudflare.net'; 

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.includes(userID)) {
      return new Response("节点已激活！", { status: 200 });
    }
    return new Response('Not Found', { status: 404 });
  }
};
