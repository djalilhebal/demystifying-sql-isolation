# Ramblings

Add: Referee y9oul l Hare, "7aja anormal srat, alors 3awad l match wella jsp."

What perspective to use?
What if we draw a scene for each perspective, but only the referee's classes have opacity = 1?
If the referee and a participant's perspective are the same, they will be superimposed on one another.

```ts
{ // Mixed perspectives:

  const PARTICIPANTS_START: IParticipant[] = [
    { id: 1, animal: 'hare', distance_covered: 0, status: 'active', is_winner: false },
    { id: 2, animal: 'tortoise', distance_covered: 0, status: 'active', is_winner: false },
  ];

  const PARTICIPANTS_BEFORE_HARE_SLEEPS: IParticipant[] = [
    { id: 1, animal: 'hare', distance_covered: 180, status: 'active', is_winner: false },
    { id: 2, animal: 'tortoise', distance_covered: 5, status: 'active', is_winner: false },
  ];

  const PARTICIPANTS_WHEN_HARE_SLEEPS: IParticipant[] = [
    { id: 1, animal: 'hare', distance_covered: 180, status: 'inactive', is_winner: false },
    { id: 2, animal: 'tortoise', distance_covered: 10, status: 'active', is_winner: false },
    { id: 3, animal: 'tortoise', distance_covered: 360, status: 'active', is_winner: true },
  ];

  const PARTICIPANTS_AFTER_HARE_SLEEPS: IParticipant[] = [
    { id: 1, animal: 'hare', distance_covered: 180, status: 'active', is_winner: false },
    { id: 2, animal: 'tortoise', distance_covered: 10, status: 'active', is_winner: false },
    { id: 3, animal: 'tortoise', distance_covered: 360, status: 'active', is_winner: true },
  ];

  const PARTICIPANTS_FINAL: IParticipant[] = [
    { id: 1, animal: 'hare', distance_covered: 360, status: 'active', is_winner: false },
    { id: 2, animal: 'tortoise', distance_covered: 10, status: 'active', is_winner: false },
    { id: 3, animal: 'tortoise', distance_covered: 360, status: 'active', is_winner: true },
  ];
  
  const story = [
    PARTICIPANTS_START,
    PARTICIPANTS_BEFORE_HARE_SLEEPS,
    PARTICIPANTS_WHEN_HARE_SLEEPS,
    PARTICIPANTS_AFTER_HARE_SLEEPS,
    PARTICIPANTS_FINAL,
  ];
}
```

## Art and narratives

How do artists depict multiple realities within a single canvas? Imagine a scene where, in one reality, a character is seated, in another, they are standing, and in a third, they are walking. All these moments exist simultaneously in one composition, creating a layered, multifaceted narrative.

Narratives:

- Referee's is authoritative.

- Each participant's is subjective.

---

Inspirations:

- David Mazzucchelli’s Asterios Polyp: A graphic novel that blends visual and narrative shifts to express different perspectives and realities in a cohesive layout.
    * https://en.wikipedia.org/wiki/Asterios_Polyp
    * https://www.modaemotorimagazine.com/asterios-polyp-e-il-design-delle-persone/

- Details from Bosch’s Garden of Earthly Delights (ca. 1500) — The Public Domain Review
    * https://publicdomainreview.org/collection/details-from-bosch-s-garden-of-earthly-delights-ca-1500/

- Chōjū-jinbutsu-giga - Wikipedia
    * https://en.wikipedia.org/wiki/Ch%C5%8Dj%C5%AB-jinbutsu-giga
    * https://the-comics-journal.sfo3.digitaloceanspaces.com/wp-content/uploads/2021/11/ART-of-GN-pg27.jpg


## Savepoints

We could use `SAVEPOINT`s
Why? We can use them to read the state and then undo our changes (if any) in addition to releasing any accidentally acquired locks.
They work like transactions when it comes to `ROLLBACK`s and locking.
`SAVEPOINT` is mostly fully SQL conforming.
Refs:
- https://www.postgresql.org/docs/current/sql-savepoint.html
- https://www.postgresql.org/docs/current/explicit-locking.html


## Implementation details

### Using wa-sqlite

We define our custom function `ki_sleep`.
I tried to come up with something like `pg_sleep`.
See [the **Delaying Execution** section of **Date/Time Functions and Operators**](https://www.postgresql.org/docs/current/functions-datetime.html#FUNCTIONS-DATETIME-DELAY).

We use `create_function`, as seen in [its test file](https://github.com/rhashimoto/wa-sqlite/blob/bfbbc6a88038185460b30f46f15f97b1c85ee253/test/callbacks.test.js).

We use multiple workers to simulate multiple connections/clients.

### Remarks

- Ki is for Kaito, Kite, or Ki the energy thingy.



---

END.
