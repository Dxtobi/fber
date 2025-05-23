import { FormModel } from '$lib/server/db/models/forms.js';
import { redirect } from '@sveltejs/kit';

// @ts-ignore
export async function load({ locals, fetch }) {
    if (!locals?.user) {
        console.log("4",locals)
        return redirect(304, '/auth')
    }else{
        const forms = JSON.stringify(await FormModel.find({user:locals.user.id}).lean());
        // console.log(forms)
        return {
            forms:JSON.parse(forms)
        }
    }
  }