export interface SummaryResponse {
    data: Summary;
}

export interface Summary {
    membershipId: string;
    membershipType: number;
    characters: Character[];
}

interface Character {
    characterBase: CharacterBase;
    levelProgression: LevelProgression;
    emblemPath: string;
    backgroundPath: string;
    emblemHash: number;
    characterLevel: number;
    baseCharacterLevel: number;
    isPrestigeLevel: boolean;
    percentToNextLevel: number;
}

interface CharacterBase {
    membershipId: string;
    membershipType: number;
    characterId: string;
    dateLastPlayed: string;
    minutesPlayedThisSession: string;
    minutesPlayedTotal: string;
    powerLevel: number;
    raceHash: number;
    genderHash: number;
    classHash: number;
    currentActivityHash: number;
    lastCompletedStoryHash: number;
    stats: Stats;
    customization: Customization;
    grimoireScore: number;
    peerView: {
        equipment: Item[];
    };
    genderType: number;
    classType: number;
    buildStatGroupHash: number;
}

interface LevelProgression {
    dailyProgress: number;
    weeklyProgress: number;
    currentProgress: number;
    level: number;
    step: number;
    progressToNextLevel: number;
    nextLevelAt: number;
    progressionHash: number;
}

interface Stats {
    STAT_DEFENSE: Stat;
    STAT_INTELLECT: Stat;
    STAT_DISCIPLINE: Stat;
    STAT_STRENGTH: Stat;
    STAT_LIGHT: Stat;
    STAT_ARMOR: Stat;
    STAT_AGILITY: Stat;
    STAT_RECOVERY: Stat;
    STAT_OPTICS: Stat;
}

interface Stat {
    statHash: number;
    value: number;
    maximumValue: number;
}

interface Customization {
    personality: number;
    face: number;
    skinColor: number;
    lipColor: number;
    eyeColor: number;
    hairColor: number;
    featureColor: number;
    decalColor: number;
    wearHelmet: boolean;
    hairIndex: number;
    featureIndex: number;
    decalIndex: number;
}

interface Item {
    itemHash: number;
    dyes: Dye[];
}

interface Dye {
    channelHash: number;
    dyeHash: number;
}
