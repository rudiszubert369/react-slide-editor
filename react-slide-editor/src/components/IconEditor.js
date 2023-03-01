import useIconNames from '../hooks/useIconNames';

function IconEditor({ onIconSelect }) {
  const icons = useIconNames();
  const firstTwentyIcons = icons.slice(0, 200)
  return (
    <div>
      <ul>
        {firstTwentyIcons.map((icon) => (
          <li key={icon} onClick={(e) => onIconSelect(e.target.innerText)}><span className="material-icons">{icon}</span></li>
        ))}
      </ul>
    </div>
  );

}

export default IconEditor;