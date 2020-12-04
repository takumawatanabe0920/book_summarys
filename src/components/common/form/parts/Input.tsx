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
    accept
  } = props
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
            accept={accept}
            className={type === "file" ? "" : "form-control"}
            placeholder={placeholder}
            onChange={onChange}
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
