import {createRouter, createWebHashHistory} from 'vue-router';
import QazMap from './components/QazMap.vue';
import SportSchools from './components/SportSchools.vue';
import PersonalAccount from './components/PersonalAccount/PersonalAccount.vue';
import SchoolData from './components/SportSchools/SchoolData.vue';
import AddSchoolPage from './components/addItem/addSchoolPage.vue';
import SchoolInfo from './components/SportSchools/SchoolInfo.vue';
import Schedules from "./views/schedules.vue";
import SportsMenProfile from './components/SportSchools/SportsMenProfile.vue';
import EventsBlock from "./components/News-Events/EventsBlock.vue";
import NewsEventsPage from "./components/News-Events/NewsEventsPage.vue";
import NewsBlock from "./components/News-Events/NewsBlock.vue";
import EventItem from "./components/News-Events/EventItem.vue";
import AddEvent from "./components/addItem/addEvent.vue";
import CreateAboutEvent from "@/components/News-Events/CreateAboutEvent.vue";
import CreateAboutParticipants from "@/components/News-Events/CreateAboutParticipants.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/QazMap', component: QazMap, alias: '/' },
        { path: '/SportSchools', component: SportSchools },
        { path: '/PersonalAccount', component: PersonalAccount},
        // { path: '/SchoolData', component: SchoolData},  
        {   path: '/school/:id',
            name: 'SchoolData',
            component: SchoolData,
            props: true 
        },
        { path: '/AddSchool', component: AddSchoolPage},
        { path: '/SportsmenProfile', component: SportsMenProfile},
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
            path: '/events/:id',
            components: {
                default: EventItem,
                // newsEventsPage: EventItem
            }
        },
        {
            path: '/create-event',
            component: AddEvent,
            redirect: '/create-event/create-about-event',
            children: [
                {
                    path: 'create-about-event',
                    components: {
                        "createEvent": CreateAboutEvent
                    }
                },
                {
                    path: 'create-about-participants',
                    components: {
                        "createEvent": CreateAboutParticipants
                    }
                }
            ]
        }

    ]
})
export default router;