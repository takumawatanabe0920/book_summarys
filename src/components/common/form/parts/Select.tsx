import React, { FC } from "react"

type Props = {
  title: string
  value?: string
  required?: boolean
  name: string
}

const Select: FC<Props> = props => {
  const { title, required, value, name } = props
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
          <select value={value} name={name}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="mango">Mango</option>
          </select>
        </dd>
      </dl>
    </>
  )
}

Select.defaultProps = {
  required: false
}

export default Select
