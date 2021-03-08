import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";
// import gql from 'graphql-tag';
import Axios from "axios";
//import { useMutation } from '@apollo/client';

const ImageUpload = ({ onUploadComplite }) => {
    const upload = (evt) => {
        const formData = new FormData();
        formData.append("file", evt.target.files[0]);
        formData.append("upload_preset", "ml_default");
        Axios.post(
        `https://api.cloudinary.com/v1_1/dvvinugki/image/upload`,
        formData
        ).then((response) => {
            onUploadComplite(
                evt,
                { name: evt.target.name, value: response.data.secure_url }
            );
        });
    };

    return (
        <>
            <Form.Input
                label='Avatar'
                type='file'
                name='imageUrl'
                placeholder='enter a caption'
                onChange={upload} />
        </>
    )
}

export default ImageUpload
