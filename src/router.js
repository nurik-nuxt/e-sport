import {createRouter, createWebHashHistory} from 'vue-router';
import QazMap from './components/QazMap.vue';
import SportSchools from './components/SportSchools.vue';
import PersonalAccount from './components/PersonalAccount/PersonalAccount.vue';
import SchoolData from './components/SportSchools/SchoolData.vue';
import AddSchoolPage from './components/addItem/addSchoolPage.vue';
import Schedules from "./views/schedules.vue";
import SportsMenProfile from './components/SportSchools/SportsMenProfile.vue';
import EventsBlock from "./components/News-Events/EventsBlock.vue";
import NewsEventsPage from "./components/News-Events/NewsEventsPage.vue";
import NewsBlock from "./components/News-Events/NewsBlock.vue";
import EventItem from "./components/News-Events/EventItem.vue";
import AddEvent from "./components/addItem/addEvent.vue";
import CreateAboutParticipants from "@/components/News-Events/CreateAboutParticipants.vue";
import CoachProfile from "@/components/SportSchools/CoachProfile.vue";
import NewsItem from "./components/News-Events/NewsItem.vue";
import EditAboutEvent from "@/components/News-Events/EditAboutEvent.vue";
import EditEvent from "@/components/News-Events/EditEvent.vue";
import Statistics from "./views/statistics.vue";
import OnlyRequestParticipation from "@/components/News-Events/OnlyRequestParticipation.vue";
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/QazMap', component: QazMap, alias: '/' },
        { path: '/SportSchools', component: SportSchools },
        { path: '/PersonalAccount', component: PersonalAccount},
        { path: '/statistics', component: Statistics},
        {   path: '/school/:id',
            name: 'SchoolData',
            component: SchoolData,
            props: true 
        },
        { path: '/AddSchool', component: AddSchoolPage},
        { path: '/sportsmen-profile/:id', component: SportsMenProfile},
        { path:'/coach-profile/:id', component: CoachProfile},
        { path: '/schedules', component: Schedules },
        {
            path: '/news-events',
            component: NewsEventsPage,
            redirect: '/news-events/events',
            children: [
                {
                    path: 'news',
                    components: {
                        default: NewsEventsPage,
                        newsEventsPage: NewsBlock
                    }
                },
                {
                    path: 'events',
                    components: {
                        default: NewsEventsPage,
                        newsEventsPage: EventsBlock
                    },
                },
            ]
        },
        {
            path: '/news/:id',
            name: 'NewsItem',
            components: {
                default: NewsItem, // Ensure this is correctly set
            },
            props: true
        },
        {
            path: '/events/:id',
            name: 'EventItem',
            component: EventItem,
        },
        {
            path: '/create-event',
            component: AddEvent,
        },
        {
            path: '/edite-event/:id',
            component: EditEvent,
            redirect: '/edite-event/:id/about-event',
            children: [
                {
                    path: 'about-event',
                    components: {
                        default: EditEvent,
                        editEvent: EditAboutEvent
                    }
                },
                {
                    path: 'participants-event',
                    components: {
                        default: EditEvent,
                        editEvent: CreateAboutParticipants
                    }
                },
            ]
        },
        {
            path: '/edite-event/:id/only-request-participation',
            component: OnlyRequestParticipation,
        }
    ]
})
export default router;