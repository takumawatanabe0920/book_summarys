import React, { useState, useEffect, FC } from "react"
import useReactRouter from "use-react-router"
import { Textarea } from "./../../components"
import { CurrentUser, SummaryComment } from "./../../types"
import {
  getCurrentUser,
  createSummaryComment,
  createNotification
} from "./../../firebase/functions"
const user: CurrentUser = getCurrentUser()

type Props = {
  slug?: { id?: string }
  user_id: string
  summary_id: string
}

const SummaryCommentForm: FC<Props> = props => {
  const { slug, user_id, summary_id } = props

  const [comments, setComments] = useState<SummaryComment>({
    user_id,
    summary_id
  })
  const [summaryCommentList, setSummaryCommentList] = useState<
    SummaryComment[]
  >()
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
    if (!summary_id || !user_id || !comment) {
      console.log("no goot")
      return
    }

    if (window.confirm("記事を作成しますか？")) {
      const resCommnet: {
        id?: string
        status: number
      } = await createSummaryComment(comments)
      if (resCommnet && resCommnet.status === 200) {
        createNotification({
          user_id,
          target_id: resCommnet.id,
          type: "summary_comment"
        })
        history.push(`/summary/${slug.id}`)
      } else {
        console.log("失敗しました。")
        history.push(`/summary/${slug.id}`)
      }
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

  return (
    <>
      <div>
        <h3>コメント</h3>
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
