# Demystifying SQL Isolation

<figure style="text-align: center;">
  <img alt="" src="./images/logo.svg" />
  <figcaption>Demystifying SQL Isolation: The Tortoise and the Hare</figcaption>
</figure>

About transaction isolation levels.

Software visualization, simulation, interactive article.


## Technologies used

- SVG and CSS to make the visualization

- ~~`npm:pglite`~~ https://github.com/electric-sql/pglite
    * Why not suitable: It runs in single-user mode, meaning it does not support multiple simultaneous connections.
      Hard to make realistic scenarios.
    * Interesting:
        * Live https://pglite.dev/docs/live-queries
        * Filesystem https://pglite.dev/docs/filesystems

- ~~`npm:wa-sqlite`~~ https://github.com/rhashimoto/wa-sqlite
    * Demo: https://rhashimoto.github.io/wa-sqlite/demo/
    * Works fine, except it there seem to be IO issues when committing interweaved transactions.
        + [ ] Try using VFSs other than `IDBBatchAtomicVFS`.
        + [ ] Try opening all database connection in the main thread (as opposed to using workers).
        + [ ] Try recompiling it with "shared cache" enabled.
        + [ ] Try creating a C script that supports opening a database more than once. See `experiments/sqlite_shared_memory.c`.
    * Learning:
        + `wa-sqlite` is compile with `SQLITE_OMIT_SHARED_CACHE` by default. Maybe this is why it does not work with multiple connections in the browser?
        + It seems to use [`sqlite3_open_v2()`](https://www.sqlite.org/c3ref/open.html) for [VFS](https://www.sqlite.org/vfs.html) support (like OPFS).
        + [ ] [OPFS | MDN](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system)

- `pgmock`

- ~~Vue 3~~
    * Why not: Could not get `pgmock` to work correctly with Vite.

- NextJS 15 https://nextjs.org/
```js next.config.mjs
const nextConfig = {
  output: "export",
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      dns: false,
      net: false,
      tls: false,
    };
    return config;
  },
};
```

- [Jotai](https://github.com/pmndrs/jotai): Primitive and flexible state management for React.
  * [ ] https://jotai.org/docs/utilities/family

- [x] react-syntax-highlighter
  * Prisma.js themes: `dracula`, `gruvbox-light`, or `gruvbox-dark`.
    Demo: https://react-syntax-highlighter.github.io/react-syntax-highlighter/demo/prism.html

- [ ] Radix UI Themes `npm:@radix-ui/themes`


## Credits

The exclamation mark was made using:
- [Google Font to Svg Path](https://danmarshall.github.io/google-font-to-svg-path/)
  * Font used: Aladin.

### Icons

- [**Hare** by Delwar Hossain from Noun Project (CC BY 3.0)](https://thenounproject.com/icon/hare-6274004/)
  * Head only

- [**Hare** by Loritas Aventura from Noun Project (CC BY 3.0)](https://thenounproject.com/icon/hare-4212460/)
  * Facing right

- [**Tortoise** by BinikSol from Noun Project (CC BY 3.0)](https://thenounproject.com/icon/tortoise-6898549/)

- [**Finish Line** by Mister Pixel from Noun Project (CC BY 3.0)](https://thenounproject.com/icon/finish-line-36196/)

- [**Thought** by WR Graphic Garage from Noun Project (CC BY 3.0)](https://thenounproject.com/icon/thought-5651494/)

- [**Speaker** by Rizalwale from Noun Project (CC BY 3.0)](https://thenounproject.com/icon/speaker-7300548/)


## Further reading

- [The Tortoise and the Hare - Wikipedia](https://en.wikipedia.org/wiki/The_Tortoise_and_the_Hare)

- [Testudo, the Mediterranean tortoises - Wikipedia](https://en.wikipedia.org/wiki/Testudo_(genus))
    * [Hermann's tortoise - Wikipedia](https://en.wikipedia.org/wiki/Hermann%27s_tortoise)

- [Isolation (database systems) - Wikipedia](https://en.wikipedia.org/wiki/Isolation_(database_systems))

- [Database transaction schedule - Wikipedia](https://en.wikipedia.org/wiki/Database_transaction_schedule)

- Database specific:

    * PostgreSQL https://www.postgresql.org/docs/current/transaction-iso.html

    * Redis https://redis.io/docs/latest/develop/interact/transactions/
        + TLDR: Think, serializable with no possibility to rollback.

    * SQLite
        + Important: **No Isolation Between Operations On The Same Database Connection**
        + [Isolation In SQLite](https://www.sqlite.org/isolation.html)
        + [Transaction](https://www.sqlite.org/lang_transaction.html)
        + [Using SQLite In Multi-Threaded Applications](https://www.sqlite.org/threadsafe.html)


## License

WTFPL
