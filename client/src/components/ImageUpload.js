import React, {useState} from 'react';
import { Button, Form } from 'semantic-ui-react';

const ImageUpload = () => {
    const [image, setImage] = useState('');

    // const onHandleChange =(e)=> {
    //     if(e.target.files[0]){
    //         setImage(e.target.files[0])
    //     }
    // }

    const handleUpload = () => {

    }

    return (
        <>

                {/* <Form.Input 
                    label='Avatar'
                    name='Avatar'
                    placeholder='enter a caption'
                    value={image}
                    onChange={onHandleChange} /> */}
                <Button  
                    onClick={handleUpload} primary>
                        Upload avatar
                </Button>
        

                    
                
        </>
    )
}

export default ImageUpload
