// pages/api/count.js

import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: 'https://amused-walleye-31373.upstash.io',
  token: 'AXqNASQgMWZmMTdjYTEtNTJjYi00MDczLWJmZDctNjFjZGUyOTA0ZjEyNjcyMTI0NDM2MDBjNDVmZmE5NjJlMTllYTkyMDI2MDU=',
});

export default async function handler(req, res) {
  try {
    // Fetch the count from Redis
    const count = await redis.get('count'); // Adjust the key as needed

    if (count === null) {
      return res.status(404).json({ error: 'Count not found' });
    }

    // Respond with the count
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching count from Redis:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


