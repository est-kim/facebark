steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE attendees (
            id SERIAL PRIMARY KEY NOT NULL,
            event_id INT NOT NULL REFERENCES events(id),
            attendee_id INT NOT NULL REFERENCES accounts(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE attendees;
        """,
    ]
]
