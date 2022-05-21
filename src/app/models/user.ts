import { Role } from "./role";

export class User {
    id!: number;
    name!: string;
    username!: string;
    password!: string;
    avatar!: string;
    role:Role[] = [];
}