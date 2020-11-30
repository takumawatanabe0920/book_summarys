import React, { useState, useEffect, FC } from "react"
import useReactRouter from "use-react-router"
import { Textarea, Alert } from "./../../components"
import {
  CurrentUser,
  SummaryComment,
  ResSummaryComment,
  ResultResponse
} from "./../../types"
import {
  getCurrentUser,
  createSummaryComment,
  createNotification
} from "./../../firebase/functions"
import useAlertState from "./../../assets/hooks/useAlertState"
const user: CurrentUser = getCurrentUser()

type Props = {
  slug?: { id?: string }
  user_id: string
  summary_id: string
}

const SummaryCommentForm: FC<Props> = props => {
  const { slug, user_id, summary_id } = props
  const initialState = {
    user_id,
    user_name: user.displayName ? user.displayName : "",
    summary_id,
    comment: ""
  }
  const [comments, setComments] = useState<SummaryComment>({
    ...initialState
  })
  const [summaryCommentList, setSummaryCommentList] = useState<
    SummaryComment[]
  >()
  const [
    isShowAlert,
    alertStatus,
    alertText,
    throwAlert,
    closeAlert
  ] = useAlertState(false)
  const { history } = useReactRouter()

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.persist()
    const target = event.target
    const value = target.value
    const name = target.name
    setComments({ ...comments, [name]: value })
  }

  const onSubmit = async (event: React.MouseEvent) => {
    event.persist()
    event.preventDefault()
    const { user_id, summary_id, comment } = comments
    if (!summary_id || !user_id) {
      return await throwAlert("danger", "エラーが発生しました。")
    }
    if (!comment) {
      return await throwAlert("danger", "コメントが入力されてません。")
    }

    if (window.confirm("記事を作成しますか？")) {
      const resCommnet: ResultResponse<ResSummaryComment> = await createSummaryComment(
        comments
      )
      if (resCommnet && resCommnet.status === 200) {
        createNotification({
          user_id,
          user_name: user.displayName ? user.displayName : "",
          target_id: resCommnet.data.id,
          type: "summary_comment"
        })
        await throwAlert("success", "コメントに成功しました。")
        history.replace(`/`)
      } else {
        await throwAlert("danger", "コメントに失敗しました。")
      }
    }
  }

  useEffect(() => {
    closeAlert()
  }, [])

  return (
    <>
      <Alert
        is_show_alert={isShowAlert}
        alert_status={alertStatus}
        alert_text={alertText}
      />
      <div>
        <h3>投稿する</h3>
        <form className="form-table">
          <Textarea
            name="comment"
            onChange={handleTextareaChange}
            placeholder={"テキストを入力する"}
          />
          <div className="btn-area mgt-2 inline">
            <button className="_btn submit" type="submit" onClick={onSubmit}>
              コメントする
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default SummaryCommentForm
