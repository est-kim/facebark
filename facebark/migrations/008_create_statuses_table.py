steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE statuses (
            id SERIAL PRIMARY KEY NOT NULL,
            status_text TEXT NOT NULL,
            time_stamp TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC' AT TIME ZONE 'America/Los_Angeles'),
            account_id INT,
            comment_id INT
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE statuses;
        """,
    ]
]
