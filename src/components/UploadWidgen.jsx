import { useEffect, useRef } from "react"

export default function UploadWidget({ supplier_id, setId_picture }) {
    const cloudinaryRef = useRef();
    const widgetRef = useRef()

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dyikt4p59',
            uploadPreset: 'ml_default',
        }, function (error, result) {
            if (result?.event === 'success')
                setId_picture(result.info.secure_url)
                console.log(result.info.secure_url)
        });
    }, [setId_picture])
    return (
        <>
            <button aria-required className={`transition-all ${supplier_id ? 'block' : 'hidden'} max-w-1/7 mt-4 duration-75 bg-blue-600 hover:bg-blue-700 px-5 py-1 text-white rounded-md`} onClick={() => widgetRef.current.open()}>Upload file</button>
        </>
    )
}