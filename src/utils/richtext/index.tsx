import React from "react"
import { EditorState, RichUtils, getDefaultKeyBinding } from "draft-js"
import { Map } from "immutable"
import Editor from "draft-js-plugins-editor"
import createImagePlugin from "draft-js-image-plugin"
import { FontAwesomeIcon, faListUl, faListOl } from "./../../utils/fontawesome"

const imagePlugin = createImagePlugin()

const plugins = [imagePlugin]

import "draft-js/dist/Draft.css"
import "draft-js-image-plugin/lib/plugin.css"

const { useState, useRef, useCallback } = React

const RichEditor = (props: any) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const editor = useRef(null)

  const focus = () => {
    if (editor.current) editor.current.focus()
  }

  const handleKeyCommand = useCallback(
    (command, editorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command)
      if (newState) {
        setEditorState(newState)
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
            setEditorState(newEditorState)
          }
          return null
      }
      return getDefaultKeyBinding(e)
    },
    [editorState, setEditorState]
  )

  const customRenderMap = Map({
    unstyled: {
      element: "p",
      aliasedElements: ["p"]
    }
  })

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
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
    <div className="RichEditor-root">
      <BlockStyleControls
        editorState={editorState}
        onToggle={(blockType: any) => {
          const newState = RichUtils.toggleBlockType(editorState, blockType)
          setEditorState(newState)
        }}
      />
      <InlineStyleControls
        editorState={editorState}
        onToggle={(inlineStyle: any) => {
          const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle)
          setEditorState(newState)
        }}
      />
      <div className={className} onClick={focus}>
        <Editor
          blockRenderMap={customRenderMap}
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          plugins={plugins}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={setEditorState}
          ref={editor}
          spellCheck={true}
        />
      </div>
    </div>
  )
}

// Custom overrides for "code" style.
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
        <FontAwesomeIcon icon={label} />
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
    label: faListUl,
    style: "unordered-list-item",
    iconType: "icon"
  },
  { label: faListOl, style: "ordered-list-item", iconType: "icon" }
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
