export default async function handler(req, res) {
  try {
    const app = (await import('../backend/server.js')).default;
    return app(req, res);
  } catch (error) {
    console.error('Error in serverless handler:', error);
    res.status(500).json({ 
      error: 'Serverless Function Error', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
