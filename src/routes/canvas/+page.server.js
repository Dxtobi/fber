import { redirect } from '@sveltejs/kit';

// @ts-ignore
export async function load({ session }) {
    if (!session?.user) {
        console.log("4",session)
        return redirect(304, '/auth')
    }else{
         console.log("10",session)
    }
  }