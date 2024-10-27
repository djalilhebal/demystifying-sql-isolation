import { createStore } from "jotai";

import { RaceActor } from "../common";
import { createClients, createPostgresMock, destroyPostgresMock, loadWorldModel, tryRunQuery } from ".";

type JotaiStore = ReturnType<typeof createStore>;

export default class StoryManager {
    constructor(private readonly jotaiStore: JotaiStore) {
    }

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
        await this.actuallyRunQuery(actor, sql);
        await this.afterEachQueryRun(actor);
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
