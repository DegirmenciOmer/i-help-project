import {useState} from 'react';

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const onChange = async (evt, {name, value}) => {

        try{  
            await setValues({...values, [name] : value})
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

