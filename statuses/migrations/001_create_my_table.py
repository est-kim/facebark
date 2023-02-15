steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE statuses (
            id SERIAL PRIMARY KEY NOT NULL,
            status TEXT NOT NULL,
            time_stamp TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles'),
            account_id INTEGER,
            comment_id INTEGER
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE statuses;
        """
    ]
]
