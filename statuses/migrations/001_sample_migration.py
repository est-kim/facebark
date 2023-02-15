steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE statuses (
            id SERIAL PRIMARY KEY NOT NULL,
            status TEXT NOT NULL,
            timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
