steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(200) NOT NULL UNIQUE,
            hashed_password VARCHAR(100) NOT NULL,
            email VARCHAR(200) NOT NULL,
            phone_number VARCHAR(12),
            name VARCHAR(200) NOT NULL,
            image_url TEXT NOT NULL,
            breed VARCHAR(100) NOT NULL,
            sex VARCHAR(10) NOT NULL,
            dob VARCHAR(40) NOT NULL,
            owner_name VARCHAR(200) NOT NULL,
            description TEXT,
            city_id INT NOT NULL REFERENCES cities(id),
            state_id INT NOT NULL REFERENCES states(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """,
    ]
]
