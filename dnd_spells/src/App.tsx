import "./App.css";
import useApp from "./useApp";

function App() {
  const { backToAllSpells, spells, openIndividualSpell, showingIndividual, handleDelete, newSpellProperties, changeSpellProperties, finishCreateForm, editSpell } = useApp();
  return (
    <div className="App">
      <nav className="nav">
        <a onClick={() => backToAllSpells()} className="homeButton">
          Home
        </a>
      </nav>
      <header className="App-header">
        <div>
          {!showingIndividual ? <h1>Add Spells</h1> : <h1>Edit Spell</h1>}
          <div className="addSpellForm">
            <div className="inputDiv">
              <p>Name</p>
              <input className="input" value={newSpellProperties.name} onChange={(e) => changeSpellProperties(e.target.value, "name")} />
            </div>
            <div className="inputDiv">
              <p>Damage</p>
              <input className="input" value={newSpellProperties.damage} onChange={(e) => changeSpellProperties(e.target.value, "damage")} />
            </div>
            <div className="inputDiv">
              <p>Damage Type</p>
              <input className="input" value={newSpellProperties.damage_type} onChange={(e) => changeSpellProperties(e.target.value, "damage_type")} />
            </div>
            <div className="inputDiv">
              <p>School</p>
              <input className="input" value={newSpellProperties.school} onChange={(e) => changeSpellProperties(e.target.value, "school")} />
            </div>
            <div className="inputDiv">
              <p>Description</p>
              <input className="input" value={newSpellProperties.description} onChange={(e) => changeSpellProperties(e.target.value, "description")} />
            </div>
            {showingIndividual ? (
              <button className="button" onClick={() => editSpell(spells[0].id)}>
                Edit Spell
              </button>
            ) : (
              <button className="button" onClick={() => finishCreateForm()}>
                Create New Spell
              </button>
            )}
            {showingIndividual && (
              <button className="button" onClick={() => backToAllSpells()}>
                Return to all spells
              </button>
            )}
          </div>
        </div>
        <div>
          {spells.length > 0 ? (
            <ul className="spellList">
              {spells.map((spell) => (
                <div className="spellCard">
                  <div className="spellInfo" onClick={() => openIndividualSpell(spell.id)}>
                    <div className="spellProperty">
                      <p className="label">Name: </p>
                      <p className="text">{spell.name}</p>
                    </div>
                    {spell.damage && (
                      <div className="spellProperty">
                        <p className="label">Damage: </p>
                        <p className="text">
                          {spell.damage} {spell.damage_type}
                        </p>
                      </div>
                    )}
                    {showingIndividual && (
                      <div>
                        <div className="spellProperty">
                          <p className="label">Description: </p>
                          <p className="text">{spell.description}</p>
                        </div>
                        <div className="spellProperty">
                          <p className="label">School: </p>
                          <p className="text">{spell.school}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <button className="deleteButton" onClick={() => handleDelete(spell.id)}>
                    Delete
                  </button>
                </div>
              ))}
            </ul>
          ) : (
            <p>No spells to be shown</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
