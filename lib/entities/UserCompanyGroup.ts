import { Company } from './Company';

export interface UserCompanyGroupBase {
    id: string;
    userId: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserCompanyGroup extends UserCompanyGroupBase {
    companies: Company[];
}

export interface UserCompanyGroupListElement extends UserCompanyGroupBase {
    companies: { id: string }[],
}
