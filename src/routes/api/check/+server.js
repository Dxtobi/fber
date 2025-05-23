
import { json } from '@sveltejs/kit';
import { UserModel } from '$lib/server/db/models/user';

/**
 * Endpoint to check if a user's session is valid
 * Returns user data if authenticated
 */
export async function GET({ locals, request }) {
  try {
    console.log("locals: ",request.headers)
    if (locals.user) {
      return json({
        authenticated: true,
        user: locals.user
      });
    }
    
    
    return json({
      authenticated: false
    }, { status: 401 });
    
  } catch (error) {
    console.error('Auth check error:', error);
    return json({ error: 'Server error during authentication check' }, { status: 500 });
  }
}