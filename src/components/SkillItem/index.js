import './index.css'

const SkillItem = props => {
  const {skillData} = props
  const updatedSkillData = {
    imageUrl: skillData.image_url,
    name: skillData.name,
  }
  const {imageUrl, name} = updatedSkillData
  return (
    <li className="skill-container">
      <img src={imageUrl} alt={name} className="skill-img" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillItem
