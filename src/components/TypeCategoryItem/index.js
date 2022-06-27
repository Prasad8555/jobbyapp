import './index.css'

const TypeCategoryItem = props => {
  const {eachEmploymentType} = props
  const {label, employmentTypeId} = eachEmploymentType

  const onClickCategoryCheckbox = event => {
    const {onClickTypeCategoryItem} = props
    const checkboxStatus = event.target.checked
    if (checkboxStatus === true) {
      onClickTypeCategoryItem(employmentTypeId)
    }
  }

  return (
    <li className="category-item">
      <input
        type="checkbox"
        id={employmentTypeId}
        className="checkbox"
        onChange={onClickCategoryCheckbox}
      />
      <label htmlFor={employmentTypeId} className="checkbox-label">
        {label}
      </label>
    </li>
  )
}

export default TypeCategoryItem
