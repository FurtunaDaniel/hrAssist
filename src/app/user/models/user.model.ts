import { Injectable } from '@angular/core';

export interface User {
	id: number;
	first_name?: string;
	middle_name?: string;
	last_name?: string;
	birthday?: any;
	cnp?: any;
	city?: string;
	zip_code?: any;
	address?: string;
	phone?: any;
	other_email?: any;
	car_plate?: any;
	company_start_date?: any;
	office_nr?: any;
	picture?: any;
	observations?: any;
	urgent_contact_name?: string;
	urgent_contact_phone?: string;
	positon: string;
	work_info: {
		ssh_public_key: string;
		bitbucket: string;
		github: string;
	};
	schedule_id?: any;
	status?: any;
	uid?: any;
	auth_token?: string;
	reg_status?: string;
	company_end_date?: any;
	email?: string;
	is_active?: boolean;
	test?: any;

	// constructor(
	// 	id: number,
	// 	first_name?: string,
	// 	middle_name?: string,
	// 	last_name?: string,
	// 	birthday?: any,
	// 	cnp?: any,
	// 	city?: string,
	// 	zip_code?: any,
	// 	address?: string,
	// 	phone?: any,
	// 	other_email?: any,
	// 	car_plate?: any,
	// 	company_start_date?: any,
	// 	office_nr?: any,
	// 	picture?: any,
	// 	observations?: any,
	// 	urgent_contact_name?: string,
	// 	urgent_contact_phone?: string,
	// 	work_info?: Object,
	// 	schedule_id?: any,
	// 	status?: any,
	// 	uid?: any,
	// 	auth_token?: string,
	// 	reg_status?: string,
	// 	company_end_date?: any,
	// 	email?: string,
	// 	is_active?: boolean,
	// 	test?: any
	// ) {
	// 	this.id = id || 0;
	// 	this.first_name = first_name || '';
	// 	this.middle_name = middle_name || '';
	// 	this.last_name = last_name || '';
	// 	this.birthday = birthday || '';
	// 	this.cnp = cnp || '';
	// 	this.city = city || '';
	// 	this.zip_code = zip_code || '';
	// 	this.address = address || '';
	// 	this.phone = phone || '';
	// 	this.other_email = other_email || '';
	// 	this.car_plate = car_plate || '';
	// 	this.company_start_date = company_start_date || '';
	// 	this.office_nr = office_nr || '';
	// 	this.picture = picture || '';
	// 	this.observations = observations || '';
	// 	this.urgent_contact_name = urgent_contact_name || '';
	// 	this.urgent_contact_phone = urgent_contact_phone || '';
	// 	this.work_info = work_info || {};
	// 	this.schedule_id = schedule_id || '';
	// 	this.status = status || '';
	// 	this.uid = uid || '';
	// 	this.auth_token = auth_token || '';
	// 	this.reg_status = reg_status || '';
	// 	this.company_end_date = company_end_date || '';
	// 	this.email = email || '';
	// 	this.is_active = is_active || false;
	// }
}
