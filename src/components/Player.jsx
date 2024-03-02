import { useState } from 'react'
export default ({initailName, symbol, isActive, onChangeName }) => {
    const [playerName, setPlayerName] = useState(initailName)
    const [isEditing, setIsEditing] = useState(false)
    const handleEditing = () => {
        setIsEditing((editing) => !editing)
        if (isEditing){
          onChangeName(symbol, playerName)
        }
    }

    let editablPlayerName = <span className="player-name">{playerName}</span>
    if (isEditing){
      editablPlayerName = (<input type="text" required value={playerName} onChange={(e) => setPlayerName(e.target.value)} />
      );
    }
    return(    
        <li className={isActive ? "active" : undefined}>
            <span className="player">
              {editablPlayerName}
              <span className="player-symbol">{symbol}</span>  
            </span>
            <button onClick={handleEditing}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}