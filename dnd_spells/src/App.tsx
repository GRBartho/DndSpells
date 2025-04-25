import { useStyles } from "./AppStyles";
import useApp from "./useApp";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import CampaignsHomePage from "./components/Pages/CampaignsHomePage/CampaignsHomePage";

function App() {
  const classes = useStyles();
  const { currentUserId, setCurrentUserId, findUser, setCurrentTypedUser, loading, setLoading, simplifiedCampaigns, setSimplifiedCampaigns, fetchUserCampaigns, currentTypedUser } = useApp();
  return (
    <div className={classes.app}>
      {currentUserId === null && loading && <LoginPage currentTypedUser={currentTypedUser} setCurrentTypedUser={setCurrentTypedUser} findUser={findUser} />}
      {currentUserId !== null && (
        <CampaignsHomePage
          loading={loading}
          currentUserId={currentUserId}
          setCurrentUserId={setCurrentUserId}
          setLoading={setLoading}
          simplifiedCampaigns={simplifiedCampaigns}
          setSimplifiedCampaigns={setSimplifiedCampaigns}
          fetchUserCampaigns={fetchUserCampaigns}
        />
      )}
    </div>
  );
}

export default App;
