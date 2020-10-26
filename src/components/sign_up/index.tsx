import React, { useState, useEffect } from "react"
import firebase from "./../../firebase/config"
import Input from "../common/form/parts/Input"
const db = firebase.firestore()
import { User } from "../../types/user"
import {
  getCategory,
  getSubCategory,
  getSummaryBook
} from "../../utils/functions"

const SignUpPage = () => {
  const [summarybook, setSummaryBook] = useState<User>({})

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
      <div className="summary_main">
        <div className="main-block">
          <div className="prof-area">
            <div className="_icon">
              <img src="" alt="" />
            </div>
            <div className="_icon">渡辺拓馬</div>
          </div>
          <div className="summary-show">
            <div className="_header">
              <h1 className="main-title blue-main-title">{}</h1>
              <div className="tags">
                {/* TODO リンク：カテゴリー記事に飛ばす */}
                <span className="tag">{}</span>
                <span className="tag">{}</span>
              </div>
            </div>
            <div className="_body">
              <p className="_txt">{}</p>
            </div>
            <div className="_footer">
              <dl>
                <dt>値段：</dt>
                <dd>{}円</dd>
              </dl>
              <dl>
                <dt>著者：</dt>
                <dd>{}</dd>
              </dl>
              <dl>
                <dt>商品リンク：</dt>
                <dd>{}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUpPage
