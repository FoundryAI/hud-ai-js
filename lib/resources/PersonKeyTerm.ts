import * as Promise from 'bluebird';
import * as _ from 'lodash';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface PersonKeyTerm {
    id: string;
    personId: string;
    term: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PersonKeyTermGetAttributes {
    personId: string;
    term: string;
}

export interface PersonKeyTermListAttributes extends HudAiListAttributes {
    personId: string;
    term?: string;
}

export interface PersonKeyTermCreateAttributes extends HudAiCreateAttributes {
    personId: string;
    term: string;
}

export interface PersonKeyTermDestroyAttributes {
    personId: string;
    term: string;
}

export class PersonKeyTermResource extends Resource<
    PersonKeyTerm,
    PersonKeyTermListAttributes,
    PersonKeyTermCreateAttributes,
    any
> {
    constructor(requestManager: RequestManager) {
        super('/people/{personId}/key-terms', requestManager);
    }

    public get(getArgs: PersonKeyTermGetAttributes): Promise<PersonKeyTerm> {
        return this.makeRequest({
            method: 'GET',
            params: getArgs,
            url: `${this.basePath}/{term}`
        });
    }

    public list(listArgs: PersonKeyTermListAttributes): Promise<PersonKeyTerm[]> {
        return this.makeRequest({
            method: 'GET',
            params: listArgs,
            url: `${this.basePath}`
        });
    }

    public create(createArgs: PersonKeyTermCreateAttributes) {
        return this.makeRequest({
            method: 'POST',
            params: _.pick(createArgs, 'personId'),
            data: _.omit(createArgs, 'personId'),
            url: `${this.basePath}`
        });
    }

    public del(destroyArgs: PersonKeyTermDestroyAttributes) {
        return this.destroy(destroyArgs);
    }

    public destroy(destroyArgs: PersonKeyTermDestroyAttributes) {
        return this.makeRequest({
            method: 'DELETE',
            params: _.pick(destroyArgs, 'personId'),
            data: _.omit(destroyArgs, 'personId'),
            url: `${this.basePath}/{term}`
        });
    }
}
