steps = [
    [
        # "Up" SQL statement
        """
        INSERT INTO statuses (status_text, time_stamp, image_url, account_id) VALUES

('ex1','2023-02-04T14:31:13.036232',0,1),
('ex2','2023-03-04T14:31:13.036233',1,2),
('ex3','2023-04-04T14:31:13.036234',2,3),
('ex4','2023-05-04T14:31:13.036235',3,4),
('Just ate a whole bag of treats. Life is good.','2023-03-04T14:31:13.036236',4,5),
('Barked at my own reflection again. That guy needs to learn some manners.','2023-03-04T14:31:13.036237',5,6),
('Im not begging, Im just staring at you while you eat.','2023-03-04T14:31:13.036238',6,7),
('Finally caught that pesky squirrel. Victory is mine!','2023-03-04T14:31:13.036239',7,8),
('Just peed on every tree in the park. My work here is done.','2023-03-04T14:31:13.036240',8,9),
('I heard the word “walk” and now I cant contain my excitement.','2023-03-04T14:31:13.036241',9,10),
('Tried to catch my tail again. No luck.','2023-03-04T14:31:13.036242',10,11),
('Found a comfy spot on the couch. Nobody move.','2023-03-04T14:31:13.036243',11,12),
('Just rolled around in something stinky. Humans seem to dislike it but I think it smells great.','2023-03-04T14:31:13.036244',12,13),
('Just learned how to sit. Im basically a genius.','2023-03-04T14:31:13.036245',13,14),
('Chased my own shadow for 10 minutes straight. Im exhausted.','2023-03-04T14:31:13.036246',14,15),
('Napped for 4 hours today. Feeling refreshed and ready for more napping.','2023-03-04T14:31:13.036247',15,16),
('Sniffed every blade of grass in the yard. I take my job as a lawn inspector very seriously.','2023-03-04T14:31:13.036248',16,17),
('Ate a bee. Mouth feels funny.','2023-03-04T14:31:13.036249',17,18),
('Stared at the mailman through the window for 20 minutes straight. Hes lucky there was a screen in between us.','2023-03-04T14:31:13.036250',18,19),
('Jumped into the pool for the first time. Turns out Im a natural swimmer!','2023-03-04T14:31:13.036251',19,20),
('Got a bath today. I feel like a wet noodle.','2023-03-04T14:31:13.036252',20,21),
('Tried to catch a fly. It didnt end well.','2023-03-04T14:31:13.036253',21,22),
('I think I just saw a cat. Must investigate.','2023-03-04T14:31:13.036254',22,23),
('Just got a new squeaky toy. Life is good.','2023-03-04T14:31:13.036255',23,24),
('Slept on the bed all day. The hoomans were not pleased.','2023-03-04T14:31:13.036256',24,25),
('Found a bone buried in the yard. Victory is mine!','2023-03-04T14:31:13.036257',25,26),
('Tried to fit my entire body into a shoebox. No luck.','2023-03-04T14:31:13.036258',26,27),
('Just went for a ride in the car. Wind in my fur, tongue out. Pure bliss.','2023-03-04T14:31:13.036259',27,28),
('Found a new hiding spot under the bed. Nobody can find me now.','2023-03-04T14:31:13.036260',28,29),
('Just caught a frisbee mid-air. Im basically a superhero.','2023-03-04T14:31:13.036261',29,30),
('Tried to make friends with a skunk. It didnt end well.','2023-03-04T14:31:13.036262',30,31),
('Just learned how to shake hands. Hoomans are impressed.','2023-03-04T14:31:13.036263',31,32),
('Got a haircut today. I feel so light and airy!','2023-03-04T14:31:13.036264',32,33),
('Just chased my own tail for 20 minutes straight. Im dizzy but satisfied.','2023-03-04T14:31:13.036265',33,34),
('Tried to climb a tree. It did not work out.','2023-03-04T14:31:13.036266',34,35),
('Nudged the hoomans until they let me sleep in the bed. Victory is mine!','2023-03-04T14:31:13.036267',35,36),
('Just ate a shoe. The hoomans were not pleased.','2023-03-04T14:31:13.036268',36,37),
('Found a new stick to chew on. Life is good.','2023-03-04T14:31:13.036269',37,38),
('Tried to steal the hoomans dinner. They caught me in the act.','2023-03-04T14:31:13.036270',38,39),
('Just had a bath. Smellin like a rose now.','2023-03-04T14:31:13.036271',39,40),
('Tried to dig to China. No luck.','2023-03-04T14:31:13.036272',40,41),
('Ate a whole stick of butter. My breath smells delicious.','2023-03-04T14:31:13.036273',41,42),
('Got lost in the backyard. Hoomans had to rescue me.','2023-03-04T14:31:13.036274',42,43),
('Just learned how to speak. Im very articulate for a dog.','2023-03-04T14:31:13.036275',43,44),
('Tried to make friends with a bird. It did not go well.','2023-03-04T14:31:13.036276',44,45),
('Just went for a walk. Sniffed so many things, saw so many sights.','2023-03-04T14:31:13.036277',45,46),
('Found a new spot in the sun to nap. Nobody move me, please.','2023-03-04T14:31:13.036278',46,47),
('Tried to catch a bird. It was too fast.','2023-03-04T14:31:13.036279',47,48),
('Just learned how to beg. Hoomans are putty in my paws now.','2023-03-04T14:31:13.036280',48,49),
('Found a new toy buried in the yard. Victory is mine!','2023-03-04T14:31:13.036281',49,50),
('Ate a bee. Mouth feels funny. Still worth it.','2023-03-04T14:31:13.036282',50,51),
('Just stole the hoomans socks','2023-03-04T14:31:13.036283',51,52),
('Bark at the mailman, then act innocent when they give you a treat.','2023-03-04T14:31:13.036284',52,53),
('Just ate a whole bag of treats. Life is good.','2023-03-04T14:31:13.036285',53,54),
('Tried to catch my tail today. Almost had it.','2023-03-04T14:31:13.036286',54,55),
('Barked at my own reflection for an hour. I won the staring contest.','2023-03-04T14:31:13.036287',55,56),
('Accidentally licked the window. Tasted like regret.','2023-03-04T14:31:13.036288',56,57),
('If humans can have "take your dog to work" day, why cant we have "take your human to the park" day?','2023-03-04T14:31:13.036289',57,58),
('Farted and scared myself.','2023-03-04T14:31:13.036290',58,59),
('Just realized Ive been chasing my tail for years and Im no closer to catching it.','2023-03-04T14:31:13.036291',59,60),
('Tasted my own butt today. 0/10, do not recommend.','2023-03-04T14:31:13.036292',60,61),
('Found a bone buried in the backyard. Its going straight to my waistline.','2023-03-04T14:31:13.036293',61,62),
('Took a nap and woke up thinking it was dinner time. It wasnt.','2023-03-04T14:31:13.036294',62,63),
('Just learned how to roll over. Now I can impress all my dog friends.','2023-03-04T14:31:13.036295',63,64),
('Destroyed a squeaky toy in record time. No witnesses, no evidence.','2023-03-04T14:31:13.036296',64,65),
('My human tried to give me a bath. I retaliated by shaking water all over them.','2023-03-04T14:31:13.036297',65,66),
('Solved the mystery of the missing sock. It was me. I ate it.','2023-03-04T14:31:13.036298',66,67),
('Napped for four hours straight. Still tired.','2023-03-04T14:31:13.036299',67,68),
('Begged for a bite of human food, then decided I didnt like it. Typical.','2023-03-04T14:31:13.036300',68,69),
('Found the perfect sunbeam to nap in. Nobody disturb me.','2023-03-04T14:31:13.036301',69,70),
('Barked at a butterfly for 20 minutes straight. It was a worthy opponent.','2023-03-04T14:31:13.036302',70,71),
('Licked my humans face until they woke up. Mission accomplished.','2023-03-04T14:31:13.036303',71,72),
('Just learned how to fetch. I think Im ready for the big leagues.','2023-03-04T14:31:13.036304',72,73),
('Ate a bug. Not sure if it was worth it.','2023-03-04T14:31:13.036305',73,74),
('Sat on my humans lap for an hour. They couldnt move, but they didnt seem to mind.','2023-03-04T14:31:13.036306',74,75),
('Chased my tail so hard I fell over. But I got up and tried again.','2023-03-04T14:31:13.036307',75,76),
('Bark at a squirrel all day, they said. Itll be fun, they said.','2023-03-04T14:31:13.036308',76,77),
('Tried to fit a tennis ball in my mouth. Failed miserably.','2023-03-04T14:31:13.036309',77,78),
('Followed my human into the bathroom. They were not amused.','2023-03-04T14:31:13.036310',78,79),
('Just realized I have no idea what Im doing. But Im doing it with enthusiasm.','2023-03-04T14:31:13.036311',79,80),
('Got excited about going for a walk, then realized it was raining. Disappointed but not defeated.','2023-03-04T14:31:13.036312',80,81),
('Ate a whole pizza when my human wasnt looking. Zero regrets.','2023-03-04T14:31:13.036313',81,82),
('Snuggled with my human all day. It was a good day.','2023-03-04T14:31:13.036314',82,83),
('Stared at a wall for an hour. Still not sure what I was expecting to happen.','2023-03-04T14:31:13.036315',83,84),
('Finally caught that pesky fly. Victory tastes like fur.','2023-03-04T14:31:13.036316',84,85),
('Tried to climb a tree. Fell out of a tree. Dont judge me.','2023-03-04T14:31:13.036317',85,86),
('Ate grass until I threw up. Regrets were had.','2023-03-04T14:31:13.036318',86,87),
('Begged for belly rubs, then bit my humans hand. The ultimate betrayal.','2023-03-04T14:31:13.036319',87,88),
('Dreamed about chasing squirrels all night. Woke up exhausted.','2023-03-04T14:31:13.036320',88,89),
('Chewed up a brand new pair of shoes. It was worth it for the attention.','2023-03-04T14:31:13.036321',89,90),
('Tried to dig to China. Made it two inches. Will try again tomorrow.','2023-03-04T14:31:13.036322',90,91),
('Slept in the sun all day. Woke up with a sunburn.','2023-03-04T14:31:13.036323',91,92),
('Just barked at my own shadow. It was a tense standoff.','2023-03-04T14:31:13.036324',92,93),
('Took a bath and immediately rolled in the dirt. Back to square one.','2023-03-04T14:31:13.036325',93,94),
('Discovered a hidden stash of treats. My lucky day.','2023-03-04T14:31:13.036326',94,95),
('Stole a sock and refused to give it back. Its mine now.','2023-03-04T14:31:13.036327',95,96),
('Ate a bowl of kibble, then begged for a bite of human','2023-03-04T14:31:13.036328',96,97),
('Just had a staring contest with a squirrel. I won, but he didnt seem to care.','2023-03-04T14:31:13.036329',97,98),
('The mailman just delivered my new chew toy. Its like Christmas in March!','2023-03-04T14:31:13.036330',98,99),
('Accidentally ate a bug today. Not bad, but could use more seasoning.','2023-03-04T14:31:13.036331',99,100),
('Tried to teach the cat to fetch. It didnt go well.','2023-03-04T14:31:13.036332',100,101),
('Napped for 6 hours straight. Feeling refreshed and ready to do it again.','2023-03-04T14:31:13.036333',101,102),
('Just realized Ive been barking at the same squirrel for 3 years. I think were in love.','2023-03-04T14:31:13.036334',102,103),
('Got a new haircut today. Now Im even more irresistible.','2023-03-04T14:31:13.036335',103,104),
('Just caught my tail. Again. Will I ever learn?','2023-03-04T14:31:13.036336',104,105),
('Chased my own shadow for 30 minutes. Its a love-hate relationship.','2023-03-04T14:31:13.036337',105,106),
('Tried to make friends with a bird. Turns out they dont appreciate face licks.','2023-03-04T14:31:13.036338',106,107),
('Just discovered the joys of peanut butter. Life will never be the same.','2023-03-04T14:31:13.036339',107,108),
('Barked at the vacuum cleaner for an hour. Pretty sure it wont bother me again.','2023-03-04T14:31:13.036340',108,109),
('Nailed a perfect backflip. Okay, it was in a dream, but still impressive.','2023-03-04T14:31:13.036341',109,110),
('Just found a whole bag of treats hidden under the couch. Jackpot!','2023-03-04T14:31:13.036342',110,111),
('Just licked my humans face. They seemed happy about it, but I still dont get the appeal.','2023-03-04T14:31:13.036343',111,112),
('Got caught chewing on the couch. Time to find a new hiding spot.','2023-03-04T14:31:13.036344',112,113),
('Spent the day sunbathing. Feeling like a golden retriever goddess.','2023-03-04T14:31:13.036345',113,114),
('Just learned how to roll over. Feeling pretty proud of myself.','2023-03-04T14:31:13.036346',114,115),
('Tried to fit my entire head in a tennis ball. Didnt work, but had fun trying.','2023-03-04T14:31:13.036347',115,116),
('Just realized Ive been sitting in a patch of sunshine for an hour. Life is good.','2023-03-04T14:31:13.036348',116,117),
('Had a staring contest with my reflection. Its like looking into a mirror, but better.','2023-03-04T14:31:13.036349',117,118),
('Just chased my tail for 10 minutes straight. I think Im getting dizzy.','2023-03-04T14:31:13.036350',118,119),
('Just had a bath. Feeling violated, but smelling like a daisy.','2023-03-04T14:31:13.036351',119,120),
('Tried to steal a sandwich from the kitchen counter. Failed miserably, but worth a shot.','2023-03-04T14:31:13.036352',120,121),
('Just discovered the joys of belly rubs. Now addicted.','2023-03-04T14:31:13.036353',121,122),
('Barked at a leaf blowing in the wind. You never know when it might attack.','2023-03-04T14:31:13.036354',122,123),
('Just had a photoshoot. Feeling like a doggy supermodel.','2023-03-04T14:31:13.036355',123,124),
('Just got a new toy. Its like Christmas in April!','2023-03-04T14:31:13.036356',124,125),
('Tried to catch a bird. Turns out theyre faster than they look.','2023-03-04T14:31:13.036357',125,126),
('Just had a nap. Feeling like a whole new dog.','2023-03-04T14:31:13.036358',126,127),
('Just discovered the joys of ear scratches. I never want them to stop.','2023-03-04T14:31:13.036359',127,128),
('Got caught digging a hole in the backyard. Not sorry.','2023-03-04T14:31:13.036360',128,129),
('Just barked at a butterfly. You never know what theyre up to.','2023-03-04T14:31:13.036361',129,130),
('Just took a dump in the neighbors yard. Feeling like a rebel.','2023-03-04T14:31:13.036362',130,131),
('Tried to climb a tree. Failed miserably, but got some good exercise.','2023-03-04T14:31:13.036363',131,132),
('Just had a staring contest with a cloud. I think I won.','2023-03-04T14:31:13.036364',132,133),
('Just chased a squirrel up a tree. Feeling like a doggy superhero.','2023-03-04T14:31:13.036365',133,134),
('Just discovered the joys of car rides. I never want them to end.','2023-03-04T14:31:13.036366',134,135),
('Tried to play fetch with a rock. Not my best idea.','2023-03-04T14:31:13.036367',135,136),
('Just learned how to give high-fives. Feeling pretty fancy.','2023-03-04T14:31:13.036368',136,137),
('Just caught my tail. Twice. Im basically a genius.','2023-03-04T14:31:13.036369',137,138),
('Just discovered the joys of peanut butter and bacon. My life will never be the same.','2023-03-04T14:31:13.036370',138,139),
('Just chased a butterfly. Its like Im living in a dream.','2023-03-04T14:31:13.036371',139,140),
('Tried to steal a piece of pizza. Got caught, but it was worth it.','2023-03-04T14:31:13.036372',140,141),
('Just got back from the groomer and feeling like a brand new woof!','2023-03-04T14:31:13.036373',141,142),
('Found the holy grail of tennis balls, and its all mine.','2023-03-04T14:31:13.036374',142,143),
('Sometimes I pretend to be asleep just so I can see what my hooman is up to.','2023-03-04T14:31:13.036375',143,144),
('Ate a whole wheel of cheese last night. No regrets.','2023-03-04T14:31:13.036376',144,145),
('My hooman thinks Im chasing birds, but Im really just chasing my dreams.','2023-03-04T14:31:13.036377',145,146),
('If loving belly rubs is wrong, then I dont want to be right.','2023-03-04T14:31:13.036378',146,147),
('The hooman tried to take me for a walk, but I took them for a run instead.','2023-03-04T14:31:13.036379',147,148),
('I swear Im part cat. Just caught myself grooming my paw.','2023-03-04T14:31:13.036380',148,149),
('Just saw a squirrel outside and lost my marbles.','2023-03-04T14:31:13.036381',149,150),
('I dont always bark at strangers, but when I do, its because theyre walking by my house.','2023-03-04T14:31:13.036382',150,151),
('When life gives you lemons, chew them up and spit them out.','2023-03-04T14:31:13.036383',151,152),
('Just got a new bone and feeling like a million biscuits.','2023-03-04T14:31:13.036384',152,153),
('My hooman just said "walkies" and now Im about to lose my mind.','2023-03-04T14:31:13.036385',153,154),
('Nothing to see here, just catching up on my beauty sleep.','2023-03-04T14:31:13.036386',154,155),
('Just took a long nap and dreamed about chasing squirrels. It was epic.','2023-03-04T14:31:13.036387',155,156),
('Who needs a personal trainer when youve got a tennis ball?','2023-03-04T14:31:13.036388',156,157),
('My hooman says Im a good boy, but Im pretty sure Im a great boy.','2023-03-04T14:31:13.036389',157,158),
('Just found out I can fit my whole head in this water bowl. Life is full of surprises.','2023-03-04T14:31:13.036390',158,159),
('If my hooman thinks Im going outside when its raining, theyve got another thing coming.','2023-03-04T14:31:13.036391',159,160),
('Ate a stick of butter and now I feel like a champion.','2023-03-04T14:31:13.036392',160,161),
('Just took a long walk and saw so many smells.','2023-03-04T14:31:13.036393',161,162),
('When life gets ruff, just roll over and take a nap.','2023-03-04T14:31:13.036394',162,163),
('Tried to dig a hole to China today. Only got as far as the neighbors garden.','2023-03-04T14:31:13.036395',163,164),
('My hooman says Im not allowed on the couch, but I think they mean when theyre around.','2023-03-04T14:31:13.036396',164,165),
('Just got a new squeaky toy and its the greatest thing since sliced kibble.','2023-03-04T14:31:13.036397',165,166),
('If theres one thing I know for sure, its that life is better with a wagging tail.','2023-03-04T14:31:13.036398',166,167),
('Just found out that "woof" spelled backwards is "foow". My mind is blown.','2023-03-04T14:31:13.036399',167,168),
('Sometimes I like to pretend Im a lap dog, even though I weigh 80 pounds.','2023-03-04T14:31:13.036400',168,169),
('Just ate a whole bag of dog treats and Im not even sorry.','2023-03-04T14:31:13.036401',169,170),
('If anyone needs me, Ill be napping under the bed.','2023-03-04T14:31:13.036402',170,171),
('Just discovered that my reflection in the mirror is also a dog. Mind. Blown.','2023-03-04T14:31:13.036403',171,172),
('Took a walk with my hooman today and smelled at least 100 butts. It was a good day.','2023-03-04T14:31:13.036404',172,173),
('Just finished a game of fetch and feeling like a superstar.','2023-03-04T14:31:13.036405',173,174),
('My hooman says Im not allowed to chase the mailman, but Im pretty sure they dont mean it.','2023-03-04T14:31:13.036406',174,175),
('Just woke up from a nap and feeling like a brand new dog.','2023-03-04T14:31:13.036407',175,176),
('When in doubt, just wag your tail and see what happens.','2023-03-04T14:31:13.036408',176,177),
('My hooman said "no" to a treat, but I took it anyway. #rebel','2023-03-04T14:31:13.036409',177,178),
('Just discovered that I can balance a ball on my nose. Life goals = achieved.','2023-03-04T14:31:13.036410',178,179),
('My hooman says Im not allowed to beg at the table, but Im pretty sure they dont mean it.','2023-03-04T14:31:13.036411',179,180),
('Just took a long walk and saw so many butts. It was a good day.','2023-03-04T14:31:13.036412',180,181),
('Just took a bath and I feel betrayed by my human. #notcool','2023-03-04T14:31:13.036413',181,182),
('Accidentally barked at my own reflection today. #oops','2023-03-04T14:31:13.036414',182,183),
('Trying to act like I didnt just eat that sock... #failed','2023-03-04T14:31:13.036415',183,184),
('Sometimes I think my human is the real animal. #humanbehavior','2023-03-04T14:31:13.036416',184,185),
('Im not saying Im a superhero, but I have saved my human from a scary vacuum a few times. #heroic','2023-03-04T14:31:13.036417',185,186),
('Just saw a squirrel and almost lost my mind. #squirrelwatch2022','2023-03-04T14:31:13.036418',186,187),
('Just found out that dog spelled backwards is god. Coincidence? I think not. #deepthoughts','2023-03-04T14:31:13.036419',187,188),
('My human thinks Im sleeping, but Im really just ignoring them. #doglife','2023-03-04T14:31:13.036420',188,189),
('Just realized that when my human says "whos a good boy?" its always me. #humblebrag','2023-03-04T14:31:13.036421',189,190),
('I dont always beg for treats, but when I do, I make sure to use my puppy dog eyes. #cutenessoverload','2023-03-04T14:31:13.036422',190,191),
('Sometimes I like to pretend Im a lap dog even though I weigh 80 pounds. #lapdogdreams','2023-03-04T14:31:13.036423',191,192),
('Im not fat, Im just big-boned... and love treats. #doglogic','2023-03-04T14:31:13.036424',192,193),
('Just spent the entire day napping and I regret nothing. #doggoals','2023-03-04T14:31:13.036425',193,194),
('My human took me on a walk today and I saw a leaf. It was pretty exciting. #adventuretime','2023-03-04T14:31:13.036426',194,195),
('Just caught my tail again... Im not sure why I keep falling for that one. #sillydog','2023-03-04T14:31:13.036427',195,196),
('My human has been binge-watching dog videos on YouTube and Im starting to get jealous. #competition','2023-03-04T14:31:13.036428',196,197),
('Just realized that humans dont have tails and now I feel sorry for them. #taillove','2023-03-04T14:31:13.036429',197,198),
('Trying to teach my human how to fetch, but they just dont get it. #teachertales','2023-03-04T14:31:13.036430',198,199),
('My human thinks theyre in charge, but we all know who really wears the collar in this relationship. #dominantdog','2023-03-04T14:31:13.036431',199,200),
('Just got a new squeaky toy and Im never letting it go. #obsessed','2023-03-04T14:31:13.036432',200,201),
('Just got a haircut and now I feel like a whole new dog. #fancydog','2023-03-04T14:31:13.036433',201,202),
('My human keeps calling me a "good boy" but I prefer to be called "excellent dog". #highstandards','2023-03-04T14:31:13.036434',202,203),
('Just saw a cat and tried to play it cool, but I couldnt help barking. #catfear','2023-03-04T14:31:13.036435',203,204),
('I heard my human say "dog breath" and Im not sure if they were complimenting me or not. #confused','2023-03-04T14:31:13.036436',204,205),
('Just found out that bacon is not a daily essential. #heartbroken','2023-03-04T14:31:13.036437',205,206),
('Sometimes I wonder if my human knows that I understand every word they say. #dogwisdom','2023-03-04T14:31:13.036438',206,207),
('I have a lot of love to give, but I demand belly rubs in return. #lovemeback','2023-03-04T14:31:13.036439',207,208),
('Just discovered that I can fit in a shopping bag and now Im the happiest dog in the world. #tinydog','2023-03-04T14:31:13.036440',208,209),
('My human took me to the dog park today and I met a lot of new butts. #dogparklife','2023-03-04T14:31:13.036441',209,210),
('Just heard my human say "whos a bad boy?" and Im not sure what I did wrong. #confuseddog','2023-03-04T14:31:13.036442',210,211),
('I love car rides so much that I always pretend Im driving. #driverdog','2023-03-04T14:31:13.036443',211,212),
('My human keeps telling me to "drop it" but Im not sure what "it" is. #confusedpup','2023-03-04T14:31:13.036444',212,213),
('I heard my human say "I love you" and I think they were talking to me. #heartwarmed','2023-03-04T14:31:13.036445',213,214),
('Took a nap, woke up, still a good boy. Life is good.','2023-03-04T14:31:13.036446',214,215),
('Went to the vet today. They said I was a good boy, but I knew that already.','2023-03-04T14:31:13.036447',215,216),
('Tried to catch my tail again today. Still havent succeeded, but Ill keep trying.','2023-03-04T14:31:13.036448',216,217),
('Saw a squirrel today. Barked at it. It ran away. Victory is mine.','2023-03-04T14:31:13.036449',217,218),
('Just found a bone buried in the backyard. Best. Day. Ever.','2023-03-04T14:31:13.036450',218,219),
('Humans are eating something called "pizza" tonight. Hoping for some table scraps.','2023-03-04T14:31:13.036451',219,220),
('Just realized Ive been chasing my own shadow for 20 minutes. I am not a smart dog.','2023-03-04T14:31:13.036452',220,221),
('Spent all day sleeping. Still tired. Will probably sleep more.','2023-03-04T14:31:13.036453',221,222),
('Accidentally knocked over the trash can today. Found a treasure trove of food scraps.','2023-03-04T14:31:13.036454',222,223),
('Followed my human into the bathroom. Watched them pee. Very awkward.','2023-03-04T14:31:13.036455',223,224),
('Just had a bath. Hate baths. Will spend the next hour rolling in dirt to reclaim my scent.','2023-03-04T14:31:13.036456',224,225),
('Tried to catch a fly today. Failed miserably. Will try again tomorrow.','2023-03-04T14:31:13.036457',225,226),
('Woke up early today. Got to enjoy the sunrise. Then went back to bed.','2023-03-04T14:31:13.036458',226,227),
('Just heard thunder. Hid under the bed. Terrified.','2023-03-04T14:31:13.036459',227,228),
('Went on a walk today. Smelled everything. Life is good.','2023-03-04T14:31:13.036460',228,229),
('Just discovered the joys of belly rubs. Will demand them constantly from now on.','2023-03-04T14:31:13.036461',229,230),
('My human left for work today. Sat by the door for 5 hours waiting for them to come back.','2023-03-04T14:31:13.036462',230,231),
('Just realized Im out of dog food. Will stare at my human until they get the hint.','2023-03-04T14:31:13.036463',231,232),
('Sat outside and barked at the mailman for 30 minutes. Success.','2023-03-04T14:31:13.036464',232,233),
('Just ate a bee. Not sure if I should be proud or ashamed.','2023-03-04T14:31:13.036465',233,234),
('Went on a car ride today. Stuck my head out the window. Felt alive.','2023-03-04T14:31:13.036466',234,235),
('Just saw my reflection in the mirror. Thought there was another dog in the house. Confused.','2023-03-04T14:31:13.036467',235,236),
('Just realized Im the goodest boy. Will continue to strive for greatness.','2023-03-04T14:31:13.036468',236,237),
('Just realized that "fetch" is just a way for hoomans to get their exercise without actually having to run.','2023-03-04T14:31:13.036469',237,238),
('Just convinced my hooman to give me an extra treat by pretending to be sad. Theyll never know my true intentions.','2023-03-04T14:31:13.036470',238,239),
('Nothing makes me happier than chasing my tail, except maybe chasing squirrels.','2023-03-04T14:31:13.036471',239,240),
('Just got a new squeaky toy and its the best thing ever. Sorry, hoomans, but I love it more than you.','2023-03-04T14:31:13.036472',240,241),
('My hooman says Im a good boy, but I prefer to think of myself as a great boy.','2023-03-04T14:31:13.036473',241,242),
('Just spent 20 minutes barking at a leaf blowing in the wind. Who says Im not a hero?','2023-03-04T14:31:13.036474',242,243),
('I may not be able to speak hooman, but I understand everything they say. Especially when they talk about treats.','2023-03-04T14:31:13.036475',243,244),
('Why do hoomans always say "no" when I want to jump on the couch? Dont they know how comfy it is up here?','2023-03-04T14:31:13.036476',244,245),
('I think I just saw a ghost. Or maybe it was just a really fluffy pillow.','2023-03-04T14:31:13.036477',245,246),
('Just ate a bug. It wasnt very tasty, but Im pretty sure it counts as protein.','2023-03-04T14:31:13.036478',246,247),
('Just ate the entire pizza on the kitchen counter. Time to take a nap.','2023-03-04T14:31:13.036479',247,248),
('Why do humans insist on bathing us? Do they not understand that we are already clean?','2023-03-04T14:31:13.036480',248,249),
('If I had a dollar for every time I heard "no, dont eat that," Id be a millionaire.','2023-03-04T14:31:13.036481',249,250),
('Just spent 10 minutes barking at a squirrel outside. Its a tough job, but someones gotta do it.','2023-03-04T14:31:13.036482',250,251),
('My human said Im a good boy, but I know Im a great boy.','2023-03-04T14:31:13.036483',251,252),
('Who decided it was a good idea to put clothes on dogs? I mean, look at me. Im already wearing a fur coat.','2023-03-04T14:31:13.036484',252,253),
('Sometimes I like to pretend Im not house-trained just to keep my human on their toes.','2023-03-04T14:31:13.036485',253,254),
('Do other dogs get as excited as I do about the sound of the treat bag opening?','2023-03-04T14:31:13.036486',254,255),
('Just saw my reflection in the mirror and I have to say, Im looking pretty fine today.','2023-03-04T14:31:13.036487',255,256),
('Just took a long walk and now Im feeling like a million treats.','2023-03-04T14:31:13.036488',256,257),
('Just caught my tail again... man, Im good at this.','2023-03-04T14:31:13.036489',257,258),
('Does anyone else feel like theyre constantly chasing their own tail?','2023-03-04T14:31:13.036490',258,259),
('Why do humans think its weird when we sniff each others butts? Its just polite!','2023-03-04T14:31:13.036491',259,260),
('Found a new spot to nap today. Its under the bed. Shh... dont tell anyone.','2023-03-04T14:31:13.036492',260,261),
('Just tried to catch a fly with my mouth. Spoiler alert: it didnt end well.','2023-03-04T14:31:13.036493',261,262),
('Why do I have to wear this stupid sweater when I have a perfectly good fur coat?','2023-03-04T14:31:13.036494',262,263),
('Finally caught that squirrel Ive been chasing for months. Turns out hes not that interesting.','2023-03-04T14:31:13.036495',263,264),
('I dont always bark at the mailman, but when I do, its because hes evil.','2023-03-04T14:31:13.036496',264,265),
('Is it just me, or does anyone else get really excited when they hear the word "walk"?','2023-03-04T14:31:13.036497',265,266),
('Im convinced my human is secretly a cat. She loves to sleep all day and gets grumpy if I bother her.','2023-03-04T14:31:13.036498',266,267),
('I just discovered that if I tilt my head just right, I can see behind me. Mind blown.','2023-03-04T14:31:13.036499',267,268),
('Dont let my puppy eyes fool you, I know exactly what Im doing.','2023-03-04T14:31:13.036500',268,269),
('Just spent 10 minutes trying to lick my own nose. I almost had it too!','2023-03-04T14:31:13.036501',269,270),
('I dont always beg for food, but when I do, its because Im starving and the food smells amazing.','2023-03-04T14:31:13.036502',270,271),
('Just heard a car door outside and barked at it for 5 minutes straight. Im pretty sure I showed that car whos boss.','2023-03-04T14:31:13.036503',271,272),
('Why do humans always ask if we want a treat? Obviously the answer is yes, every time.','2023-03-04T14:31:13.036504',272,273),
('Just tried to bury my bone in the couch. Turns out that doesnt work.','2023-03-04T14:31:13.036505',273,274),
('Is it just me or does anyone else think its weird that humans put clothes on us but dont wear them themselves?','2023-03-04T14:31:13.036506',274,275),
('If you need me, Ill be napping on the couch. Its my favorite hobby.','2023-03-04T14:31:13.036507',275,276),
('I dont always chase my tail, but when I do, its because I forgot where it went.','2023-03-04T14:31:13.036508',276,277)








        ;
        """,
        """
        SELECT setval('statuses_id_seq', (SELECT MAX(id) FROM statuses));
        """,

    ]
]
