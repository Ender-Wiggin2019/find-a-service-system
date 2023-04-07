import React, { useRef, useState, useEffect } from 'react'
// import { storage } from "~/lib/firebase";
// import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
// import { v4 as uuidv4 } from "uuid";
// import { SERVICR_PROVIDER_IMAGE_PATH } from "~/lib/constants";

interface ImageUploaderProps {
    onImageSelected: (file: File) => void
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files instanceof FileList) {
            const file = event.target.files[0] as File
            onImageSelected(file)
        } else {
            console.log('TODO: handle error')
        }
    }

    // const [imageUpload, setImageUpload] = useState<File>(); // TODO: for now only assume one service has only one image
    // // const [imageUrls, setImageUrls] = useState<Array<string>>([]);
    // const [imageUrl, setImageUrl] = useState<string>();
    //
    // const imagesListRef = ref(storage, SERVICR_PROVIDER_IMAGE_PATH);

    // const uploadFile = () => {
    //     if (imageUpload === undefined) return;
    //     const imageRef = ref(storage, `images/${imageUpload.name + uuidv4()}`);
    //     uploadBytes(imageRef, imageUpload).then((snapshot) => {
    //         getDownloadURL(snapshot.ref).then((url) => {
    //             // setImageUrls((prev) => [...prev, url]);
    //             setImageUrl(url);
    //         });
    //         console.log(imageUrl);
    //     });
    // };

    // useEffect(() => {
    //     listAll(imagesListRef).then((response) => {
    //         response.items.forEach((item) => {
    //             getDownloadURL(item).then((url) => {
    //                 // setImageUrls((prev) => [...prev, url]);
    //                 setImageUrl(url);
    //
    //             });
    //         });
    //     });
    // }, []);

    // FIXME(Ender): shouldn't upload to firebase in this step
    return (
        <div>
            {/*<button*/}
            {/*    type="submit"*/}
            {/*    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"*/}
            {/*    data-te-ripple-init*/}
            {/*    data-te-ripple-color="light">*/}
            {/*    Sign up*/}
            {/*</button>*/}

            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor='file_input'>
                Upload Service Image
            </label>
            <input
                className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                aria-describedby='file_input_help'
                id='file_input'
                type='file'
                onChange={handleFileInput}
            />
            <p className='mt-1 text-sm text-gray-500 dark:text-gray-300' id='file_input_help'>
                SVG, PNG, JPG or GIF (MAX. 800x400px).
            </p>

            {/*<button*/}
            {/*    onClick={uploadFile}*/}
            {/*    className="mb-6 w-half text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm mt-2 px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"*/}
            {/*    data-te-ripple-init*/}
            {/*    data-te-ripple-color="light">*/}
            {/*    Upload Image*/}
            {/*</button>*/}
            {/*<img alt='img' src={imageUrl} />*/}
            {/*{imageUrls.map((url) => {*/}
            {/*    return <img key={url} alt='img' src={url} />;*/}
            {/*})}*/}
        </div>
    )
}

export default ImageUploader
