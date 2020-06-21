import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Icon, Header } from 'semantic-ui-react'

const dropZoneStyle = {
    height: 200,
    border: '3px dashed',
    borderColor: 'lightgrey',
    paddingTop: 30,
    textAlign: 'center' as const
}

const dropZoneActive = {
    borderColor: 'green'
}

interface IProps {
    setFiles: (files: object[]) => void
}

const PhotoDropzone: React.FC<IProps> = ({ setFiles }) => {
    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map((file: object) => 
            Object.assign(file, { preview: URL.createObjectURL(file) })
        ))
    }, [setFiles])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} style={!isDragActive ? dropZoneStyle : { ...dropZoneStyle, ...dropZoneActive }}>
            <input {...getInputProps()} />
            <Icon name='upload' size='huge' />
            <Header content='Drop Image here' />
        </div>
    )
}

export default PhotoDropzone