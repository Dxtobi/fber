import  { FormResponseModel } from '$lib/server/db/models/formresponse.js';
import { FormModel } from '$lib/server/db/models/forms.js';
import { json } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';



// @ts-ignore
export async function POST({ request, url, locals }) {
  
    const params_ = url.searchParams.get('q');
    
 
    if (params_=='saveForm') {
        return handleSaveForm(request, locals);
    }
    
    
    if (params_=='publishForm') {
        return handlePublishForm(request, locals);
    }

      
    if (params_=='newForm') {
        return handleCreateNewForm(request, locals);
    }

    if (params_=='response'){
        return handleSaveFormData(request, locals)
    }
  

    
    return json({ error: 'Endpoint not found' }, { status: 404 });
}

// @ts-ignore
export async function DELETE({ request, url, locals }) {
  
    const params_ = url.searchParams.get('q');
    
 
    if (params_=='delete') {
        return handlePermanentlyDelete(request, locals);
    }
    
    
    if (params_=='trash') {
        return handleUpdateFormStatus(request, locals);
    }


    return json({ error: 'Endpoint not found' }, { status: 404 });
}

// @ts-ignore
export async function PATCH({ request, url, locals }) {
  
    const params_ = url.searchParams.get('q');
    
    
    if (params_=='status') {
        return handleUpdateFormStatus(request, locals);
    }


    return json({ error: 'Endpoint not found' }, { status: 404 });
}
// @ts-ignore
// @ts-ignore
const handleSaveForm =async (request, locals)=>{
    try{

        const formData = await request.json();
        
        if (!formData) {
            return json({ error: 'Empty Data Object' }, { status: 400 });
        }

        
        const form = await FormModel.findByIdAndUpdate(formData.id, {
           components:formData.components
        },{new:true}).lean();
        if (!form) {
            console.log("Form saved successfully:", form);
            return json({ error: 'Failed to save form' }, { status: 400 });
        }
        console.log("Form saved successfully:", form);
        return json({ message: 'Form saved',  }, { status: 200 });

    }catch(error){
        // @ts-ignore
        console.log(error.message)
        // @ts-ignore
        return json({ error: error.message||'Something went wrong' }, { status: 400 });
    }
}

// @ts-ignore
// @ts-ignore
const handlePublishForm = async (request, locals) => {
    try {
        const formData = await request.json();

        if (!formData || !formData.id) {
            return json({ error: 'Empty Data Object or missing form id' }, { status: 400 });
        }

        // Generate a unique short link using uuid
        const shortLink = uuidv4().split('-')[0];

        const form = await FormModel.findByIdAndUpdate(
            formData.id,
            {
                status: 'published',
                link: shortLink
            },
            { new: true }
        ).lean();

        if (!form) {
            return json({ error: 'Failed to publish form' }, { status: 400 });
        }

        return json({ message: 'Form published', data: form }, { status: 200 });

    } catch (error) {
        // @ts-ignore
        return json({ error: error.message || 'Something went wrong' }, { status: 400 });
    }
}
// @ts-ignore
const handleCreateNewForm= async (request, locals)=>{
    try{
        const formData = await request.json();
        
        if (!formData) {
            return json({ error: 'Empty Data Object' }, { status: 400 });
        }

        console.log(locals)
        const form = await FormModel.create({
            formName: formData.name,
            description: formData.description,
            components: formData.components||[],
            user: locals.user.id,
        });
        if (!form) {
            return json({ error: 'Failed to save form' }, { status: 400 });
        }
        console.log("Form saved successfully:");
        return json({ message: 'Form saved', data:form  }, { status: 200 });

    }catch(error){
        // @ts-ignore
        return json({ error: 'Something went wrong', error:error.message }, { status: 400 });
    }
}


// @ts-ignore
// @ts-ignore
const handleSendToTrash= async (request, locals)=>{
    try{
        const formData = await request.json();
        
        if (!formData) {
            return json({ error: 'Empty Data Object' }, { status: 400 });
        }

        // console.log(locals)
        const form = await FormModel.findOneAndUpdate({_id:formData.id},{
            status: 'deleted',
        },{new:true}).lean();
        
        if (!form) {
            return json({ error: 'Failed to save form' }, { status: 400 });
        }
        console.log("Form saved successfully:");
        return json({ message: 'Form saved', data:form  }, { status: 200 });

    }catch(error){
        // @ts-ignore
        return json({ error: 'Something went wrong', error:error.message }, { status: 400 });
    }
}
// @ts-ignore
// @ts-ignore
const handleUpdateFormStatus= async (request, locals)=>{
    try{
        const formData = await request.json();
        
        if (!formData) {
            return json({ error: 'Empty Data Object' }, { status: 400 });
        }

        // console.log(locals)
        const form = await FormModel.findOneAndUpdate({_id:formData.id},{
            status: formData.status,
        },{new:true}).lean();
        
        if (!form) {
            return json({ error: 'Failed to save form' }, { status: 400 });
        }
        console.log("Form saved successfully:");
        return json({ message: 'Form saved', data:form  }, { status: 200 });

    }catch(error){
        // @ts-ignore
        return json({ error: 'Something went wrong', error:error.message }, { status: 400 });
    }
}

// @ts-ignore
// @ts-ignore
const handlePermanentlyDelete= async (request, locals)=>{
    try{
        const formData = await request.json();
        
        if (!formData) {
            return json({ error: 'Empty Data Object' }, { status: 400 });
        }

        // console.log(locals)
        const form = await FormModel.findOneAndDelete({_id:formData.id})
        
        if (!form) {
            return json({ error: 'Failed to save form' }, { status: 400 });
        }
        console.log("Form saved successfully:");
        return json({ message: 'Form saved', data:form  }, { status: 200 });

    }catch(error){
        // @ts-ignore
        return json({ error: 'Something went wrong', error:error.message }, { status: 400 });
    }
}

// @ts-ignore
const handleSaveFormData =async (request, locals)=>{
    try{

        const formData = await request.json();
        
        if (!formData) {
            return json({ error: 'Empty Data Object' }, { status: 400 });
        }

        const form = await FormResponseModel.create({
            ...formData
        });
        if (!form) {
            console.log("Form saved successfully:", form);
            return json({ error: 'Failed to save form' }, { status: 400 });
        }
        console.log("Form saved successfully:", form);
        return json({ message: 'Form saved',  }, { status: 200 });

    }catch(error){
        //@ts-ignore
        console.log(error.message)
        //@ts-ignore
        return json({ error: error.message||'Something went wrong' }, { status: 400 });
    }
}