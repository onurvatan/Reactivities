import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './navbar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDasboard';
import agent from '../api/agent';
import LoadingComponent from './loadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const { activityStore } = useStore();

  useEffect(() => {
    agent.Activities.list().then(response => {
      activityStore.loadActivities();
    })
  }, [activityStore])


  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
