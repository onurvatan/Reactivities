import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../layout/loadingComponent";
import { useStore } from "../../../stores/store";
import { v4 as uuid } from 'uuid';

export default observer(function ActivityForm() {

    const { activityStore } = useStore();
    const { submitting, createActivity, updateActivity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [activity, setActivity] = useState({

        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''

    });

    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(activity!));
        }
    }, [id, loadActivity]);

    function handleSubmit() {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => {
                history.push(`/activities/${newActivity.id}`);
            });

        }
        else {
            updateActivity(activity).then(() => {
                history.push(`/activities/${activity.id}`);
            });
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    if (loadingInitial) return <LoadingComponent content='Loading Activity...' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' name='category' value={activity.category} onChange={handleInputChange} />
                <Form.Input placeholder='Date' type="date" name='date' value={activity.date} onChange={handleInputChange} />
                <Form.Input placeholder='City' name='city' value={activity.city} onChange={handleInputChange} />
                <Form.Input placeholder='Venue' name='venue' value={activity.venue} onChange={handleInputChange} />
                <Button loading={submitting} floated="right" positive type='submit' content='Submit' />
                <Button as={Link} to={`/activities`} floated="right" type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})