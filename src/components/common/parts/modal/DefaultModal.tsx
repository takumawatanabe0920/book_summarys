import React, { useEffect, useState, FC } from "react"

type props = {
  modalInfo?: { title?: string; content?: string }
  isOverlay?: boolean
  actionBtn?: any
  closeModal?: any
}

const DefaltModal: FC<props> = props => {
  const { closeModal, isOverlay, modalInfo, actionBtn } = props
  const handleClose = () => {
    closeModal()
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

  return (
    <>
      <div className="bmodal-content">
        <div className="bmodal-container img-bmodal-container">
          <a className="closeBtn" onClick={() => handleClose()}>
            <span>
              <img src="/images/icon/cross_hoso.svg" alt="閉じる" />
            </span>
          </a>
          <div className="_content">
            <h3 className="_title">{modalInfo.title}</h3>
            <p className="_txt">{modalInfo.content}</p>
          </div>
        </div>
        <div className="bmodal-overlay" onClick={() => handleClose()} />
      </div>
    </>
  )
}

export default DefaltModal
