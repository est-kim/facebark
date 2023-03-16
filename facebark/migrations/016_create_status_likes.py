steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE likes (
            id SERIAL PRIMARY KEY NOT NULL,
            status_id INT NOT NULL REFERENCES statuses(id),
            account_id INT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE likes;
        """,
    ]
]
