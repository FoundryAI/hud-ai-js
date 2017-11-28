import * as Promise from 'bluebird';
import * as _ from 'lodash';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';

export interface UserTemplate {
    id: string;
    userId: string;
    name: string;
    markdown: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserTemplateListAttributes extends HudAiListAttributes {
    userId?: string;
    name?: string;
}

export interface UserTemplateCreateAttributes extends HudAiCreateAttributes {
    userId?: string;
    name: string;
    markdown: string;
}

export interface UserTemplateUpdateAttributes extends HudAiUpdateAttributes {
    userId?: string;
    name?: string;
    markdown?: string;
}

export class UserTemplateResource extends Resource<
    UserTemplate,
    UserTemplateListAttributes,
    UserTemplateCreateAttributes,
    UserTemplateUpdateAttributes
    > {
    constructor(requestManager: RequestManager) {
        super('/users/templates', requestManager);
    }

    public list(listArgs: UserTemplateListAttributes): Promise<{ count: number, rows: UserTemplate[] }> {
        return this._list(listArgs);
    }

    public create(createArgs: UserTemplateCreateAttributes): Promise<UserTemplate> {
        return this._create(createArgs);
    }

    public get(templateId: string): Promise<UserTemplate> {
        return this._get(templateId);
    }

    public update(id: string, updateArgs: UserTemplateUpdateAttributes): Promise<UserTemplate> {
        return this._update(id, updateArgs);
    }

    public del(id: string): Promise<void> {
        return this.destroy(id);
    }

    public destroy(id: string): Promise<void> {
        return this._destroy(id);
    }
}
