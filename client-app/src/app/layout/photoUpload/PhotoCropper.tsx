import React, { useRef } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

interface IProps {
    imagePreview: string,
    setImage: (file: Blob) => void
}

const PhotoCropper: React.FC<IProps> = ({ imagePreview, setImage }) => {
    const ref = useRef<Cropper>(null)
    const cropImage = () => {
        if(ref.current && ref.current.getCroppedCanvas() === undefined){
            return;
        }
        ref.current && ref.current.getCroppedCanvas().toBlob((blob: any) => {
            setImage(blob)
        }, 'images/jpeg')
    }
    return (
        <Cropper
            ref={ref}
            src={imagePreview}
            style={{ height: 200, width: '100%' }}
            aspectRatio={1 / 1}
            guides={false}
            crop={cropImage}
            preview='.img-preview'
            viewMode={1}
        />
    )
}

export default PhotoCropper
