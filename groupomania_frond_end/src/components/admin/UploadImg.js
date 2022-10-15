//import React, { useState } from 'react';
import './uploadimg.css'

const UploadImg = () => {
    //const [imageProfile, setImageProfile] = useState();

    const handlePicture = (e) => {
      
    }

    return (
        <form action='' onSubmit={handlePicture} className='upload-profile-pic'>
            <label htmlFor='image_profile'>Modifier votre photo</label>
            <input
                type='file'
                id='image_profile'
                name='image_profile'
                accept='.jpg, .jpeg, png'
                //onChange={(e) => setImageProfile(e.target.files[0])}
            />
       
            <input type='submit' value='Valider' className='valid-btn'/>
        </form>
    );
};

export default UploadImg;