import { FormModel } from '$lib/server/db/models/forms.js';
import { redirect } from '@sveltejs/kit';

// @ts-ignore
export async function load({ locals, params }) {
   
        const form = JSON.stringify(await FormModel.findOne({
            link:params.id,
            status: 'published'
        }).lean());

    
        return {
            form:JSON.parse(form),

        }
    
  }