import "./App.css";
import useApp from "./useApp";

function App() {
  const { backToAllSpells, spells, openIndividualSpell, showingIndividual, handleDelete, newSpellProperties, changeSpellProperties, finishCreateForm, editSpell } = useApp();
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <a onClick={() => backToAllSpells()}>Home</a>
        </nav>
        <div>
          {spells.length > 0 ? (
            <ul>
              {spells.map((spell) => (
                <div>
                  <a onClick={() => openIndividualSpell(spell.id)}>
                    <p key={spell.id}>
                      {spell.name} {spell.damage && `- ${spell.damage} ${spell.damage_type && spell.damage_type}`}
                    </p>{" "}
                    {showingIndividual && (
                      <div>
                        <p>{spell.description}</p>
                        <p>{spell.school}</p>
                      </div>
                    )}
                  </a>
                  <button onClick={() => handleDelete(spell.id)}>Delete</button>
                </div>
              ))}
            </ul>
          ) : (
            <p>No spells to be shown</p>
          )}
        </div>
        <div>
          {!showingIndividual ? <h1>Add Spells</h1> : <h1>Edit Spell</h1>}
          <div className="addSpellForm">
            <div className="inputDiv">
              <p>Name</p>
              <input value={newSpellProperties.name} onChange={(e) => changeSpellProperties(e.target.value, "name")} />
            </div>
            <div className="inputDiv">
              <p>Damage</p>
              <input value={newSpellProperties.damage} onChange={(e) => changeSpellProperties(e.target.value, "damage")} />
            </div>
            <div className="inputDiv">
              <p>Description</p>
              <input value={newSpellProperties.description} onChange={(e) => changeSpellProperties(e.target.value, "description")} />
            </div>
            <div className="inputDiv">
              <p>Damage Type</p>
              <input value={newSpellProperties.damage_type} onChange={(e) => changeSpellProperties(e.target.value, "damage_type")} />
            </div>
            <div className="inputDiv">
              <p>School</p>
              <input value={newSpellProperties.school} onChange={(e) => changeSpellProperties(e.target.value, "school")} />
            </div>
            {showingIndividual ? <button onClick={() => editSpell(spells[0].id)}>Edit Spell</button> : <button onClick={() => finishCreateForm()}>Create New Spell</button>}
            {showingIndividual && <button onClick={() => backToAllSpells()}>Return to all spells</button>}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
