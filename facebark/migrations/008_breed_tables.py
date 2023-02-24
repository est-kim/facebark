steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE breeds (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(1000) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE breeds;
        """,
    ],
]
