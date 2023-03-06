steps = [
    [
        # "Up" SQL statement
        """

        UPDATE accounts
            SET hashed_password = '$2b$12$AJPye./yTYUOaIcVq4AdyeiVE0h/ga.Ek5u9ClxyuNgptfxGySc6a';

        """,
        """
            SELECT setval('accounts_id_seq', (SELECT MAX(id) + 1 FROM accounts));
        """,
    ]
]
