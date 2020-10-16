import React, { FC } from "react"

type Props = {
  title: string
  value?: string
  placeholder?: string
  required?: boolean
  name: string
}

const Textarea: FC<Props> = props => {
  const { title, required, value, placeholder, name } = props
  return (
    <>
      <dl className="form-group">
        <dt>
          <label>
            {title}
            {required && <span className="req">必須</span>}
          </label>
        </dt>
        <dd>
          <textarea
            value={value}
            name={name}
            className="form-control"
            placeholder={placeholder}
          />
        </dd>
      </dl>
    </>
  )
}

Textarea.defaultProps = {
  required: false
}

export default Textarea
