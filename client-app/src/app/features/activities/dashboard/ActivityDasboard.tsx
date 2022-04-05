import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../Form/ActivityForm";
import ActivityList from "./ActivityList";


export default observer(function ActivityDashboard(): JSX.Element {

    const { activityStore } = useStore();
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {
                    activityStore.selectedActivity && !activityStore.editMode &&
                    <ActivityDetails />
                }
                {
                    activityStore.editMode &&
                    <ActivityForm />
                }
            </Grid.Column>
        </Grid>
    )
})