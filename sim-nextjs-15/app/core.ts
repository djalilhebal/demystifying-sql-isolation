export type RaceActor = 'hare' | 'tortoise' | 'referee';

export interface IParticipant {
    id: number;
    animal: string;
    distance_covered: number;
    status: 'active' | 'inactive';
    is_winner: boolean;
}

export interface IWorldModel {
    /**
     * Whose perspective is it? Any actor.
     */
    actor?: RaceActor;

    participants: IParticipant[];

    /**
     * Detected by Hare or Tortoise.
     */
    anomalyDetected: boolean;
}

export interface ISimState {
    /**
     * World models.
     */
    perspectives: Record<RaceActor, IWorldModel>;
}

export function generateThoughts(worldModel: IWorldModel): string[] {
    const { participants } = worldModel;
    const participantsCount = participants.length;
    const winner = participants.find((participant) => participant.is_winner) ?? null;
    const maxDistance = participants.reduce((max, participant) => Math.max(max, participant.distance_covered), 0);
    const leadingParticipants = participants.filter((participant) => participant.distance_covered === maxDistance);
    const lead = leadingParticipants.length === 1 ? leadingParticipants[0].animal : 'tie';

    return [
        `Participants count: ${participantsCount}.`,
        `Lead: ${lead}.`,
        winner ? `Winner: ${winner.animal}.` : 'No winner yet.',
        worldModel.anomalyDetected ? 'Something\'s off!' : 'OK.',
    ];
}
