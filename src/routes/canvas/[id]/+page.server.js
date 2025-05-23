import { FormModel } from '$lib/server/db/models/forms';
import { redirect } from '@sveltejs/kit';

// @ts-ignore
export async function load({ locals, fetch, params }) {
    if (!locals?.user) {
        console.log("4",locals)
        return redirect(304, '/auth')
    }else{
        const form =JSON.stringify(await FormModel.findOne({_id:params.id}).lean());
        // console.log("10",params.id)
        return {
            form:JSON.parse(form)
        }
    }
  }