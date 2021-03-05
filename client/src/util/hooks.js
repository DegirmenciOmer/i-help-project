import {useState} from 'react';

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);

<<<<<<< HEAD
  // const onChange = (event, ...res) => {
  //   console.log(res);
  //   setValues({ ...values, [event.target.name]: event.target.value });
  // };
=======
    const onChange = async (e) => {
        try{  
            await setValues({...values, [e.target.name] : e.target.value})
        } catch(e) {
            console.error(e);
        }
    };
>>>>>>> development

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

<<<<<<< HEAD
  const onChange = (event, { name, value }) => {
    setValues({ ...values, [name]: value });
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
=======
>>>>>>> development
