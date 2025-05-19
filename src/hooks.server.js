// src/hooks.server.js
import mongoose from 'mongoose';
import cookie from 'cookie';
import { UserModel } from '$lib/server/db/models/user';
import connectDB from '$lib/server/db';


// // Helper function to set cookies
// function setCookie(cookies, name, value, options = {}) {
//   const serialized = cookie.serialize(name, value, { ...options, httpOnly: true, secure: process.env.NODE_ENV === 'production' });
//   cookies.set(serialized);
// }

// Hooks
export async function handle({ event, resolve }) {
  if (event.url.pathname.startsWith('/api/')) {
    try {
      await connectDB();
    } catch (error) {
      console.error('Failed to connect to MongoDB in hooks:', error);
      return new Response('Database connection error', { status: 500 });
    }
  }

  
  // Parse cookies from the request
  const cookies = cookie.parse(event.request.headers.get('cookie') || '');

  // Check if the user is authenticated via a session token
  const sessionToken = cookies.sessionToken;
  if (sessionToken) {
    try {
      const user = await UserModel.findOne({ sessionToken });
      if (user) {
        event.locals.user = { id: user._id, name: user.name, email: user.email };
      }
    } catch (err) {
      console.error('Error validating session token:', err);
    }
  }

  // Resolve the request and pass the response
  const response = await resolve(event);

  return response;
}



