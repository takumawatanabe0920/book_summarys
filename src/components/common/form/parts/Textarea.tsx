import React, { FC } from "react"

type Props = {
  title: string
  value?: string
  placeholder?: string
  required?: boolean
  name: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const Textarea: FC<Props> = props => {
  const { title, required, value, placeholder, name, onChange } = props
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
            onChange={onChange}
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
