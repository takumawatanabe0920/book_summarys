import React, { FC } from "react"
import TextField from "@material-ui/core/TextField"

type Props = {
  title: string
  value?: string
  type?: string
  placeholder?: string
  accept?: string
  required?: boolean
  name?: string
  errorMessage?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<Props> = props => {
  const {
    title,
    required,
    type,
    value,
    placeholder,
    name,
    onChange,
    accept,
    errorMessage
  } = props
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
          <input
            value={value}
            name={name}
            type={type}
            accept={accept}
            className={type === "file" ? "" : "form-control"}
            onChange={onChange}
          />
          {placeholder && <p className="_example-form">例）{placeholder}</p>}
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
