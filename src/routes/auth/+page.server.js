

import { authApi } from '$lib/utils/auth';
import { redirect } from '@sveltejs/kit';

// @ts-ignore
export async function load({ fetch }) {
    const isAuth = await authApi.checkAuth(fetch);
    console.log("isAuth",isAuth)
      if (isAuth) {
        // User is already logged in, redirect to dashboard
        return redirect(304, '/dashboard')
      }
  }