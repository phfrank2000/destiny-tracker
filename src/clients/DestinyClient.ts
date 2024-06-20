import fetch, { RequestInit } from 'node-fetch';
import {
    GrimoireResponse,
    GrimoireStatus,
} from '../destiny-types/GrimoireTypes';
import { DefinitionsResponse, Theme } from '../destiny-types/DefinitionTypes';
import { DestinyResponse, Platform } from '../destiny-types/GeneralTypes';
import { Summary, SummaryResponse } from '../destiny-types/SummaryTypes';
import { AdvisorResponse, Checklist } from '../destiny-types/AdvisorTypes';

class DestinyClient {
    private static readonly BASE_URL =
        'https://www.bungie.net/d1/Platform/Destiny';

    private static readonly HEADERS = {
        'x-api-key': process.env.REACT_APP_API_KEY,
    };

    public async getMembershipId(
        displayName: string,
        platform: Platform,
    ): Promise<string> {
        const url = `/${platform}/Stats/GetMembershipIdByDisplayName/${displayName}/`;
        const options: RequestInit = { method: 'get' };
        const response = await this.fetchDestiny<string>(url, options);
        if (response.ErrorStatus !== 'Success') {
            throw new Error(response.Message);
        }
        return response.Response;
    }

    public async getGrimoireStatus(
        membershipId: string,
        platform: Platform,
    ): Promise<GrimoireStatus> {
        const url = `/Vanguard/Grimoire/${platform}/${membershipId}/`;
        const options: RequestInit = { method: 'get' };
        const response = await this.fetchDestiny<GrimoireResponse>(
            url,
            options,
        );
        return response.Response.data;
    }

    public async getGrimoireDefinitions(): Promise<Theme[]> {
        const url = '/Vanguard/Grimoire/Definition/';
        const options: RequestInit = { method: 'get' };
        const response = await this.fetchDestiny<DefinitionsResponse>(
            url,
            options,
        );
        return response.Response.themeCollection;
    }

    public async getSummary(
        membershipId: string,
        platform: Platform,
    ): Promise<Summary> {
        const url = `/${platform}/Account/${membershipId}/Summary/`;
        const options: RequestInit = { method: 'get' };
        const response = await this.fetchDestiny<SummaryResponse>(url, options);
        return response.Response.data;
    }

    public async getCharacterFragmentChecklist(
        membershipId: string,
        platform: Platform,
        characterId: string,
    ): Promise<Checklist> {
        const url = `/${platform}/Account/${membershipId}/Character/${characterId}/Advisors/`;
        const options: RequestInit = { method: 'get' };
        const response = await this.fetchDestiny<AdvisorResponse>(url, options);
        return response.Response.data.checklists[0];
    }

    private async fetchDestiny<T>(
        url: string,
        options: RequestInit,
    ): Promise<DestinyResponse<T>> {
        const fetchUrl = `${DestinyClient.BASE_URL}${url}`;
        const fetchOptions: RequestInit = {
            headers: DestinyClient.HEADERS,
            ...options,
        };
        const response = await fetch(fetchUrl, fetchOptions);
        return (await response.json()) as unknown as DestinyResponse<T>;
    }
}

export const destinyClient: DestinyClient = new DestinyClient();
