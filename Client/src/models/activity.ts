export interface Activity {
    id: number;
    userId: number;
    activity: string;
    duration: number;
    distance?: number;
    calories: number;
    date: string;
    imageUrl?: string;
}
