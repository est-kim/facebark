steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(200) NOT NULL,
            email VARCHAR(200) NOT NULL,
            phone_number VARCHAR(12),
            name VARCHAR(200) NOT NULL,
            image_url TEXT NOT NULL,
            breed VARCHAR(200) NOT NULL,
            sex VARCHAR(10) NOT NULL,
            dob DATE NOT NULL,
            owner_name VARCHAR(200) NOT NULL,
            description TEXT
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """
    ]
]
