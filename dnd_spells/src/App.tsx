import { Button, TextField, Typography } from "@mui/material";
import "./App.css";
import CharacterCard from "./components/CharacterCard/CharacterCard";
import NPCCard from "./components/NPCCard/NPCCard";
import QuestCard from "./components/QuestCard/QuestCard";
import NoteCard from "./components/NoteCard/NoteCard";
import FullCharacter from "./components/FullCharacter/FullCharacter";
import { useStyles } from "./AppStyles";
import useApp from "./useApp";
import NewCampaignDialog from "./components/Dialogs/NewCampaignDialog";
import { CampaignSimplified } from "./types";

function App() {
  const classes = useStyles();
  const {
    viewedCampaign,
    currentUserId,
    currentViewed,
    currentViewedCharacter,
    currentCampaign,
    editViewedCampaign,
    isCurrentViewed,
    deleteQuest,
    deleteCharacter,
    deleteSpell,
    deleteNPC,
    deleteNote,
    deleteCampaign,
    addCampaign,
    createCampaign,
    findUser,
    addNewCharacter,
    addNote,
    addQuest,
    addNPC,
    addSpell,
    campaigns,
    setCurrentTypedUser,
    setCurrentViewed,
    setCurrentViewedCharacter,
    setCurrentUserId,
    currentOpenModal,
    setCurrentOpenModal,
  } = useApp();
  return (
    <div className={classes.app}>
      {currentUserId === null && (
        <div className={classes.loginContainer}>
          <Typography className={classes.welcomeText} variant="h1">
            Welcome to the Campaign Manager
          </Typography>
          <TextField label="Username" variant="outlined" onChange={(e) => setCurrentTypedUser((user) => ({ ...user, username: e.target.value }))} />
          <TextField label="Password" variant="outlined" type="password" onChange={(e) => setCurrentTypedUser((user) => ({ ...user, password: e.target.value }))} />
          <Button variant="contained" onClick={() => findUser()} color="primary">
            Login
          </Button>
        </div>
      )}
      {currentUserId !== null && (
        <div className={classes.mainContainer}>
          <div className={classes.header}>
            <Typography variant="h2">Campaign Manager</Typography>
            <Button
              className={classes.logoutButton}
              variant="contained"
              onClick={() => {
                setCurrentUserId(null);
                localStorage.removeItem("currentUserId");
              }}
              color="primary"
            >
              Logout
            </Button>
          </div>
          {viewedCampaign !== null && (
            <Button variant="contained" onClick={() => editViewedCampaign(null)} color="primary">
              Back to Campaigns
            </Button>
          )}
          {viewedCampaign === null && (
            <div className={classes.campaignContainer}>
              {campaigns
                .filter((filteredCampaign) => filteredCampaign.userId === currentUserId)
                .map((campaign) => (
                  <div onClick={() => editViewedCampaign(campaign.id)} className={classes.campaignCard}>
                    <div>
                      <Typography variant="h2">{campaign.name}</Typography>
                      <Typography variant="h4">{campaign.system}</Typography>
                    </div>
                    <div>
                      <Button onClick={() => deleteCampaign(campaign.id)} variant="contained" color="primary">
                        Delete Campaign
                      </Button>
                    </div>
                  </div>
                ))}
              <div className={classes.addNew} onClick={() => addCampaign()}>
                <Typography>Add new Campaign</Typography>
              </div>
            </div>
          )}
          {viewedCampaign !== null && (
            <div className={classes.campaignDetailsContainer}>
              {currentCampaign && (
                <div className={classes.campaignDetails}>
                  <Typography variant="h1">{currentCampaign.name}</Typography>
                  <div className={classes.buttonsDiv}>
                    <Button
                      size="small"
                      variant={isCurrentViewed("Notes") ? "contained" : "outlined"}
                      onClick={() => {
                        setCurrentViewed("Notes");
                      }}
                    >
                      Notes
                    </Button>
                    <Button
                      size="small"
                      variant={isCurrentViewed("Quests") ? "contained" : "outlined"}
                      onClick={() => {
                        setCurrentViewed("Quests");
                      }}
                    >
                      Quests
                    </Button>
                    <Button
                      size="small"
                      variant={isCurrentViewed("Characters") ? "contained" : "outlined"}
                      onClick={() => {
                        setCurrentViewed("Characters");
                      }}
                    >
                      Characters
                    </Button>
                    <Button
                      size="small"
                      variant={isCurrentViewed("NPCs") ? "contained" : "outlined"}
                      onClick={() => {
                        setCurrentViewed("NPCs");
                      }}
                    >
                      NPCs
                    </Button>
                  </div>
                  {currentViewed === "Notes" && (
                    <div className={classes.notesContainer}>
                      <Typography variant="h2">Notes</Typography>
                      {currentCampaign.notes.map((note, index) => (
                        <NoteCard deleteNote={deleteNote} key={index} note={note} />
                      ))}
                      <div className={classes.addNew} onClick={() => addNote()}>
                        <Typography>Add new Note</Typography>
                      </div>
                    </div>
                  )}
                  {currentViewed === "Quests" && (
                    <div className={classes.questsContainer}>
                      <Typography variant="h2">Quests</Typography>
                      {currentCampaign.quests.map((quest, index) => (
                        <QuestCard deleteFunction={deleteQuest} key={index} quest={quest} />
                      ))}
                      <div className={classes.addNew} onClick={() => addQuest()}>
                        <Typography>Add new Quest</Typography>
                      </div>
                    </div>
                  )}
                  {currentViewed === "Characters" && (
                    <div className={classes.outerCharacterContainer}>
                      {currentViewedCharacter === null && (
                        <div className={classes.outerCharacterContainer}>
                          <Typography variant="h2">Characters</Typography>
                          <div className={classes.characterContainer}>
                            {currentCampaign.characters.map((character, index) => (
                              <CharacterCard
                                onClick={() => {
                                  setCurrentViewedCharacter(character.id);
                                }}
                                character={character}
                              />
                            ))}
                            <div className={classes.addNew} onClick={() => addNewCharacter()}>
                              <Typography>Add new Character</Typography>
                            </div>
                          </div>
                        </div>
                      )}
                      {currentViewedCharacter !== null && (
                        <FullCharacter
                          addNewSpell={addSpell}
                          deleteCharacter={deleteCharacter}
                          deleteSpell={deleteSpell}
                          exit={() => setCurrentViewedCharacter(null)}
                          character={currentCampaign.characters.filter((character) => character.id === currentViewedCharacter)[0]}
                        />
                      )}
                    </div>
                  )}
                  {currentViewed === "NPCs" && (
                    <div className={classes.questsContainer}>
                      <Typography variant="h2">NPCs</Typography>
                      {currentCampaign.npcs.map((npc, index) => (
                        <NPCCard deleteNPC={deleteNPC} key={index} npc={npc} />
                      ))}
                      <div className={classes.addNew} onClick={() => addNPC()}>
                        <Typography>Add new NPC</Typography>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          <NewCampaignDialog open={currentOpenModal === "campaign"} createCampaign={createCampaign} close={() => setCurrentOpenModal(null)} currentUserId={currentUserId} />
        </div>
      )}
    </div>
  );
}

export default App;
