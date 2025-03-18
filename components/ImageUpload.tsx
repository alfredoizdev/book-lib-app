'use client'

import { useRef, useState } from 'react'
import config from '@/lib/config'
import { toast } from 'sonner'
import { IKImage, ImageKitProvider, IKUpload } from 'imagekitio-next'
import Image from 'next/image'

const {
  env: {
    imageKit: { publicKay, urlEndpoint },
  },
} = config

const authenticator = async () => {
  const response = await fetch(`${config.env.apiEndPoint}/api/auth/imagekit`)
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Request failed with status ${response.status}: ${errorText}`
    )
  }

  try {
    const data = await response.json()
    const { signature, expire, token } = data

    return {
      token,
      expire,
      signature,
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error('Error authenticating request fail:' + error.message)
  }
}

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void
}) => {
  const ikUploadRef = useRef(null)
  const [file, setFile] = useState<{ filePath: string } | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (error: any) => {
    console.log(error)

    toast.error('Error on Upload failed', {
      description: 'You file could not be uploaded, please try again',
    })
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSuccess = (res: any) => {
    setFile(res)
    onFileChange(res.filePath)

    toast.success('Upload success', {
      description: `File uploaded successfully with path: ${res.filePath}`,
    })
  }

  return (
    <ImageKitProvider
      publicKey={publicKay}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className='hidden'
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName='text-upload.png'
      />
      <button
        className='upload-btn bg-gray-700'
        onClick={(e) => {
          e.preventDefault()

          if (ikUploadRef.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ikUploadRef.current?.click()
          }
        }}
      >
        <Image src='/assets/upload.svg' width={24} height={24} alt='upload' />
        <p className='text-base'>Upload file</p>

        {file && <p className='upload-filename'>{file.filePath}</p>}
      </button>

      {file && (
        <IKImage
          path={file.filePath}
          alt={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  )
}

export default ImageUpload
