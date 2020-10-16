import React from "react"

function SammaryForm() {
  return (
    <>
      <form className="form-table">
        <dl className="form-group">
          <dt>
            <label>
              URL
              <span className="req">必須</span>
            </label>
          </dt>
          <dd>
            <input
              v-model="formData.slug"
              type="text"
              className="form-control"
              placeholder="URL名"
            />
          </dd>
        </dl>
        <dl className="form-group">
          <dt>
            <label>
              タイトル
              <span className="req">必須</span>
            </label>
          </dt>
          <dd>
            <input
              type="text"
              className="form-control"
              placeholder="タイトル"
            />
          </dd>
        </dl>
        <dl className="form-group">
          <dt>
            <label>
              URL
              <span className="req">必須</span>
            </label>
          </dt>
          <dd>
            <input
              v-model="formData.slug"
              type="text"
              className="form-control"
              placeholder="URL名"
            />
          </dd>
        </dl>
        <dl className="form-group">
          <dt>
            <label>
              タイトル
              <span className="req">必須</span>
            </label>
          </dt>
          <dd>
            <input
              type="text"
              className="form-control"
              placeholder="タイトル"
            />
          </dd>
        </dl>

        <div className="btn-area mgt-2 inline">
          <button className="_btn submit" type="submit">
            作成して記事を編集
          </button>
          <button className="_btn submit" type="submit">
            編集する
          </button>
          <button className="_btn remove" type="button">
            削除する
          </button>
        </div>
      </form>
    </>
  )
}

export default SammaryForm
