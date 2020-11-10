import React, { useEffect, useState, FC } from "react"
import QuestionModal from "./modal/QuestionModal"
import DefaultModal from "./modal/DefaultModal"

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

  useEffect(() => {
    let unmounted = false
    ;(async () => {
      if (!unmounted) {
      }
    })()
    return () => {
      unmounted = true
    }
  }, [])

  return <>{modal}</>
}

export default Modal
