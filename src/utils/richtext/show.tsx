import React, { FC, useRef, useState } from "react"
import { EditorState, convertFromRaw } from "draft-js"
import Editor from "draft-js-plugins-editor"
import { json } from "body-parser"
type Props = {
  editorState: any
}
const ReadOnlyEditor: FC<Props> = props => {
  const { editorState } = props
  const [editorStates, setEditorStates] = useState(editorState)
  const contentState = editorState
    ? EditorState.createWithContent(convertFromRaw(JSON.parse(editorState)))
    : ""

  return (
    <div className="readonly-editor">
      {contentState && (
        <Editor
          editorState={contentState}
          onChange={setEditorStates}
          readOnly={true}
        />
      )}
    </div>
  )
}

export default ReadOnlyEditor
