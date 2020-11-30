import React, { FC } from "react"
import { QuestionModal, DefaultModal } from "../../../components"

type props = {
  modalInfo: { title?: string; content?: string }
  isOverlay?: boolean
  actionBtn?: any
  closeModal?: any
  modalType?: string
}
const Modal: FC<props> = props => {
  const { closeModal, isOverlay, modalInfo, actionBtn, modalType } = props
  const handleClose = () => {
    closeModal()
  }

  const modal = () => {
    if (modalType === "question") {
      return <QuestionModal />
    } else if (modalType === "default") {
      return <DefaultModal />
    } else {
      return ""
    }
  }

  return <>{modal}</>
}

export default Modal
