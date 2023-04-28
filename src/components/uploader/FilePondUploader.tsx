import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

import './styles/filePondStyles.scss'
import { updateFiles } from '../../services/katasServices'
import { AxiosResponse } from 'axios';
import { useSessionStorage } from '../../hooks/useSessionStorage'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize,FilePondPluginFileEncode);
// Our app
export const FilePondUploader = () => {
    const [files, setFiles] = useState<any>([])
    let { id } = useParams()
    // let id = '6446d9877ba325fe18155cca'
    let navigate = useNavigate()

    return (
        <div className="App">
            <h1>Archivos a enviar</h1>
            <FilePond
                files={files}
                labelFileTypeNotAllowed='El tipo de archivo no es aceptado'
                labelFileProcessingAborted={"El archivo es demasiado grande"}
                allowFileEncode={true}
                acceptedFileTypes={[
                    "application/zip",
                    "application/vnd.rar",
                    "application/pdf",
                    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "video/mp4",
                    "image/jpeg",
                    "image/png"
                ]}
                onupdatefiles={setFiles}
                allowMultiple={false}
                maxFiles={3}
                maxFileSize="200MB"
                server={`http://localhost:8000/api/kata/UploadFile?id=${id}`}
                name="files"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />

            <Button onClick={()=>navigate('/katas')}>Ir a home</Button>
        </div>
    )
}