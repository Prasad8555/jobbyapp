import './index.css'

const SalaryTypeCategoryItem = props => {
  const {eachSalaryRange} = props
  const {label, salaryRangeId} = eachSalaryRange

  const changeCheckboxStatus = event => {
    const {onSalaryRangeCategoryItem} = props
    const checkboxStatus = event.target.checked
    if (checkboxStatus === true) {
      onSalaryRangeCategoryItem(salaryRangeId)
    } else {
      onSalaryRangeCategoryItem('')
    }
  }

  return (
    <li className="category-item">
      <input
        type="radio"
        id={salaryRangeId}
        name="salary"
        className="radio"
        value={salaryRangeId}
        onChange={changeCheckboxStatus}
      />
      <label htmlFor={salaryRangeId} className="checkbox-label">
        {label}
      </label>
    </li>
  )
}

export default SalaryTypeCategoryItem
