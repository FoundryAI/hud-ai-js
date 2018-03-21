import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { Person } from '../entities';

export interface PersonListAttributes extends HudAiListAttributes {
    companyId?: string;
    name?: string;
    title?: string;
    term?: string;
    twitterHandle?: string;
    sortBy?: string;
}

export interface PersonCreateAttributes extends HudAiCreateAttributes {
    name: string;
    title: string;
    imageUrl?: string;
    linkedInUrl?: string;
    twitterHandle?: string;
}

export interface PersonUpdateAttributes extends HudAiUpdateAttributes {
    name?: string;
    title?: string;
    imageUrl?: string;
    flag?: string;
    linkedInUrl?: string;
    twitterHandle?: string;
}

export class PersonResource extends Resource<Person, PersonListAttributes, PersonCreateAttributes, PersonUpdateAttributes> {
    constructor(requestManager: RequestManager) {
        super('/people', requestManager);
    }

    public list(listArgs: PersonListAttributes): Promise<{ count: number, rows: Person[] }> {
        return this._list(listArgs);
    }

    public create(createArgs: PersonCreateAttributes): Promise<Person> {
        return this._create(createArgs);
    }

    public get(id: string | number): Promise<Person> {
        return this._get(id);
    }

    public update(id: string | number, updateArgs: PersonUpdateAttributes): Promise<Person> {
        return this._update(id, updateArgs);
    }

    public del(id: string | number): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string | number): Promise<void> {
        return this._destroy(id);
    }
}
