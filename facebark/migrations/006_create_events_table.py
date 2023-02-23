steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE events (
            id SERIAL PRIMARY KEY NOT NULL,
            title VARCHAR(1000) NOT NULL,
            states_id INT NOT NULL REFERENCES states(id),
            cities_id  INT NOT NULL REFERENCES cities(id),
            dog_parks_id INT REFERENCES dog_parks(id),
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

