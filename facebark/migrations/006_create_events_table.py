steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE events (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(1000) NOT NULL,
            state VARCHAR(100) NOT NULL,
            city  VARCHAR(100) NOT NULL,
            park VARCHAR(100) NOT NULL,
            address VARCHAR(100) NOT NULL,
            date Date NOT NULL,
            start_time VARCHAR(100) NOT NULL,
            end_time VARCHAR(100) NOT NULL,
            description TEXT NOT NULL,
            picture VARCHAR(1000) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE events;
        """,
    ]
]
