/**
 * Vercel API Route for Weather Data
 * This serverless function acts as a proxy to WeatherAPI.com
 * and keeps the API key secure on the server side
 */

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get the API key from environment variables (server-side only)
  const API_KEY = process.env.WEATHER_API_KEY;
  
  if (!API_KEY) {
    return res.status(500).json({ error: 'Weather API key not configured' });
  }

  const { endpoint, ...params } = req.query;

  // Validate required parameters
  if (!endpoint) {
    return res.status(400).json({ error: 'Endpoint parameter is required' });
  }

  // Define allowed endpoints for security
  const allowedEndpoints = {
    'current': '/current.json',
    'forecast': '/forecast.json',
    'search': '/search.json'
  };

  if (!allowedEndpoints[endpoint]) {
    return res.status(400).json({ error: 'Invalid endpoint' });
  }

  try {
    // Build the external API URL
    const baseUrl = 'https://api.weatherapi.com/v1';
    const url = new URL(baseUrl + allowedEndpoints[endpoint]);
    
    // Add API key
    url.searchParams.append('key', API_KEY);
    
    // Add other parameters from the request
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });

    // Make the request to WeatherAPI
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        error: errorData.error?.message || 'Weather API request failed',
        code: errorData.error?.code || response.status
      });
    }

    const data = await response.json();
    
    // Set cache headers to improve performance
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
    
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Weather API proxy error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
