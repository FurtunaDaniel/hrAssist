export class User {

	id: number;
	first_name: string;
	middle_name: string;
	last_name: string;
	birthday: any;
	cnp: any;
	city: string;
	zip_code: any;
	address: string;
	phone: any;
	other_email: any;
	car_plate: any;
	company_start_date: any;
	office_nr: any;
	picture: any;
	observations: any;
	urgent_contact_name: string;
	urgent_contact_phone: string;
	positon: string;
	work_info: {
		ssh_public_key: string;
		bitbucket: string;
		github: string;
	};
	schedule_id: any;
	status: any;
	uid: any;
	auth_token: string;
	reg_status: string;
	company_end_date: any;
	email: string;
	is_active: boolean;

	get fullName(): string {
		return this.first_name + this.last_name;
	}

	deserialize(input: any): this {
		Object.assign(this, input);
		return this;
	}
}
