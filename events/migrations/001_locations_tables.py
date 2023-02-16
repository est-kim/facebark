steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE states (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(1000) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE states;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE cities (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(1000) NOT NULL,
            state_id INTEGER REFERENCES states("id") ON DELETE CASCADE

        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE cities;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE dog_parks (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(1000) NOT NULL,
            city_id INTEGER REFERENCES cities("id") ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE dog_parks;
        """
    ]
]
