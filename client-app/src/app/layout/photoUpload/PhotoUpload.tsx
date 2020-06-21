import React, { useState, Fragment, useEffect } from 'react'
import { Segment, Grid, Header, Button } from 'semantic-ui-react'
import PhotoDropzone from './PhotoDropzone'
import PhotoCropper from './PhotoCropper'
import { observer } from 'mobx-react-lite'

interface IProps {
    uploadPhoto: (file: Blob) => Promise<void>,
    uploading: boolean,
    setEditMode: (val: boolean) => void
}

const PhotoUpload: React.FC<IProps> = ({setEditMode, uploadPhoto, uploading}) => {
    const [files, setFiles] = useState<any[]>([])
    const [image, setImage] = useState<Blob | null>(null)

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    return (
        <Segment>
            <Grid>
                <Grid.Column width={5}>
                    <Header textAlign='center' size='small' content='Step 1 - Add Photo' />
                    <PhotoDropzone setFiles={setFiles} />
                </Grid.Column>
                <Grid.Column width={5}>
                    <Header textAlign='center' size='small' content='Step 2 - Resize Photo' />
                    {files.length > 0 && <PhotoCropper imagePreview={files[0].preview} setImage={setImage} />}
                </Grid.Column>
                <Grid.Column width={5}>
                    <Header textAlign='center' size='small' content='Step 3 - Preview & Upload' />
                    {files.length > 0 && (
                        <Fragment>
                            <div className="img-preview" style={{ height: 200, overflow: 'hidden', paddingRight: 0 }} />
                            <Button.Group widths={2} style={{width: 200}}>
                                <Button
                                    loading={uploading}
                                    color='teal'
                                    icon='check'
                                    onClick={() => {
                                        uploadPhoto(image!).then(() => setEditMode(false))
                                    }}
                                />
                                <Button basic color='grey' icon='close' onClick={() => setFiles([])} />
                            </Button.Group>
                        </Fragment>
                    )}
                </Grid.Column>
            </Grid>
            <Grid>
                <Grid.Column width={15}>
                    <Button basic content='Cancel' floated='right' onClick={() => setEditMode(false)} />
                </Grid.Column>
            </Grid>
        </Segment>
    )
}

export default observer(PhotoUpload)
