import React, { FC } from "react"

type Props = {
  title: string
  value?: string
  type?: string
  placeholder?: string
  required?: boolean
  name: string
}

const Input: FC<Props> = props => {
  const { title, required, type, value, placeholder, name } = props
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
          <input
            value={value}
            name={name}
            type={type}
            className="form-control"
            placeholder={placeholder}
          />
        </dd>
      </dl>
    </>
  )
}

Input.defaultProps = {
  type: "text",
  required: false
}

export default Input
