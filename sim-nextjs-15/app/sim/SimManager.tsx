'use client';

import { RaceActor } from "../core";
import { createClients, createPostgresMock, destroyPostgresMock, loadWorldModel, tryRunQuery } from "./impl";

export class SimManager {

    public async start() {
        await this.beforeAll();
    }

    public async stop() {
        await this.afterAll();
    }

    private async beforeAll() {
        await createPostgresMock();
        await createClients();
    }

    private async afterAll() {
        await destroyPostgresMock();
    }

    public async runQuery(actor: RaceActor, sql: string): Promise<void> {
        const TAG = `${SimManager.name}.${this.runQuery.name}`;
        console.debug(TAG, actor, sql);

        const ret1 = await this.actuallyRunQuery(actor, sql);
        console.debug(TAG, ret1);

        const ret2 = await this.afterEachQueryRun(actor);
        console.debug(TAG, ret2);
    }

    private async actuallyRunQuery(actor: RaceActor, sql: string) {
        await tryRunQuery(actor, sql);
    }

    /**
     * Update world state after each query run.
     */
    private async afterEachQueryRun(actor: RaceActor,) {
        await loadWorldModel(actor);
    }
}

const sim = new SimManager();

console.debug('simManager', sim);

//@ts-ignore
globalThis['sim'] = sim;

export default function SimIndicator() {
    'use client';

    return (
        <div>Sim</div>
    );
}