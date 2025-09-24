// 运行时环境配置（生产可直接修改此文件，无需重构）
// 注意：此文件在浏览器中可见，仅在“明确接受暴露”的场景下使用。
// 如果不希望暴露，请将 Key 放到服务端代理或反向代理中间层。

window.ENV = Object.assign({}, window.ENV, {
  // DeepSeek API Key（用户明确表示不怕暴露时可直接配置在此）
  DEEPSEEK_API_KEY: 'sk-00bd991d61df441f94ca24a0ed2c4abd',
  // DeepSeek API Base：生产未配置本地代理时直连官方域名
  // 例如：'https://api.deepseek.com' 或您自建的网关地址
  DEEPSEEK_API_BASE: 'https://api.deepseek.com'
});


