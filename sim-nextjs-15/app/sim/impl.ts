import { PostgresMock } from 'pgmock';
import { Client } from "pg";
import { atom, getDefaultStore } from 'jotai';

import { IParticipant, IWorldModel, RaceActor } from '../core';

type Atom<T> = ReturnType<typeof atom<T>>;

// Global store
const store = getDefaultStore();

// Maybe use resettable and lazy atoms
export const pgAtom: Atom<PostgresMock | undefined> = atom();

export const actorAtoms: Record<RaceActor, Atom<Client | undefined>> = {
    referee: atom(),
    tortoise: atom(),
    hare: atom(),
};

// Each participant has a perspective or a world model
export const worldModelAtoms: Record<RaceActor, Atom<IWorldModel | undefined>>  = {
    referee: atom(),
    tortoise: atom(),
    hare: atom(),
};

/**
 * Transaction conflicts or constraint violations or whatnot.
 * If this is set, there is a surprise mark is shown next to the actor.
 */
export const worldAnomalyAtoms: Record<RaceActor, Atom<Error | undefined>>  = {
    referee: atom(),
    tortoise: atom(),
    hare: atom(),
}

export async function createPostgresMock() {
    const mock = await PostgresMock.create();
    store.set(pgAtom, mock);
}

export async function destroyPostgresMock() {
    const pgMock: PostgresMock = store.get(pgAtom)!;
    pgMock.destroy();
    store.set(pgAtom, undefined);
}

export async function createClients() {
    for (const [actorName, actorAtom] of Object.entries(actorAtoms)) {
        const pgMock: PostgresMock = store.get(pgAtom)!;
        const client = new Client(pgMock.getNodePostgresConfig());
        await client.connect();
        store.set(actorAtom, client);
    }
}

export async function tryRunQuery<T = unknown>(actor: RaceActor, sql: string): Promise<T[] | null> {
    try {
        const client: Client = store.get(actorAtoms[actor])!;
        const result = await client.query(sql);
        return result.rows;
    } catch (err) {
        console.error(err);
        // TODO: Only if transaction conflict
        store.set(worldAnomalyAtoms[actor], err as Error);
        return null;
    }
}

/**
 * Using `SAVEPOINT`s to mitigate the observer's paradox.
 */
export async function loadWorldModel(actor: RaceActor) {
    const GET_WORLD_MODEL_QUERY = /*sql*/`
        SAVEPOINT BeforeObservation;

        SELECT *
        FROM participants
        ORDER BY id ASC;

        ROLLBACK TO BeforeObservation;
    `;

    const worldAnomaly = store.get(worldAnomalyAtoms[actor]);
    if (worldAnomaly) {
        return;
    }

    const participants = await tryRunQuery<IParticipant>(actor, GET_WORLD_MODEL_QUERY);
    if (participants) {
        store.set(worldModelAtoms[actor], {
            participants,
        });
    }
}
