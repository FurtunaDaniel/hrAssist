import { User } from '@app/core/models/user.model';

export interface AuthUser {
	custom_token: string;
	status: string;
	user: User;
}
