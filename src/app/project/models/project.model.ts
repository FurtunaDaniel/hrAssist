export interface Project {
	id: number;
	name: string;
	activities: Array<any>;
	main_activities: any;
	description: string;
	start_date: string;
	deadline: string;
	end_date: string;
	application_types: string;
	assist_url: string;
	in_progress: boolean;
	team_leader_id: number;
	url: string;
}
