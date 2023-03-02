steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE following (
            id SERIAL PRIMARY KEY NOT NULL,
            follower_id INT NOT NULL REFERENCES accounts(id),
            followee_id INT NOT NULL REFERENCES accounts(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE following;
        """,
    ]
]
