import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";
// import gql from 'graphql-tag';
import Axios from "axios";
//import { useMutation } from '@apollo/client';

const ImageUpload = ({onUploadComplite}) => {
    // const [image, setImage] = useState('');
    
    // let history = useHistory();

    const upload = (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        console.log(formData)
        formData.append("upload_preset", "ml_default");
        Axios.post(
        `https://api.cloudinary.com/v1_1/dvvinugki/image/upload`,
        formData
        ).then((response) => {
        // const fileName = response.data.public_id;
        
        onUploadComplite(response.data.secure_url, response.data.publicated);
        // Axios.post("http://localhost:5000/", {
        //     imageUrl: fileName,
        //     user: localStorage.getItem("username"),
        // }).then(() => {
        //     history.push("/");
        // })
        
        });
    };

    return (
        <>
                <Form.Input 
                    label='Avatar'
                    type='file'
                    name='Avatar'
                    placeholder='enter a caption'
                    onChange={upload} />

                {/* <Button  
                    onClick={upload} primary>
                        Upload avatar
                </Button> */}
        

                    
                
        </>
    )
}

// const UPLOAD_IMAGE = gql`
//     mutation uploadImage($file: Upload) {
//         uploadImage(file: $file)
//     }
// `;


export default ImageUpload
