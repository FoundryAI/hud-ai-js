import * as Promise from 'bluebird';

import {
    HudAiCreateAttributes,
    HudAiListAttributes,
    HudAiUpdateAttributes,
    Resource
} from '../utils/Resource';
import { RequestManager } from '../RequestManager';
import { User } from '../entities';

export class OrganizationUserResource extends Resource<
    User,
    HudAiListAttributes,
    HudAiCreateAttributes,
    HudAiUpdateAttributes
    >  {
    constructor(requestManager: RequestManager) {
        super(`/organization/{organizationId}/users`, requestManager);
    }

    public list(listArgs: HudAiListAttributes): Promise<{ count: number, rows: User[] }> {
        return this._list(listArgs);
    }
}
