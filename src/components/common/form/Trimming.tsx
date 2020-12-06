import React, { useState, FC } from "react"
import ReactCrop, { Crop } from "react-image-crop"
import "react-image-crop/lib/ReactCrop.scss"
import { Input } from "../../../components"

export type stateFile = {
  src?: any
  blobFile?: any
  crop?: Crop
}

type Props = {
  title: string
  setState: React.Dispatch<React.SetStateAction<stateFile>>
  required?: boolean
  userIcon?: string
  isEdit?: boolean
}

const Trimming: FC<Props> = props => {
  const { setState, required, title, userIcon, isEdit } = props
  const [childState, setChildState] = useState<stateFile>({
    src: null,
    crop: {
      unit: "%",
      width: 50,
      height: 50,
      aspect: 1
    }
  })
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null)
  const [previewImage, setPreviewImage] = useState<string>(null)

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist()
    event.preventDefault()
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener("load", () =>
        setChildState({ ...childState, src: reader.result })
      )
      reader.readAsDataURL(event.target.files[0])
    }
  }

  const onImageLoaded = (image: HTMLImageElement) => {
    setImageRef(image)
  }

  const onCropChange = (crop: Crop) => {
    setChildState({ ...childState, crop })
  }

  const onCropComplete = async (crop: Crop) => {
    if (imageRef && crop.width && crop.height) {
      const [croppedImageUrl, blobFile] = await getCroppedImg(
        imageRef,
        crop,
        "newFile.jpeg"
      )
      setPreviewImage(croppedImageUrl)
      setChildState({ ...childState, blobFile })
      setState({ ...childState, blobFile })
    }
  }

  const getCroppedImg = (
    image: HTMLImageElement,
    crop: Crop,
    fileName: string
  ): Promise<[string, Blob]> => {
    const canvas = document.createElement("canvas")
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext("2d")

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob: any) => {
        if (!blob) {
          return
        }
        blob.name = fileName
        const fileUrl = window.URL.createObjectURL(blob)
        const blobFile = blob
        resolve([fileUrl, blobFile])
      }, "image/jpeg")
    })
  }
  return (
    <>
      <div>
        <Input
          type="file"
          title={title}
          required={required}
          accept="image/*"
          onChange={onSelectFile}
        />
      </div>
      <div className="_icon-area">
        {userIcon && (
          <dl>
            <dt>登録ユーザーアイコン</dt>
            <dd>
              <img src={userIcon} alt="アイコン" className="image-circle" />
            </dd>
          </dl>
        )}
        {previewImage && (
          <dl>
            <dt>
              {isEdit ? "変更後ユーザーアイコン" : "登録ユーザーアイコン"}
            </dt>
            <dd>
              <img alt="Crop" src={previewImage} className="image-circle" />
            </dd>
          </dl>
        )}
      </div>
      {childState.src && (
        <ReactCrop
          src={childState.src}
          crop={childState.crop}
          ruleOfThirds
          circularCrop
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={onCropChange}
        />
      )}
    </>
  )
}

export default Trimming
