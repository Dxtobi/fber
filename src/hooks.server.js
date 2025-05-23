// src/hooks.server.js
import connectDB from '$lib/server/db';
import { UserModel } from '$lib/server/db/models/user';

// Cookie configuration
const COOKIE_OPTIONS = {
  httpOnly: true,          // Makes the cookie inaccessible to client-side JS
  secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
  sameSite: 'strict',      // Strict same-site policy for better security
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  path: '/'                // Cookie available across the entire site
};

// Custom token name
const AUTH_TOKEN_NAME = 'sessionToken';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  if (event.url.pathname === '/.well-known/appspecific/com.chrome.devtools.json') {
    return new Response(null, { status: 404 });
  }

  await connectDB();

  // Check if the user is authenticated via the session token
  const sessionToken = event.cookies.get(AUTH_TOKEN_NAME);
  
  if (sessionToken) {
    try {
      const user = await UserModel.findOne({ userAuthToken: sessionToken });
      if (user) {
        // Add user data to event.locals for use in routes
        event.locals.user = {
          id: user._id,
          username: user.username,
          email: user.email
        };
      } else {
        console.log('User not found for token:', sessionToken);
      }
    } catch (err) {
      console.error('Error validating session token:', err);
    }
  }

  // Handle authentication for protected routes
  if (event.url.pathname.startsWith('/api/protected') && !event.locals.user) {
    return new Response('Unauthorized - Authentication required', { status: 401 });
  }

  // Resolve the request and pass the response
  const response = await resolve(event);
  return response;
}

/**
 * Sets the authentication cookie in the response
 * @param {Response} response - The original response object
 * @param {string} token - The authentication token to set
 * @returns {Response} The response with the auth cookie set
 */
export function setAuthCookie(response, token) {
  // Create headers from the original response
  const headers = new Headers(response.headers);
  
  // Set the Set-Cookie header with the auth token
  headers.append('Set-Cookie', 
    `${AUTH_TOKEN_NAME}=${token}; Max-Age=${COOKIE_OPTIONS.maxAge}; Path=${COOKIE_OPTIONS.path}; HttpOnly; ${COOKIE_OPTIONS.secure ? 'Secure;' : ''} SameSite=${COOKIE_OPTIONS.sameSite}`
  );
  
  // Return a new response with the updated headers
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

/**
 * Clears the authentication cookie in the response
 * @param {Response} response - The original response object
 * @returns {Response} The response with the auth cookie cleared
 */
export function clearAuthCookie(response) {
  // Create headers from the original response
  const headers = new Headers(response.headers);
  
  // Set the Set-Cookie header to clear the auth token
  headers.append('Set-Cookie', 
    `${AUTH_TOKEN_NAME}=; Max-Age=0; Path=${COOKIE_OPTIONS.path}; HttpOnly; ${COOKIE_OPTIONS.secure ? 'Secure;' : ''} SameSite=${COOKIE_OPTIONS.sameSite}`
  );
  
  // Return a new response with the updated headers
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}