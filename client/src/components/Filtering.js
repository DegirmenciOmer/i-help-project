import React from 'react';
import { Button, Form } from 'semantic-ui-react';

const options = [
  { key: 's', text: 'Shopping', value: 'Shopping' },
  { key: 'c', text: 'Cleaning', value: 'Cleaning' },
  { key: 'd', text: 'Dog walking', value: 'Dogwalking' },
  { key: 'g', text: 'Cooking', value: 'Cooking' },
  { key: 'ga', text: 'Gardening', value: 'Gardening' },
];

const Filtering = ({ categorySelected, onFilterChange }) => {
  const onChange = (event, { value }) => {
    onFilterChange(value);
  };

  return (
    <>
      <Form className='form-container'>
        <Form.Select
          className='filter-input'
          fluid
          options={options}
          placeholder='Filter'
          value={categorySelected}
          name='filter'
          onChange={onChange}
        />
        <Button
          primary
          className='filter-button'
          onClick={() => {
            onFilterChange('');
          }}
        >
          Reset
        </Button>
      </Form>
    </>
  );
};

export default Filtering;
