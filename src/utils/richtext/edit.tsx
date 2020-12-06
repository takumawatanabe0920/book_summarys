import React, { FC } from "react"
import {
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
  convertFromRaw
} from "draft-js"
import { Map } from "immutable"
import Editor from "draft-js-plugins-editor"
import { iconUl, iconOl } from "../icons"
import "draft-js/dist/Draft.css"

const { useState, useRef, useCallback } = React

type Props = {
  title: string
  required?: boolean
  errorMessage?: string
  value?: any
  handleEditorChange: (value: any) => void
}

const RichEditor: FC<Props> = props => {
  const { title, required, handleEditorChange, errorMessage, value } = props
  const [editorState, setEditorState] = useState(
    value
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
      : EditorState.createEmpty()
  )
  const editor = useRef(null)

  const focus = () => {
    if (editor.current) editor.current.focus()
  }

  const handleKeyCommand = useCallback(
    (command, editorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command)
      if (newState) {
        onChangeState(newState)
        return "handled"
      }
      return "not-handled"
    },
    [editorState, setEditorState]
  )

  const mapKeyToEditorCommand = useCallback(
    e => {
      switch (e.keyCode) {
        case 9: // TAB
          const newEditorState = RichUtils.onTab(
            e,
            editorState,
            4 /* maxDepth */
          )
          if (newEditorState !== editorState) {
            onChangeState(newEditorState)
          }
          return null
      }
      return getDefaultKeyBinding(e)
    },
    [editorState, setEditorState]
  )

  const customRenderMap = Map({
    unstyled: {
      element: "div",
      aliasedElements: ["p"]
    }
  })

  const onChangeState = (newState: EditorState): void => {
    setEditorState(newState)
    const contentState = newState.getCurrentContent()
    const content = convertToRaw(contentState)
    handleEditorChange(JSON.stringify(content))
  }

  let className = "RichEditor-editor"
  var contentState = editorState.getCurrentContent()

  if (!contentState.hasText()) {
    if (
      contentState
        .getBlockMap()
        .first()
        .getType() !== "unstyled"
    ) {
      className += " RichEditor-hidePlaceholder"
    }
  }

  return (
    <>
      <dl className="form-group">
        <dt>
          <label>
            {title}
            {required && <span className="req">必須</span>}
            {errorMessage && <p className="_error-message">{errorMessage}</p>}
          </label>
        </dt>
        <dd>
          <div className="RichEditor-root">
            <BlockStyleControls
              editorState={editorState}
              onToggle={(blockType: any) => {
                const newState = RichUtils.toggleBlockType(
                  editorState,
                  blockType
                )
                onChangeState(newState)
              }}
            />
            <InlineStyleControls
              editorState={editorState}
              onToggle={(inlineStyle: any) => {
                const newState = RichUtils.toggleInlineStyle(
                  editorState,
                  inlineStyle
                )
                onChangeState(newState)
              }}
            />
            <div className={className} onClick={focus}>
              <Editor
                blockRenderMap={customRenderMap}
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                keyBindingFn={mapKeyToEditorCommand}
                onChange={onChangeState}
                ref={editor}
                spellCheck={true}
              />
            </div>
          </div>
        </dd>
      </dl>
    </>
  )
}

const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
}

function getBlockStyle(block: any) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote"
    default:
      return null
  }
}

const StyleButton = (props: any) => {
  const { onToggle, active, label, style, type } = props
  let className = "RichEditor-styleButton"
  if (active) {
    className += " RichEditor-activeButton"
  }

  if (type == "text") {
    return (
      <span
        className={className}
        onMouseDown={e => {
          e.preventDefault()
          onToggle(style)
        }}
        dangerouslySetInnerHTML={{ __html: label }}
      ></span>
    )
  } else if (type === "icon") {
    return (
      <span
        className={className}
        onMouseDown={e => {
          e.preventDefault()
          onToggle(style)
        }}
      >
        <img src={label} />
      </span>
    )
  }
}

const BLOCK_TYPES = [
  { label: "メインタイトル", style: "header-one", iconType: "text" },
  { label: "サブタイトル", style: "header-two", iconType: "text" },
  { label: `大文字`, style: "header-three", iconType: "text" },
  {
    label: `<blockquote>A</blockquote>`,
    style: "blockquote",
    iconType: "text"
  },
  {
    label: iconUl,
    style: "unordered-list-item",
    iconType: "icon"
  },
  { label: iconOl, style: "ordered-list-item", iconType: "icon" }
]

const BlockStyleControls = (props: any) => {
  const { editorState, onToggle } = props
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type, index) => (
        <StyleButton
          key={index}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
          type={type.iconType}
        />
      ))}
    </div>
  )
}

const INLINE_STYLES = [
  { label: `<b>B</b>`, style: "BOLD", iconType: "text" },
  { label: `<em>A</em>`, style: "ITALIC", iconType: "text" },
  {
    label: `<span class="under-line">A</span>`,
    style: "UNDERLINE",
    iconType: "text"
  }
]

const InlineStyleControls = (props: any) => {
  const { editorState, onToggle } = props
  const currentStyle = editorState.getCurrentInlineStyle()
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type, index) => (
        <StyleButton
          key={index}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
          type={type.iconType}
        />
      ))}
    </div>
  )
}

export default RichEditor
