export interface Activity {
    id: number;
    userId: number;
    activity: String;
    duration: number;
    distance?: number;
    calories: number;
    date: string;
}
