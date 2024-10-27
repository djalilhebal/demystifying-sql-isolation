# Ramblings

Add: Referee y9oul l Hare, "7aja anormal srat, alors 3awad l match wella jsp."


## Savepoints

We could use `SAVEPOINT`s
Why? We can use them to read the state and then undo our changes (if any) in addition to releasing any accidentally acquired locks.
They work like transactions when it comes to `ROLLBACK`s and locking.
`SAVEPOINT` is mostly fully SQL conforming.
Refs:
https://www.postgresql.org/docs/current/sql-savepoint.html
https://www.postgresql.org/docs/current/explicit-locking.html


---

END.
