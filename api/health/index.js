// Health check endpoint - verifies API is running
export default async function (context, req) {
  context.res = {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }
  };
}
