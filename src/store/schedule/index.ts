import { defineStore } from "pinia";
import type { Schedule, TrainingMoment } from "@/utils/models";
import { useApi } from "@/composable/useApi";
import { convertDateToYYYYMMDD, convertTimeToHHMM } from "@/utils/helpers";

export const useScheduleStore = defineStore('schedule', {
    state: () => ({
        schedules: [] as Schedule[]
    }),

    getters: {
        getCurrentSchoolSchedule: (state) => state.schedules
    },

    actions: {
        async getSchedulesBySchoolId(id: string){
            try {
                const response = await useApi(`/v1/schedules/school/${id}`);
                this.schedules = [];
                if (response.appointments && response.appointments.length > 0) {
                    response.appointments.forEach((appointment: Schedule) => {
                        console.log(appointment);
                        this.schedules.push({
                            id: appointment.id,
                            title: appointment?.group?.name,
                            color: appointment?.group?.color,
                            description: appointment.description,
                            isEditable: false,
                            weekDay: appointment?.weekDay,
                            coach: appointment.coach,
                            discipline: appointment?.discipline,
                            timeFrom: appointment?.timeFrom,
                            timeTo: appointment?.timeTo,
                            time: {
                                start: `${convertDateToYYYYMMDD(appointment.date)} ${convertTimeToHHMM(appointment?.timeFrom)}`,
                                end: `${convertDateToYYYYMMDD(appointment.date)} ${convertTimeToHHMM(appointment?.timeTo)}`
                            },
                            with: appointment?.group?.name
                        })
                    })
                }

                // response?.forEach((item: TrainingMoment) => {
                //     if (item.appointments && item.appointments.length > 0) {
                //         item.appointments.forEach((appointment: Schedule) => {
                //             console.log(appointment);
                //             this.schedules.push({
                //                 id: appointment.id,
                //                 title: appointment?.group?.name,
                //                 color: appointment?.group?.color,
                //                 description: appointment.description,
                //                 isEditable: false,
                //                 time: {
                //                     start: `${convertDateToYYYYMMDD(appointment.date)} ${convertTimeToHHMM(appointment?.timeFrom)}`,
                //                     end: `${convertDateToYYYYMMDD(appointment.date)} ${convertTimeToHHMM(appointment?.timeTo)}`
                //                 },
                //                 with: appointment?.group?.name
                //             })
                //         })
                //     }
                // })
            } catch (e) {
                console.error(e)
            }
        }
    }
})