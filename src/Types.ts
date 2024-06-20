import { Platform } from './destiny-types/GeneralTypes';

export interface Grimoire {
    name: string;
    score: number;
    points: number;
    statisticCollection?: GrimoireStatistic[];
    isFinished: boolean;
}

export interface GrimoireStatistic {
    value: number;
    statName: string;
    rankCollection: GrimoireRank[];
}

export interface GrimoireRank {
    rank: number;
    points: number;
    threshold: number;
    isReached: boolean;
}

export interface CharacterChecklist {
    emblemPath: string;
    acquired: number;
    checklist: Map<number, boolean>;
}

export interface Fragment {
    name: string;
    emblemPaths: string[];
    description: string;
}

export interface PlatformSelectOption {
    label: string;
    value: Platform;
}

export interface SortEvent {
    key: string;
    sortOrder: string;
}
