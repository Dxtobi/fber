import { FormModel } from '$lib/server/db/models/forms.js';
import { redirect } from '@sveltejs/kit';

// @ts-ignore
export async function load({ locals, fetch }) {
    if (!locals?.user) {
        console.log("4",locals)
        return redirect(304, '/auth')
    }else{
        const forms = JSON.stringify(await FormModel.find({
            user:locals.user.id,
            status: 'draft'
        }).lean());

        const deletedForms = JSON.stringify(await FormModel.find({
            user:locals.user.id,
            status: 'deleted'
        }).lean());
        const archivedForms = JSON.stringify(await FormModel.find({
            user:locals.user.id,
            status: 'archived'
        }).lean());

        const publishedForms = JSON.stringify(await FormModel.find({
            user:locals.user.id,
            status: 'published'
        }).lean());
        // console.log(forms)
        return {
            forms:JSON.parse(forms),
            deletedForms:JSON.parse(deletedForms),
            archivedForms:JSON.parse(archivedForms),
            publishedForms:JSON.parse(publishedForms)
        }
    }
  }