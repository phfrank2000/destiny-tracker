import { CharacterChecklist, Fragment } from '../Types';
import { Card } from '../destiny-types/DefinitionTypes';
import { FRAGMENT_DESCRIPTIONS } from '../Constants';
import { Summary } from '../destiny-types/SummaryTypes';
import { Checklist } from '../destiny-types/AdvisorTypes';

class FragmentMapper {
    public mapToFragments(
        checklists: CharacterChecklist[],
        cards: Card[],
    ): Fragment[] {
        return cards
            .filter((card) => card.cardId >= 700680 && card.cardId <= 701170)
            .map((card) => ({
                name: card.cardName,
                emblemPaths: checklists.map((checklist) => {
                    if (checklist.checklist.get(card.cardId)) {
                        return `https://www.bungie.net${checklist.emblemPath}`;
                    }
                }),
                description: FRAGMENT_DESCRIPTIONS[card.cardId],
            }));
    }

    public mapToCharacterChecklists(
        summary: Summary,
        checklists: Checklist[],
    ): CharacterChecklist[] {
        return summary.characters.map((character, index) => ({
            emblemPath: character.emblemPath,
            acquired: checklists[index].entries.reduce(
                (sum, entry) => sum + (entry.state ? 1 : 0),
                0,
            ),
            checklist: new Map(
                checklists[index].entries.map((entry) => [
                    entry.entityId,
                    entry.state,
                ]),
            ),
        }));
    }
}

export const fragmentMapper: FragmentMapper = new FragmentMapper();
