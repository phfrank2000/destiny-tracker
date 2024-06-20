export interface AdvisorResponse {
    data: Advisor;
}

// this type is not complete
interface Advisor {
    checklists: Checklist[];
}

export interface Checklist {
    identifier: string;
    checklistName: string;
    checklistDescription: string;
    entryType: number;
    entries: Entry[];
}

interface Entry {
    entityId: number;
    state: boolean;
}
