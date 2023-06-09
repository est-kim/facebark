steps = [
    [
        # "Up" SQL statement
        """
        INSERT INTO breeds VALUES

            (1,'Mixed Breed'),
            (2,'Affenpinscher'),
            (3,'Afghan Hound'),
            (4,'Airedale Terrier'),
            (5,'Akita'),
            (6,'Alaskan Klee Kai'),
            (7,'Alaskan Malamute'),
            (8,'American Bulldog'),
            (9,'American English Coonhound'),
            (10,'American Eskimo Dog'),
            (11,'American Foxhound'),
            (12,'American Hairless Terrier'),
            (13,'American Leopard Hound'),
            (14,'American Staffordshire Terrier'),
            (15,'American Water Spaniel'),
            (16,'Anatolian Shepherd Dog'),
            (17,'Appenzeller Sennenhund'),
            (18,'Australian Cattle Dog'),
            (19,'Australian Kelpie'),
            (20,'Australian Shepherd'),
            (21,'Australian Stumpy Tail Cattle Dog'),
            (22,'Australian Terrier'),
            (23,'Azawakh'),
            (24,'Barbado da Terceira'),
            (25,'Barbet'),
            (26,'Basenji'),
            (27,'Basset Fauve de Bretagne'),
            (28,'Basset Hound'),
            (29,'Bavarian Mountain Scent Hound'),
            (30,'Beagle'),
            (31,'Bearded Collie'),
            (32,'Beauceron'),
            (33,'Bedlington Terrier'),
            (34,'Belgian Laekenois'),
            (35,'Belgian Malinois'),
            (36,'Belgian Sheepdog'),
            (37,'Belgian Tervuren'),
            (38,'Bergamasco Sheepdog'),
            (39,'Berger Picard'),
            (40,'Bernese Mountain Dog'),
            (41,'Bichon Frise'),
            (42,'Biewer Terrier'),
            (43,'Black and Tan Coonhound'),
            (44,'Black Russian Terrier'),
            (45,'Bloodhound'),
            (46,'Bluetick Coonhound'),
            (47,'Boerboel'),
            (48,'Bohemian Shepherd'),
            (49,'Bolognese'),
            (50,'Border Collie'),
            (51,'Border Terrier'),
            (52,'Borzoi'),
            (53,'Boston Terrier'),
            (54,'Bouvier des Flandres'),
            (55,'Boxer'),
            (56,'Boykin Spaniel'),
            (57,'Bracco Italiano'),
            (58,'Braque du Bourbonnais'),
            (59,'Braque Francais Pyrenean'),
            (60,'Briard'),
            (61,'Brittany'),
            (62,'Broholmer'),
            (63,'Brussels Griffon'),
            (64,'Bull Terrier'),
            (65,'Bulldog'),
            (66,'Bullmastiff'),
            (67,'Cairn Terrier'),
            (68,'Canaan Dog'),
            (69,'Cane Corso'),
            (70,'Cardigan Welsh Corgi'),
            (71,'Carolina Dog'),
            (72,'Catahoula Leopard Dog'),
            (73,'Caucasian Shepherd Dog'),
            (74,'Cavalier King Charles Spaniel'),
            (75,'Central Asian Shepherd Dog'),
            (76,'Cesky Terrier'),
            (77,'Chesapeake Bay Retriever'),
            (78,'Chihuahua'),
            (79,'Chinese Crested'),
            (80,'Chinese Shar-Pei'),
            (81,'Chinook'),
            (82,'Chow Chow'),
            (83,'Cirneco dell Etna'),
            (84,'Clumber Spaniel'),
            (85,'Cocker Spaniel'),
            (86,'Collie'),
            (87,'Coton de Tulear'),
            (88,'Croatian Sheepdog'),
            (89,'Curly-Coated Retriever'),
            (90,'Czechoslovakian Vlcak'),
            (91,'Dachshund'),
            (92,'Dalmatian'),
            (93,'Dandie Dinmont Terrier'),
            (94,'Danish-Swedish Farmdog'),
            (95,'Deutscher Wachtelhund'),
            (96,'Doberman Pinscher'),
            (97,'Dogo Argentino'),
            (98,'Dogue de Bordeaux'),
            (99,'Drentsche Patrijshond'),
            (100,'Drever'),
            (101,'Dutch Shepherd'),
            (102,'English Cocker Spaniel'),
            (103,'English Foxhound'),
            (104,'English Setter'),
            (105,'English Springer Spaniel'),
            (106,'English Toy Spaniel'),
            (107,'Entlebucher Mountain Dog'),
            (108,'Estrela Mountain Dog'),
            (109,'Eurasier'),
            (110,'Field Spaniel'),
            (111,'Finnish Lapphund'),
            (112,'Finnish Spitz'),
            (113,'Flat-Coated Retriever'),
            (114,'French Bulldog'),
            (115,'French Spaniel'),
            (116,'German Longhaired Pointer'),
            (117,'German Pinscher'),
            (118,'German Shepherd Dog'),
            (119,'German Shorthaired Pointer'),
            (120,'German Spitz'),
            (121,'German Wirehaired Pointer'),
            (122,'Giant Schnauzer'),
            (123,'Glen of Imaal Terrier'),
            (124,'Golden Retriever'),
            (125,'Gordon Setter'),
            (126,'Grand Basset Griffon Vendéen'),
            (127,'Great Dane'),
            (128,'Great Pyrenees'),
            (129,'Greater Swiss Mountain Dog'),
            (130,'Greyhound'),
            (131,'Hamiltonstovare'),
            (132,'Hanoverian Scenthound'),
            (133,'Harrier'),
            (134,'Havanese'),
            (135,'Hokkaido'),
            (136,'Hovawart'),
            (137,'Ibizan Hound'),
            (138,'Icelandic Sheepdog'),
            (139,'Irish Red and White Setter'),
            (140,'Irish Setter'),
            (141,'Irish Terrier'),
            (142,'Irish Water Spaniel'),
            (143,'Irish Wolfhound'),
            (144,'Italian Greyhound'),
            (145,'Jagdterrier'),
            (146,'Japanese Akitainu'),
            (147,'Japanese Chin'),
            (148,'Japanese Spitz'),
            (149,'Japanese Terrier'),
            (150,'Jindo'),
            (151,'Kai Ken'),
            (152,'Karelian Bear Dog'),
            (153,'Keeshond'),
            (154,'Kerry Blue Terrier'),
            (155,'Kishu Ken'),
            (156,'Komondor'),
            (157,'Kromfohrlander'),
            (158,'Kuvasz'),
            (159,'Labrador Retriever'),
            (160,'Lagotto Romagnolo'),
            (161,'Lakeland Terrier'),
            (162,'Lancashire Heeler'),
            (163,'Lapponian Herder'),
            (164,'Leonberger'),
            (165,'Lhasa Apso'),
            (166,'Löwchen'),
            (167,'Maltese'),
            (168,'Manchester Terrier (Standard)'),
            (169,'Manchester Terrier (Toy)'),
            (170,'Mastiff'),
            (171,'Miniature American Shepherd'),
            (172,'Miniature Bull Terrier'),
            (173,'Miniature Pinscher'),
            (174,'Miniature Schnauzer'),
            (175,'Mountain Cur'),
            (176,'Mudi'),
            (177,'Neapolitan Mastiff'),
            (178,'Nederlandse Kooikerhondje'),
            (179,'Newfoundland'),
            (180,'Norfolk Terrier'),
            (181,'Norrbottenspets'),
            (182,'Norwegian Buhund'),
            (183,'Norwegian Elkhound'),
            (184,'Norwegian Lundehund'),
            (185,'Norwich Terrier'),
            (186,'Nova Scotia Duck Tolling Retriever'),
            (187,'Old English Sheepdog'),
            (188,'Otterhound'),
            (189,'Papillon'),
            (190,'Parson Russell Terrier'),
            (191,'Pekingese'),
            (192,'Pembroke Welsh Corgi'),
            (193,'Perro de Presa Canario'),
            (194,'Peruvian Inca Orchid'),
            (195,'Petit Basset Griffon Vendéen'),
            (196,'Pharaoh Hound'),
            (197,'Pitbull'),
            (198,'Plott Hound'),
            (199,'Pointer'),
            (200,'Polish Lowland Sheepdog'),
            (201,'Pomeranian'),
            (202,'Poodle (Miniature)'),
            (203,'Poodle (Standard)'),
            (204,'Poodle (Toy)'),
            (205,'Porcelaine'),
            (206,'Portuguese Podengo'),
            (207,'Portuguese Podengo Pequeno'),
            (208,'Portuguese Pointer'),
            (209,'Portuguese Sheepdog'),
            (210,'Portuguese Water Dog'),
            (211,'Pudelpointer'),
            (212,'Pug'),
            (213,'Puli'),
            (214,'Pumi'),
            (215,'Pyrenean Mastiff'),
            (216,'Pyrenean Shepherd'),
            (217,'Rafeiro do Alentejo'),
            (218,'Rat Terrier'),
            (219,'Redbone Coonhound'),
            (220,'Rhodesian Ridgeback'),
            (221,'Romanian Carpathian Shepherd'),
            (222,'Romanian Mioritic Shepherd Dog'),
            (223,'Rottweiler'),
            (224,'Russell Terrier'),
            (225,'Russian Toy'),
            (226,'Russian Tsvetnaya Bolonka'),
            (227,'Saint Bernard'),
            (228,'Saluki'),
            (229,'Samoyed'),
            (230,'Schapendoes'),
            (231,'Schipperke'),
            (232,'Scottish Deerhound'),
            (233,'Scottish Terrier'),
            (234,'Sealyham Terrier'),
            (235,'Segugio Italiano'),
            (236,'Shetland Sheepdog'),
            (237,'Shiba Inu'),
            (238,'Shih Tzu'),
            (239,'Shikoku'),
            (240,'Siberian Husky'),
            (241,'Silky Terrier'),
            (242,'Skye Terrier'),
            (243,'Sloughi'),
            (244,'Slovakian Wirehaired Pointer'),
            (245,'Slovensky Cuvac'),
            (246,'Slovensky Kopov'),
            (247,'Small Munsterlander'),
            (248,'Smooth Fox Terrier'),
            (249,'Soft Coated Wheaten Terrier'),
            (250,'Spanish Mastiff'),
            (251,'Spanish Water Dog'),
            (252,'Spinone Italiano'),
            (253,'Stabyhoun'),
            (254,'Staffordshire Bull Terrier'),
            (255,'Standard Schnauzer'),
            (256,'Sussex Spaniel'),
            (257,'Swedish Lapphund'),
            (258,'Swedish Vallhund'),
            (259,'Taiwan Dog'),
            (260,'Teddy Roosevelt Terrier'),
            (261,'Thai Ridgeback'),
            (262,'Tibetan Mastiff'),
            (263,'Tibetan Spaniel'),
            (264,'Tibetan Terrier'),
            (265,'Tornjak'),
            (266,'Tosa'),
            (267,'Toy Fox Terrier'),
            (268,'Transylvanian Hound'),
            (269,'Treeing Tennessee Brindle'),
            (270,'Treeing Walker Coonhound'),
            (271,'Vizsla'),
            (272,'Volpino Italiano'),
            (273,'Weimaraner'),
            (274,'Welsh Springer Spaniel'),
            (275,'Welsh Terrier'),
            (276,'West Highland White Terrier'),
            (277,'Wetterhoun'),
            (278,'Whippet'),
            (279,'Wire Fox Terrier'),
            (280,'Wirehaired Pointing Griffon'),
            (281,'Wirehaired Vizsla'),
            (282,'Working Kelpie'),
            (283,'Xoloitzcuintli'),
            (284,'Yakutian Laika'),
            (285,'Yorkshire Terrier'),
            (286,'Other Breed')



        ;
        """,
        """
        SELECT setval('breeds_id_seq', (SELECT MAX(id) + 1 FROM breeds));
        """,
    ]
]
