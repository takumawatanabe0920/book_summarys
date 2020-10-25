import React, { FC } from "react"
import { number } from "prop-types"

type Props = {
  title: string
  value?: string
  required?: boolean
  name: string
  dataList: { id?: string; name?: string; slug?: string }[]
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select: FC<Props> = props => {
  const { title, required, value, name, onChange, dataList } = props
  // dataList &&
  //   dataList.forEach(data => {
  //     console.log(data)
  //   })
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
          <select value={value} name={name} onChange={onChange}>
            {dataList &&
              dataList.map(data => {
                return (
                  <option value={data.id} key={data.id}>
                    {data.name}
                  </option>
                )
              })}
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
