import { CardStatus } from '../destiny-types/GrimoireTypes';
import { Card, Statistic } from '../destiny-types/DefinitionTypes';
import { Grimoire, GrimoireRank, GrimoireStatistic } from '../Types';

class GrimoireMapper {
    public mapToGrimoires(
        cardCollection: CardStatus[],
        cards: Card[],
    ): Grimoire[] {
        return cards.reduce((grimoires: Grimoire[], card) => {
            const cardStatus = cardCollection.find(
                (c) => c.cardId === card.cardId,
            );
            if (cardStatus) {
                const grimoire: Grimoire = {
                    name: card.cardName,
                    score: cardStatus.score,
                    points: cardStatus.points,
                    isFinished: false,
                };
                if (card.statisticCollection) {
                    grimoire.points = this.calculatePointsWithStatistics(
                        grimoire.points,
                        card as Required<Card>,
                    );
                    grimoire.statisticCollection = this.mapStatistics(
                        card as Required<Card>,
                        cardStatus,
                    );
                }
                if (grimoire.points > 0) {
                    grimoire.isFinished = grimoire.points === grimoire.score;
                    grimoires.push(grimoire);
                }
            } else {
                if (card.points > 0) {
                    grimoires.push({
                        name: card.cardName,
                        score: 0,
                        points: card.points,
                        isFinished: false,
                    });
                } else if (card.statisticCollection) {
                    const points = this.calculatePointsWithStatistics(
                        card.points,
                        card as Required<Card>,
                    );
                    if (points > 0) {
                        grimoires.push({
                            name: card.cardName,
                            score: 0,
                            points: points,
                            isFinished: false,
                            statisticCollection: this.mapStatistics(
                                card as Required<Card>,
                                { cardId: card.cardId, score: 0, points: 0 },
                            ),
                        });
                    }
                }
            }
            return grimoires;
        }, []);
    }

    private calculatePointsWithStatistics(
        basePoints: number,
        card: Required<Card>,
    ): number {
        return (
            basePoints +
            card.statisticCollection.reduce(
                (statSum, statistic) =>
                    statSum +
                    (statistic.rankCollection?.reduce(
                        (sum, rank) => sum + rank.points,
                        0,
                    ) || 0),
                0,
            )
        );
    }

    private mapStatistics(
        card: Required<Card>,
        cardStatus: CardStatus,
    ): GrimoireStatistic[] {
        return card.statisticCollection.reduce(
            (statistics: GrimoireStatistic[], statistic) => {
                const grimoireStatistic: GrimoireStatistic = {
                    value:
                        cardStatus.statisticCollection?.find(
                            (s) => s.statNumber === statistic.statNumber,
                        )?.value || 0,
                    statName: statistic.statName,
                    rankCollection: [],
                };
                if (statistic.rankCollection) {
                    grimoireStatistic.rankCollection = this.mapRanks(
                        statistic as Required<Statistic>,
                        cardStatus,
                    );
                    statistics.push(grimoireStatistic);
                }
                return statistics;
            },
            [],
        );
    }

    private mapRanks(
        statistic: Required<Statistic>,
        cardStatus: CardStatus,
    ): GrimoireRank[] {
        return statistic.rankCollection.map((rank) => ({
            rank: rank.rank,
            points: rank.points,
            threshold: rank.threshold,
            isReached:
                cardStatus.statisticCollection?.find(
                    (s) => s.statNumber === statistic.statNumber,
                )?.rankCollection?.length >= rank.rank || false,
        }));
    }
}

export const grimoireMapper: GrimoireMapper = new GrimoireMapper();
