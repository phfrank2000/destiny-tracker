import { Image } from './GeneralTypes';

export interface DefinitionsResponse {
    themeCollection: Theme[];
}

export interface Theme {
    themeId: string;
    themeName: string;
    normalResolution: Resolution;
    highResolution: Resolution;
    pageCollection: Page[];
}

interface Resolution {
    image: Image;
    smallImage: Image;
}

interface Page {
    pageId: string;
    pageName: string;
    normalResolution: Resolution;
    highResolution: Resolution;
    cardCollection: Card[];
    cardBriefs: CardBrief[];
}

export interface Card {
    cardId: number;
    cardName: string;
    cardIntro: string;
    cardDescription: string;
    unlockHowToText: string;
    rarity: number;
    unlockFlashHash: number;
    points: number;
    normalResolution: Resolution;
    highResolution: Resolution;
    statisticCollection?: Statistic[];
}

export interface Statistic {
    statNumber: number;
    cardId: number;
    statName: string;
    accumulatorHash: number;
    rankCollection?: Rank[];
}

interface Rank {
    rank: number;
    threshold: number;
    unlockFlagHash: number;
    points: number;
}

interface CardBrief {
    cardId: number;
    points: number;
    totalPoints: number;
}
