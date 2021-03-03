import {useState} from 'react';

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const onChange = async (e) => {
        try{  
            await setValues({...values, [e.target.name] : e.target.value})
        } catch(e) {
            console.error(e);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try { 
            await callback();
        } catch(e) {
            console.error(e);
        }
    };
    return {
        onChange,
        onSubmit,
        values, 
    }

}

