import { Image } from './GeneralTypes';

export interface GrimoireResponse {
    data: GrimoireStatus;
}

export interface GrimoireStatus {
    score: number;
    cardCollection: CardStatus[];
    cardsToHide: [];
    bonuses: BonusCardStatus[];
}

export interface CardStatus {
    cardId: number;
    score: number;
    points: number;
    statisticCollection?: StatisticStatus[];
}

interface StatisticStatus {
    statNumber: number;
    value: number;
    displayValue: number;
    rankCollection?: RankStatus[];
}

interface RankStatus {
    rank: number;
    points: number;
}

interface BonusCardStatus {
    cardId: number;
    cardName: string;
    statName: string;
    bonusName: string;
    bonusDescription: string;
    bonusRank: {
        statId: number;
        rank: number;
    };
    value: number;
    threshold: number;
    smallImage: Image;
}
