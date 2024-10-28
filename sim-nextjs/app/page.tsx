'use client';

import "./page.css";

import { IGameState, IParticipant, IWorldModel } from "./common";
import Viz from "./viz/Viz";

const FINAL_PARTICIPANTS_STATE: IParticipant[] = [
  { id: 1, animal: 'hare', distance_covered: 180, status: 'active', is_winner: false },
  { id: 2, animal: 'tortoise', distance_covered: 6, status: 'active', is_winner: false },
  { id: 3, animal: 'tortoise', distance_covered: 360, status: 'active', is_winner: true },
];

const DEFAULT_WORLD_MODEL: IWorldModel = {
  participants: structuredClone(FINAL_PARTICIPANTS_STATE),
  anomalyDetected: false,
}
FINAL_PARTICIPANTS_STATE.forEach((participant) => {
  participant.worldModel = DEFAULT_WORLD_MODEL;
});

const gameState: IGameState = {
  participants: FINAL_PARTICIPANTS_STATE,
};

export default function Home() {

  return (
    <main>

      <Viz gameState={gameState} />

    </main>
  );
}
