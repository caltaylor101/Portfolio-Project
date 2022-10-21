import { UploadOutlined } from '@ant-design/icons';
import { Typography, Upload } from 'antd';
import {Fragment, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

interface Props {
    setFiles: (files: any) => void; 
}

export default function PhotoWidgetDropzone({setFiles}: Props) {
    const dzStyles = {
        border: 'dashed 5px #aaa',
        margin: '0 auto',
        borderColor: '#eee',
        borderRadius: '10px',
        paddingTop: '30px',
        padding: '100px',
        textAlign: 'center' as 'center',
        height: 50,
        width:50,
        backgroundColor:'#ccc'
    }

    const dzActive = {
        borderColor: 'green',
    }


  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(acceptedFiles.map((file:any) => Object.assign(file, {
        preview: URL.createObjectURL(file)
    })));
  }, [setFiles])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <Fragment>

                <div {...getRootProps()} style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles} >
                    <UploadOutlined size={64} />
                    <input {...getInputProps()} />
                
                
                </div>
            
        </Fragment>
    
  )
}