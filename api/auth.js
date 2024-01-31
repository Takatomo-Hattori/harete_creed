module.exports = (req, res) => {
    const auth = req.headers.authorization;
  
    // 環境変数からユーザー名とパスワードを取得
    const user = process.env.BASIC_AUTH_USER;
    const password = process.env.BASIC_AUTH_PASSWORD;
  
    // 認証情報をエンコード
    const base64Credentials = Buffer.from(`${user}:${password}`).toString('base64');
  
    // 認証ヘッダーが存在し、正しいか確認
    if (!auth || auth !== `Basic ${base64Credentials}`) {
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', 'Basic realm="My Realm"');
      res.end('Access denied');
      return;
    }
  
    res.statusCode = 200;
    res.end('Access granted');
  };