import React, { useEffect, useState, FC } from "react"
import { Textarea, Select } from "../../../../components"

type props = {
  modalInfo?: { title?: string; content?: string }
  isOverlay?: boolean
  actionBtn?: any
  closeModal?: any
}

type Question = Partial<{
  content: string
  gender: string
}>

const QuestionModal: FC<props> = props => {
  const [values, setValues] = useState<Question>({})
  const [gender, setGender] = useState([
    { id: "man", name: "男性" },
    { id: "woman", name: "女性" }
  ])
  const { closeModal, isOverlay, modalInfo, actionBtn } = props
  const handleClose = () => {
    closeModal()
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.persist()
    const target = event.target
    const value = target.value
    const name = target.name
    setValues({ ...values, [name]: value })
  }

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.persist()
    const target = event.target
    const value = target.value
    const name = target.name
    setValues({ ...values, [name]: value })
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
        <div className="bmodal-container">
          <img className="_icon" src="/images/order/order-logo.png" />
          <p className="_title">{modalInfo.title}</p>
          <p className="_text">{modalInfo.content}</p>
          <div className="form-area">
            <form className="form-table">
              <Select
                title="性別"
                name="gender"
                required={false}
                dataList={gender}
                onChange={handleSelectChange}
              />
              <Textarea
                title="その他要望"
                name="content"
                required={false}
                onChange={handleTextareaChange}
              />
              <div className="btn-area">
                <button className="_btn black" type="submit">
                  アンケートを送る
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="bmodal-overlay" />
      </div>
    </>
  )
}

export default QuestionModal
