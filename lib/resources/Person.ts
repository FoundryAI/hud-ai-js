import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface Person {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    title: string;
    imageUrl: string;
}

export interface PersonListAttributes extends HudAiListAttributes {
    name?: string;
    title?: string;
    term?: string;
}

export interface PersonCreateAttributes extends HudAiCreateAttributes {
    name: string;
    title: string;
    imageUrl?: string;
}

export interface PersonUpdateAttributes extends HudAiUpdateAttributes {
    name?: string;
    title?: string;
    imageUrl?: string;
}

export class PersonResource extends Resource<Person, PersonListAttributes, PersonCreateAttributes, PersonUpdateAttributes> {
    constructor(requestManager: RequestManager) {
        super('/people', requestManager);
    }

    public get(id: string | number): Promise<Person> {
        return this._get(id);
    }

    public list(listArgs: PersonListAttributes): Promise<Person[]> {
        return this._list(listArgs);
    }

    public update(id: string | number, updateArgs: PersonUpdateAttributes) {
        return this._update(id, updateArgs);
    }

    public create(createArgs: PersonCreateAttributes) {
        return this._create(createArgs);
    }

    public del(id: string | number) {
        return this.destroy(id);
    }

    public destroy(id: string | number) {
        return this._destroy(id);
    }
}
