export interface Lesson {
    "type-sport": string;
    coach: string;
    "age-group": string;
    time: string;
    days: string[];
}

export const lessons: Lesson[] = [
    {
        "type-sport": "Футбол",
        coach: "Криштиану Роналду",
        "age-group": "Младшая",
        time: "10:00-12:00",
        days: ["Пн", "Чт", "Сб"]
    },
    {
        "type-sport": "Бокс",
        coach: "Геннадий Головкин",
        "age-group": "Старшая",
        time: "12:00-14:00",
        days: ["Вт", "Ср", "Чт"]
    },
    {
        "type-sport": "Бокс",
        coach: "Сауль Альварес",
        "age-group": "Старшая",
        time: "12:00-14:00",
        days: ["Вт", "Чт", "Сб"]
    }
];
