import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

import { useForm } from '../util/hooks';

const SelectFrom = () => {
  const options = [
    { key: 's', text: 'Shopping', value: 'Shopping' },
    { key: 'c', text: 'Cleaning', value: 'Cleaning' },
    { key: 'd', text: 'Dog walking', value: 'Dogwalking' },
    { key: 'g', text: 'Cooking', value: 'Cooking' },
    { key: 'ga', text: 'Gardening', value: 'Gardening' },
  ];

  const [errors, setErrors] = useState([]);

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: '',
    category: '',
  });

  function createPostCallback() {}

  return (
    <div>
      <Form.Select
        fluid
        label='Category'
        options={options}
        placeholder='Category'
        name='category'
        onChange={onChange}
        value={values.category}
        error={errors ? true : false}
      />
    </div>
  );
};

export default SelectFrom;
