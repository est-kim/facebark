steps = [
    [
        # "Up" SQL statement
        """
        INSERT INTO events (title, states_id, cities_id, dog_parks_id, address, date, start_time, end_time, description, picture, account_id) VALUES

            ('Pawsome Meetups for Pawesome Dogs!',5,4008,125,'123 Main St.','03/09/2023','10:00','12:00','The upcoming dog party is set to be a paw-some affair, with a variety of activities for dogs and their owners to enjoy.','https://www.kirbybuilt.com/media/catalog/category/Kirby%20Banner%20Images4.jpg',1),
            ('Wag Your Tail Wednesdays!',3,5467,1217,'456 Elm St.','03/15/2023','11:00','13:00','The party will take place in a spacious park, where the dogs can run and play to their hearts content.','https://www.mesaparks.com/home/showpublishedimage/23732/637044005290900000',2),
            ('Bark & Brews: A Dog-Friendly Social!',44,3208,39,'789 Oak St.','03/23/2023','14:00','16:00','There will be plenty of toys, treats, and water stations set up throughout the park to keep the dogs happy and hydrated.','https://images.squarespace-cdn.com/content/v1/5a2193d9d55b414d8867a7e1/1604969342633-2B6HBE4WTN68CY3IDIO9/180620_CadencePark_398.jpg?format=1000w',3),
            ('Furry Friends Unite!',14,1241,340,'10 Maple Ave.','03/28/2023','17:00','19:00','In addition to free play, there will be organized games and contests, such as best trick, fastest runner, and cutest outfit.','https://www.gannett-cdn.com/-mm-/db75e834b72ac336da469b88f0ce4513ba3b6fce/c=0-41-1600-941/local/-/media/2020/11/03/Quincy/ghows-WL-200728966-810a6dfe.jpg?width=660&height=372&fit=crop&format=pjpg&auto=webp',4),
            ('Bring Your Bestie to Our Dog Meetup!',48,6269,999,'234 Pine St.','04/01/2023','16:00','18:00','Dog trainers and behavior experts will be on hand to provide advice and answer questions from the dog owners.','https://www.mesaparks.com/home/showpublishedimage/23736/637044009043230000',5),
            ('The Paw-ty Starts Here!',10,4382,64,'567 Cedar Ln.','04/07/2023','11:00','13:00','A photo booth will be set up where dogs and their owners can take fun and memorable pictures together.','https://www.cityofcarrollton.com/home/showpublishedimage/24222/637746507579800000',6),
            ('Lets Make Fetch Happen!',6,1751,273,'890 Birch Rd.','04/14/2023','15:00','17:00','There will be a raffle with great prizes, such as dog food, toys, and grooming services, with proceeds going to a local animal rescue organization.','https://i0.wp.com/bhamnow.com/wp-content/uploads/2022/01/dog-park-1-2.jpg?resize=1400%2C787&ssl=1',7),
            ('Doggy Playdate!',39,5459,427,'12 Poplar St.','04/21/2023','13:00','15:00','The party will have a theme, such as a holiday or a popular movie, and dogs and their owners are encouraged to dress up accordingly.','https://www.waukee.org/ImageRepository/Document?documentID=8939',8),
            ('Sniff Out Some Fun!',44,1641,231,'345 Walnut Dr.','04/26/2023','14:00','16:00','There will be a professional dog photographer on hand to capture the fun and excitement of the party.','https://balboapark.org/wp-content/uploads/2022/07/nates-point.jpeg',9),
            ('Canine Connection!',5,6130,31,'678 Ash St.','05/04/2023','16:00','18:00','A local pet store will have a booth set up where dog owners can purchase toys, treats, and other pet supplies.','https://crs4rec.com/wp-content/uploads/2020/05/DogPark-main.jpg',10),
            ('Woof it up!',34,729,330,'901 Cherry Ln.','05/09/2023','11:00','13:00','The dog party is going to be a tail-wagging good time, with lots of fun activities for dogs and their owners to enjoy.','https://www.cityofhenderson.com/home/showpublishedimage/4011/637473357891300000',11),
            ('Happy Hour with Hounds!',35,1767,1010,'23 Spruce Ave.','05/17/2023','16:00','18:00','Its going to be held at a local dog park, which means lots of space for the dogs to run around and play.','https://wtop.com/wp-content/uploads/2020/06/BARKSOCIAL1.jpg',12),
            ('Dogs Just Wanna Have Fun!',33,361,239,'456 Sycamore St.','05/25/2023','13:00','15:00','There will be plenty of water stations set up throughout the park to keep the dogs hydrated, as well as lots of shady spots for them to rest.','https://www.whittierprcs.org/home/showpublishedimage/3012/636713090882030000',13),
            ('Unleash the Fun!',11,279,1346,'789 Laurel Rd.','05/31/2023','17:00','19:00','The party will include organized games and contests, such as a best trick competition and a doggy obstacle course.','https://images.squarespace-cdn.com/content/v1/5313d3e9e4b0d7a86d52896e/82e4dc20-469d-43bd-9217-3380639bb00e/IMG_4784.crop-web.jpg?format=1000w',14),
            ('Get Your Wag On!',38,6660,185,'10 Magnolia Ave.','06/08/2023','12:00','14:00','There will also be a raffle with great prizes, such as gift cards to local pet stores and free grooming services.','https://kcparks.org/wp-content/uploads/2014/08/WagginTrail-750.jpg',15),
            ('Furry Fun Times!',32,5633,35,'234 Willow St.','06/16/2023','11:00','13:00','Dogs and their owners are encouraged to dress up in costume for the party, with a prize for the best-dressed dog and owner pair.','https://www.valpoparks.org/ImageRepository/Document?documentID=2745',16),
            ('Playtime for Pooches!',5,6044,181,'567 Redwood Ln.','06/21/2023','15:00','17:00','A local dog trainer will be on hand to offer tips and advice on how to keep your furry friend happy and healthy.','https://d34c09ztlk5mrb.cloudfront.net/cunningham-recreation/_ten24/Novice-Bark-Park-640-1525274959.jpg',17),
            ('Puppy Love in the Park!',19,4815,778,'890 Hemlock Rd.','06/29/2023','17:00','19:00','There will be plenty of dog-friendly snacks and treats available, such as homemade dog biscuits and frozen yogurt.','https://charlotte.axios.com/wp-content/uploads/2020/07/skiptown-1300.jpg',18),
            ('Fun, Fido and Friends!',43,4735,3358,'12 Fir St.','07/02/2023','13:00','15:00','A professional dog photographer will be at the party to capture all the fun and excitement.','https://fargoparks.com/sites/default/files/styles/600_by_500/public/2020-11/dogpark2020_2.jpg?itok=Knb_yV1N',19),
            ('Bark in the Park!',31,5137,183,'345 Cedar Dr.','07/12/2023','16:00','18:00','The party will have a theme, such as a beach party or a Halloween party, to add to the festive atmosphere.','https://helios-i.mashable.com/imagery/articles/01Z0MUTUjTjhOaLPYWAh0gc/hero-image.fill.size_1248x702.v1649093843.jpg',20),
            ('Run with the Pack!',23,3770,46,'678 Dogwood St.','07/20/2023','10:00','12:00','Local animal shelters and rescue groups will be in attendance to talk about their programs and encourage adoption.','https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,h_396,q_75,w_704/https://assets.simpleviewinc.com/simpleview/image/upload/crm/virginia/Duff-McDuff-Dog-Park_236b1ae3-5056-a36a-070d36819d219fcb.jpg',21),
            ('Meet My Best Friend!',15,3294,4243,'901 Birch Ln.','07/28/2023','12:00','14:00','There will be a doggy gift exchange, where each dog brings a wrapped gift to exchange with another dog.','https://cdn5-hosted.civiclive.com/UserFiles/Servers/Server_9496362/Image/Parks%20and%20Recreation/Public%20Parks/Hatfield%20Dog%20Park/Dog%20Park%20Small.jpg',22),
            ('Hound Hangout!',28,1190,251,'23 Oak Ave.','08/03/2023','17:00','19:00','A dog agility course will be set up, with trainers on hand to guide dogs and their owners through the course.','https://www.coralsprings.gov/files/content/public/parks-directory/dr-pauls-dog-park/dog-park.jpg?w=1200',23),
            ('Come Sit, Stay & Play!',44,6117,100,'456 Maple St.','08/11/2023','15:00','17:00','There will be a doggy scavenger hunt, with clues hidden throughout the park for dogs to find and solve.','https://cdn.shopify.com/s/files/1/0606/5593/articles/c4a1cf726dfd14faf068939a71a504a0_600x600_crop_center.jpg?v=1636456302',24),
            ('Lets Pawty!',45,6112,2186,'789 Pine Rd.','08/16/2023','11:00','13:00','A doggy pool party will be set up, with a kiddie pool filled with water for the dogs to splash around in.','https://www.visitvacaville.com/imager/files_idss_com/C373/img_5773_ae9217944f0738f696c093bccdcb3e55.jpg',25),
            ('Tail Waggin Times!',5,6125,171,'10 Elm Ave.','08/23/2023','14:00','16:00','A doggy fashion show will be held, with dogs strutting their stuff in front of a panel of judges.','https://bouldercolorado.gov/sites/default/files/styles/inline_977/public/2023-01/east-boulder-community-park-dog-park30.jpg?itok=wGIpUcNg',26),
            ('A Doggone Good Time!',30,1334,1136,'234 Cedar St.','08/31/2023','16:00','18:00','A caricature artist will be at the party to draw pictures of the dogs and their owners.','https://www.burlingtonnc.gov/ImageRepository/Document?documentId=22988',27),
            ('Happy Tails!',36,4489,616,'567 Birch Ln.','09/05/2023','11:00','13:00','A local dog rescue group will bring adoptable dogs to the party, giving attendees the opportunity to find a new furry friend.','http://okcfox.com/resources/media/ecf2b8ce-d364-4539-b25e-0e57c5ffdb53-large16x9_dogpark.jpg?1570327577160',28),
            ('Sniff, Sniff Hooray!',38,3451,184,'890 Oak Rd.','09/12/2023','17:00','19:00','There will be a doggy talent show, with dogs showing off their unique skills and tricks.','https://assets.simpleviewinc.com/simpleview/image/upload/crm/knoxville/plumb-creek-7e36e3a55056a34_7e36e527-5056-a348-3a628ec98fdd8c0f.jpg',29),
            ('Come, Play & Stay!',18,4016,698,'12 Walnut St.','09/20/2023','15:00','17:00','A doggy massage station will be set up, with professional massage therapists offering massages to dogs.','https://www.guilfordcountync.gov/home/showpublishedimage/18474/638097405522500000',30),
            ('Pawsitively Pawesome!',5,6134,52,'345 Ash Dr.','09/25/2023','13:00','15:00','The party will have a doggy cake walk, with dogs and their owners circling around the cake for a chance to win a prize.','https://k9grass.com/wp-content/uploads/2016/12/dog-parks-17.jpg',31),
            ('The Dog Days are Here!',30,1443,3655,'678 Cherry St.','10/01/2023','10:00','12:00','A doggy DIY station will be set up, with supplies and instructions for attendees to make their own dog toys and treats.','https://www.greaterdandenong.vic.gov.au/sites/default/files/styles/event_detail/public/2021-03/page_7_dog_park_replacement_pic.jpg',32),
            ('Fur-ever Friends!',43,4336,675,'901 Poplar Ln.','10/09/2023','15:00','17:00','A doggy photo booth will be set up, with fun props and backdrops for dogs and their owners to take pictures with.','http://www.dog-on-it-parks.com/blog/wp-content/uploads/2019/06/Skyhouse-Uptown.jpg',33),
            ('Paws Up for Pals!',28,5735,1024,'23 Cedar Ave.','10/15/2023','17:00','19:00','A doggy obstacle course will be set up, with trainers on hand to guide dogs and their owners through the course.','https://www.wakeforestnc.gov/sites/default/files/styles/parks_images/public/uploads/parks-facilities/gallery/fahertydogpark.jpg?itok=zqgG3dBM',34),
            ('Rovers Romp!',39,5511,354,'456 Sycamore St.','10/22/2023','13:00','15:00','There will be a doggy talent competition, with dogs showcasing their unique talents and abilities.','https://www.doodycalls.com/images/articles/dog-park.jpg',35),
            ('Pups on Parade!',44,314,4354,'789 Laurel Rd.','10/29/2023','16:00','18:00','A local pet store will be on hand to offer discounts and free samples to attendees.','https://www.gannett-cdn.com/presto/2021/08/18/NCOD/e8216dbb-55a0-4a93-991b-07ac53aa5453-dog_park_ac_03.jpg',36),
            ('The Canine Social Club!',10,6858,936,'10 Magnolia Ave.','11/03/2023','11:00','13:00','A doggy movie night will be held, with a dog-friendly movie shown on a big screen in the park.','https://www.goodyearaz.gov/home/showpublishedimage/7809/635931994880730000',37),
            ('Fido Frenzy!',22,5163,1053,'234 Willow St.','11/09/2023','17:00','19:00','There will be a doggy costume contest, with prizes for the most creative and original costumes.','https://www.eulesstx.gov/home/showpublishedimage/2172/636971421213170000',38),
            ('Lets Get Leashed!',47,5843,3573,'567 Redwood Ln.','11/18/2023','14:00','16:00','A local artist will be at the party to paint portraits of the dogs and their owners.','https://balboapark.org/wp-content/uploads/2022/07/IMG_0123-scaled.jpg',39),
            ('Four Paws Up!',26,66,514,'890 Hemlock Rd.','11/23/2023','16:00','18:00','There will be a doggy carnival, with games and activities such as ring toss and balloon darts.','https://www.nbparks.org/wp-content/uploads/2017/02/Dog_Park_0252018-1000x563.jpg',40),
            ('Hounds of Fun!',30,1271,1013,'12 Fir St.','12/01/2023','14:00','16:00','A doggy treat baking contest will be held','https://www.kzooparks.org/files/sharedassets/parks/park-images/fairmount-dog-park.jpg?w=1080',41),
            ('Tail Waggin Tuesdays!',3,7034,452,'345 Cedar Dr.','12/08/2023','17:00','19:00','The dog party is going to be a tail-wagging good time, with lots of fun activities for dogs and their owners to enjoy.','https://www.winterspringsfl.org/sites/default/files/styles/gallery500/public/imageattachments/parksrec/page/3591/dsc08213.jpg?itok=LsIEyzZZ',42),
            ('Dog Days of Summer!',47,7203,306,'678 Dogwood St.','12/13/2023','13:00','15:00','Its going to be held at a local dog park, which means lots of space for the dogs to run around and play.','https://www.eulesstx.gov/home/showpublishedimage/2174/636971421217270000',43),
            ('Bark n Roll!',40,5690,328,'901 Birch Ln.','12/20/2023','11:00','13:00','There will be plenty of water stations set up throughout the park to keep the dogs hydrated, as well as lots of shady spots for them to rest.','https://www.tucsonaz.gov/files/parks/images/AnzaDogPark.jpg',44),
            ('Fidos Fun Time!',27,904,258,'23 Oak Ave.','12/25/2023','17:00','19:00','The party will include organized games and contests, such as a best trick competition and a doggy obstacle course.','https://www.hickorync.gov/sites/default/files/gallery/dogpark%20opening-aerial_0.jpg',45),
            ('Best in Show!',10,3357,1098,'456 Maple St.','01/02/2024','14:00','16:00','There will also be a raffle with great prizes, such as gift cards to local pet stores and free grooming services.','https://storage.googleapis.com/proudcity/playmiamisburgoh/uploads/2021/06/Page-hero-image_CANAL-RUN-DOG-PARK-01-1-scaled.jpg',46),
            ('Pooch Playtime!',50,4479,298,'789 Pine Rd.','01/06/2024','10:00','12:00','Dogs and their owners are encouraged to dress up in costume for the party, with a prize for the best-dressed dog and owner pair.','https://www.ajc.com/resizer/EFdzCS4l11nl9rUe5qzGILtlvFE=/1200x630/cloudfront-us-east-1.images.arcpublishing.com/ajc/55B54MKMKJU2ZTXZHLAYGV4E6Q.png',47),
            ('Meet the Pack!',27,3343,1885,'10 Elm Ave.','01/11/2024','16:00','18:00','A local dog trainer will be on hand to offer tips and advice on how to keep your furry friend happy and healthy.','https://www.garnernc.gov/home/showpublishedimage/6037/636421247624330000',48),
            ('Furry and Fabulous!',16,4507,4013,'234 Cedar St.','01/19/2024','14:00','16:00','There will be plenty of dog-friendly snacks and treats available, such as homemade dog biscuits and frozen yogurt.','https://www.myboca.us/ImageRepository/Document?documentID=30613',49),
            ('Woof & Wine!',2,152,112,'567 Birch Ln.','01/26/2024','15:00','17:00','A professional dog photographer will be at the party to capture all the fun and excitement.','https://www.sonomamag.com/wp-content/uploads/2018/12/Jordan-Winery-Healdsburg-Halsey-Dog-Courtesy-Photo.jpg',50),
            ('Bark & Brunch!',13,697,636,'890 Oak Rd.','02/03/2024','10:00','12:00','The party will have a theme, such as a beach party or a Halloween party, to add to the festive atmosphere.','https://images.squarespace-cdn.com/content/v1/53d16cf4e4b0f4ae96721028/1410816335603-8CKBJQWFENATMAFQMBXE/image-asset.jpeg',51),
            ('Happy Howls!',29,2232,453,'12 Walnut St.','02/08/2024','16:00','18:00','Local animal shelters and rescue groups will be in attendance to talk about their programs and encourage adoption.','https://cloudfront-us-east-1.images.arcpublishing.com/advancelocal/P2YX4OB7CNBY5J6UENK5LBXCZE.jpg',52),
            ('The Pawty Never Ends!',21,3019,3169,'345 Ash Dr.','02/15/2024','13:00','15:00','There will be a doggy gift exchange, where each dog brings a wrapped gift to exchange with another dog.','https://www.burlingtonnc.gov/ImageRepository/Document?documentID=18032',53),
            ('Bow Wow Bash!',51,1240,2853,'678 Cherry St.','02/23/2024','16:00','18:00','A dog agility course will be set up, with trainers on hand to guide dogs and their owners through the course.','https://www.mbcparks-rec.org/wp-content/uploads/2020/03/Wurzburg-Dog-Park-1-1024x681.jpg',54),
            ('The Doggy Social!',49,1186,3591,'901 Poplar Ln.','03/01/2024','13:00','15:00','There will be a doggy scavenger hunt, with clues hidden throughout the park for dogs to find and solve.','https://www.cityofgreen.org/ImageRepository/Document?documentID=1422',55),
            ('Puppy Party!',8,1820,2197,'23 Cedar Ave.','03/08/2024','11:00','13:00','A doggy pool party will be set up, with a kiddie pool filled with water for the dogs to splash around in.','https://www.k9ofmine.com/wp-content/uploads/2021/01/dog-park-alternatives.jpg',56),
            ('The Great Dane Gathering!',12,3177,28,'456 Sycamore St.','03/13/2024','14:00','16:00','A doggy fashion show will be held, with dogs strutting their stuff in front of a panel of judges.','https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/1e/0c/ac/lakeside-dog-park-at.jpg?w=1200&h=1200&s=1',57),
            ('Doggy Day Out!',41,1431,827,'789 Laurel Rd.','03/20/2024','17:00','19:00','A caricature artist will be at the party to draw pictures of the dogs and their owners.','https://snohomishcountywa.gov/ImageRepository/Document?documentID=86957',58),
            ('The Pup Parade!',18,2434,1195,'10 Magnolia Ave.','03/27/2024','15:00','17:00','A local dog rescue group will bring adoptable dogs to the party, giving attendees the opportunity to find a new furry friend.','https://www.fostercity.org/sites/default/files/styles/gallery500/public/imageattachments/parksrec/page/6391/dog_park.jpg?itok=eGH_S3jF',59),
            ('The Hound Hangout!',37,7043,4128,'234 Willow St.','04/03/2024','14:00','16:00','There will be a doggy talent show, with dogs showing off their unique skills and tricks.','https://www.nycgovparks.org/photo_gallery/full_size/18957.jpg',60),
            ('Happy Hounds!',35,3751,3773,'567 Redwood Ln.','04/11/2024','17:00','19:00','A doggy massage station will be set up, with professional massage therapists offering massages to dogs.','https://www.hermannpark.org/media/uploads/pages/.thumbnails/waterplay-resize-680x400.jpg',61),
            ('The Furry Fest!',4,3946,3172,'890 Hemlock Rd.','04/19/2024','13:00','15:00','The party will have a doggy cake walk, with dogs and their owners circling around the cake for a chance to win a prize.','https://hawspets.org/wp-content/uploads/2021/09/Dog-Park.jpg',62),
            ('Canine Carnival!',1,4557,4028,'12 Fir St.','04/26/2024','15:00','17:00','A doggy DIY station will be set up, with supplies and instructions for attendees to make their own dog toys and treats.','https://www.cityofholland.com/ImageRepository/Document?documentID=3296',63),
            ('The Tailgate Party!',46,4568,1837,'345 Cedar Dr.','05/03/2024','12:00','14:00','A doggy photo booth will be set up, with fun props and backdrops for dogs and their owners to take pictures with.','https://www.nbtexas.org/ImageRepository/Document?documentID=19010',64),
            ('The Bark and Bounce!',43,4735,259,'678 Dogwood St.','05/10/2024','14:00','16:00','A doggy obstacle course will be set up, with trainers on hand to guide dogs and their owners through the course.','https://www.laparks.org/sites/default/files/facility/sepulveda-basin-leash-dog-park/images/sepulveda-basin-dog-park-26.jpg',65),
            ('The Poodle Party!',23,1082,1489,'901 Birch Ln.','05/17/2024','10:00','12:00','There will be a doggy talent competition, with dogs showcasing their unique talents and abilities.','https://ewscripps.brightspotcdn.com/dims4/default/ff7c8ad/2147483647/strip/true/crop/2022x1062+0+35/resize/1200x630!/quality/90/?url=http%3A%2F%2Fewscripps-brightspot.s3.amazonaws.com%2F6b%2Fa2%2Fb514ffb84a5485d8606657426224%2Fscreen-shot-2021-01-21-at-5.09.19%20PM.png',66),
            ('The Golden Retriever Get-Together!',25,3402,355,'23 Oak Ave.','05/24/2024','15:00','17:00','A local pet store will be on hand to offer discounts and free samples to attendees.','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvxak2aQmAA6yHfyojd9218Xo9r7KflzT-I2UKOoNnmgPfu-loe-qv_kJzk1pIfmmhtC8&usqp=CAU',67),
            ('The Great Pyrenees Playdate!',48,6844,694,'456 Maple St.','06/01/2024','16:00','18:00','A doggy movie night will be held, with a dog-friendly movie shown on a big screen in the park.','https://www.gannett-cdn.com/presto/2023/01/05/NTTN/df51bf3b-e24c-4c42-8d91-1a5eec442704-FullSizeRender.jpeg',68),
            ('The German Shepherd Gathering!',39,2931,1481,'789 Pine Rd.','06/08/2024','12:00','14:00','There will be a doggy costume contest, with prizes for the most creative and original costumes.','https://wpcdn.us-east-1.vip.tn-cloud.net/www.sactownmag.com/content/uploads/data-import/001a6a2c/DogPark-6.jpg',69),
            ('The Labrador Lollapalooza!',3,5467,692,'10 Elm Ave.','06/15/2024','17:00','19:00','A local artist will be at the party to paint portraits of the dogs and their owners.','https://www.fredericksburgva.gov/ImageRepository/Document?documentID=12125',70),
            ('The Husky Howl!',47,5843,244,'234 Cedar St.','06/22/2024','15:00','17:00','There will be a doggy carnival, with games and activities such as ring toss and balloon darts.','https://www.palatineparks.org/rccms/wp-content/uploads/2019/02/DogPark_Header.jpg',71),
            ('The Bulldog Bash!',17,6979,1777,'567 Birch Ln.','06/29/2024','16:00','18:00','A doggy treat baking contest will be held','https://www.eulesstx.gov/home/showpublishedimage/2150/636971421168030000',72),
            ('The Dalmatian Dance Party!',37,3349,461,'890 Oak Rd.','07/06/2024','10:00','12:00','The dog party will be held in a spacious outdoor venue, with plenty of grassy areas for the dogs to run and play.','https://bloximages.newyork1.vip.townnews.com/nashvillepost.com/content/tncms/assets/v3/editorial/f/0c/f0cd6fe8-96bd-11ed-8f5c-ff59aeab2b92/63c72ded21567.image.jpg?resize=889%2C500',73),
            ('The Corgi Carnival!',24,1457,3975,'12 Walnut St.','07/13/2024','13:00','15:00','There will be a variety of fun activities for the dogs, including a doggy fashion show and a canine obstacle course.','https://assets.chicagoparkdistrict.com/s3fs-public/styles/558x314/public/images/park/dog%20park%20at%20Pott%202019%20-1-.JPG?itok=_pRsMS5g',74),
            ('The Beagle Bonanza!',14,6613,3887,'345 Ash Dr.','07/20/2024','12:00','14:00','A local rescue group will be present at the party, giving attendees the chance to adopt a furry friend.','https://www.carlsbadca.gov/home/showpublishedimage/1884/637540129947770000',75)





        ;
        """,
        """
        SELECT setval('events_id_seq', (SELECT MAX(id) FROM events));
        """,
    ]
]
