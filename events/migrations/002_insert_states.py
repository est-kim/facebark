steps = [
    [
        # "Up" SQL statement
        """
        INSERT INTO states VALUES

            (1,'Alabama'),
            (2,'Alaska'),
            (3,'Arizona'),
            (4,'Arkansas'),
            (5,'California'),
            (6,'Colorado'),
            (7,'Connecticut'),
            (8,'Delaware'),
            (9,'District of Columbia'),
            (10,'Florida'),
            (11,'Georgia'),
            (12,'Hawaii'),
            (13,'Idaho'),
            (14,'Illinois'),
            (15,'Indiana'),
            (16,'Iowa'),
            (17,'Kansas'),
            (18,'Kentucky'),
            (19,'Louisiana'),
            (20,'Maine'),
            (21,'Montana'),
            (22,'Nebraska'),
            (23,'Nevada'),
            (24,'New Hampshire'),
            (25,'New Jersey'),
            (26,'New Mexico'),
            (27,'New York'),
            (28,'North Carolina'),
            (29,'North Dakota'),
            (30,'Ohio'),
            (31,'Oklahoma'),
            (32,'Oregon'),
            (33,'Maryland'),
            (34,'Massachusetts'),
            (35,'Michigan'),
            (36,'Minnesota'),
            (37,'Mississippi'),
            (38,'Missouri'),
            (39,'Pennsylvania'),
            (40,'Rhode Island'),
            (41,'South Carolina'),
            (42,'South Dakota'),
            (43,'Tennessee'),
            (44,'Texas'),
            (45,'Utah'),
            (46,'Vermont'),
            (47,'Virginia'),
            (48,'Washington'),
            (49,'West Virginia'),
            (50,'Wisconsin'),
            (51,'Wyoming')



        ;
        """,
        """
        SELECT setval('states_id_seq', (SELECT MAX(id) + 1 FROM states));
        """,
    ]
]
