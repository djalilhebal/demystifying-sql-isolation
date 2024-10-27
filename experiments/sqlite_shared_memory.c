#include <stdio.h>
#include <sqlite3.h>

int main() {
    sqlite3 *db1, *db2;
    char *err_msg = 0;

    // Open the first connection with shared cache enabled
    int rc1 = sqlite3_open_v2("file:shared_memory_db?mode=memory&cache=shared", &db1, SQLITE_OPEN_URI | SQLITE_OPEN_READWRITE | SQLITE_OPEN_CREATE, NULL);
    if (rc1 != SQLITE_OK) {
        fprintf(stderr, "Cannot open database: %s\n", sqlite3_errmsg(db1));
        sqlite3_close(db1);
        return rc1;
    }

    // Open the second connection to the same in-memory database
    int rc2 = sqlite3_open_v2("file:shared_memory_db?mode=memory&cache=shared", &db2, SQLITE_OPEN_URI | SQLITE_OPEN_READWRITE | SQLITE_OPEN_CREATE, NULL);
    if (rc2 != SQLITE_OK) {
        fprintf(stderr, "Cannot open database: %s\n", sqlite3_errmsg(db2));
        sqlite3_close(db1);
        sqlite3_close(db2);
        return rc2;
    }

    // Execute some SQL on the first connection
    const char *sql = "CREATE TABLE Test(Id INT, Name TEXT);"
                      "INSERT INTO Test VALUES(1, 'Alice');";
    rc1 = sqlite3_exec(db1, sql, 0, 0, &err_msg);
    if (rc1 != SQLITE_OK) {
        fprintf(stderr, "SQL error: %s\n", err_msg);
        sqlite3_free(err_msg);
        sqlite3_close(db1);
        sqlite3_close(db2);
        return rc1;
    }

    // Query the data from the second connection
    const char *sql_query = "SELECT * FROM Test;";
    sqlite3_stmt *stmt;
    rc2 = sqlite3_prepare_v2(db2, sql_query, -1, &stmt, 0);
    if (rc2 != SQLITE_OK) {
        fprintf(stderr, "Failed to fetch data: %s\n", sqlite3_errmsg(db2));
    }

    // Print results
    while (sqlite3_step(stmt) == SQLITE_ROW) {
        int id = sqlite3_column_int(stmt, 0);
        const unsigned char *name = sqlite3_column_text(stmt, 1);
        printf("Id: %d, Name: %s\n", id, name);
    }

    sqlite3_finalize(stmt);

    // Close both connections
    sqlite3_close(db1);
    sqlite3_close(db2);

    return 0;
}
