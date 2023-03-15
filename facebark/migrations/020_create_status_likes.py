steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE likes (
            id SERIAL PRIMARY KEY NOT NULL,
            status_id INT NOT NULL,
            account_id INT NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE likes;
        """,
    ]
]
