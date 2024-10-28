type Role = "Freemium" | "Premium";

export interface UserInterface {
    id: string;
    fullName: string;
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date | null;
}
