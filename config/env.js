module.exports = {
    "development": {
        db: process.env.MONGODB_URI ||  'mongodb://localhost:27017/blog',
        secretToken: process.env.SECRET_TOKEN || 'secretToken',
        env: 'development',
       facebookAuth: {
            clientID: '123456', // your App ID
            clientSecret: 'abc123', // your App Secret
            callbackURL: 'http://127.0.0.1:3000/auth/facebook?cb'
        }
    },
    "production": {
        db: process.env.MONGODB_URI ||  'mongodb://localhost:27017/blog',
        secretToken: process.env.SECRET_TOKEN || 'secretToken',
        env: 'production',
        facebookAuth: {
            clientID: process.env.FACEBOOK_ID, // your App ID
            clientSecret: process.env.FACEBOOK_SECRET, // your App Secret
            callbackURL: process.env.FACEBOOK_CALLBACK
        }
    }
}
