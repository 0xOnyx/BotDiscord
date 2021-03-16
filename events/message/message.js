const { Collection, MessageEmbed, Message } = require('discord.js');
const prefix = require('../../config.js');
const AntiSpam = require('discord-anti-spam');
// const { Player } = require('erela.js');

// ? test
// * test
// ! test
// TODO test
// ? test

module.exports = async(client, message) => {
    if (message.channel.type === 'dm') return;
    // const Arole = await client.getRole(client.channel);
    const settings = await client.getGuild(message.guild);
    const dbUser = await client.getUser(message.author);
    const chan = client.channels.cache.get(settings.logChannel);
    const args = message.content.slice(settings.prefix.length).split(/ +/);
    let insultes = [];
    // let insultes = ['Abruti', 'Ahuri', 'Analphabète', 'Andouille', 'Anus De Poulpe', 'Arsouille', 'Aspirateur A Muscadet', 'Assisté', 'Asticot', 'Attardé', 'Avorton', 'Babache', 'Bachibouzouk', 'Balai de Chiottes', 'Baltringue', 'Banane', 'Bandit', 'Barjot', 'Batârd', 'Betterave', 'Bigleux', 'Blaireau', 'Boloss', 'Bordel', 'Bordel à Cul', 'Boudin', 'Bouffon', 'Bougre D’âne', 'Bougre D’imbécile', 'Bougre De Congre', 'Bougre De Conne', 'Boule De Pus', 'Boulet', 'Bouricot', 'Bourique', 'Bourrin', 'Boursemolle', 'Boursouflure', 'Bouseux', 'Boutonneux', 'Branleur', 'Branlotin', 'Branque', 'Branquignole', 'Brigand', 'Brêle', 'Brosse à Chiottes', 'Bubon Puant', 'Burne', 'Butor', 'Bécasse', 'Bégueule', 'Bélitre', 'Béotien', 'Bête', 'Cageot', 'Cagole', 'Calice', 'Canaille', 'Canaillou', 'Cancrelat', 'Caprinophile', 'Carburateur à Beaujolais', 'Caribou', 'Casse-pieds', 'Cassos', 'Catin', 'Cave', 'Cervelle D’huitre', 'Chacal', 'Chacal Puant', 'Chafouin', 'Chameau', 'Chancreux', 'Chancre puant', 'Chaoui', 'Charogne', 'Chenapan', 'Chiassard', 'Chiasse De Caca Fondu', 'Chieur', 'Chiure De Pigeon', 'Cinglé', 'Clampin', 'Cloaque', 'Cloche', 'Clodo', 'Cloporte', 'Clown', 'Cochon', 'Cocu', 'Con', 'Conard', 'Conchieur', 'Concombre', 'Connard', 'Connasse', 'Conne', 'Coprolithe', 'Coprophage', 'Cornard', 'Cornegidouille', 'Corniaud', 'Cornichon', 'Couard', 'Couille De Tétard', 'Couille Molle', 'Couillon', 'Crapaud De Pissotière', 'Crapule', 'Crassard', 'Crasspouillard!', 'Crevard', 'Crevure', 'Crotte De Moineau', 'Cryptorchide', 'Crâne D’obus', 'Crétin', 'Crétin Des Alpes', 'Crétin Des Iles', 'Crétin Goîtreux', 'Cuistre', 'Cul De Babouin', 'Cul Terreux', 'Dégueulasse', 'Don Juan De Pissotière', 'Ducon', 'Dugenou', 'Dugland', 'Dypterosodomite', 'Débile', 'Décamerde', 'Décérébré', 'Dégueulis', 'Dégénéré Chromozomique', 'Dégénéré Du Bulbe', 'Dépravé', 'Détritus', 'Ecervelé', 'Ectoplasme', 'Emmerdeur', 'Empaffé', 'Emplâtre', 'Empoté', 'Enculeur De Mouches', 'Enculé', 'Enflure', 'Enfoiré', 'Erreur De La Nature', 'Eunuque', 'Face De Cul', 'Face De Pet', 'Face De Rat', 'Faquin', 'Faraud', 'Faux Jeton', 'Fesse D’huitre', 'Fesse De Moule', 'Fesses Molles', 'Fiente', 'Filou', 'Fini à L’urine', 'Fion', 'Fiote', 'Flaque De Pus', 'Foireux', 'Foldingue', 'Fonctionnaire', 'Fouille Merde', 'Four à Merde', 'Fourbe', 'Foutriquet', 'Frapadingue', 'Frappe', 'Freluquet', 'Fricoteur', 'Frigide', 'Fripouille', 'Frippon', 'Frustré', 'Fumier', 'Fumiste', 'Furoncle', 'Félon', 'Ganache', 'Gangrène', 'Garage A Bite', 'Gibier De Potence', 'Gland', 'Glandeur', 'Glandus', 'Globicéphale', 'Gnome', 'Godiche', 'Gogol', 'Goinfre', 'Gommeux', 'Gougnafier', 'Goujat', 'Goulu', 'Gourdasse', 'Gourgandin/e', 'Grand Cornichon', 'Grand Dépandeur D’andouilles', 'Gras Du Bide', 'Graveleux', 'Gredin', 'Grenouille', 'Gringalet', 'Grognasse', 'Gros Caca Poilu', 'Gros Con', 'Gros Lard', 'Grosse Merde Puante', 'Grosse Truie Violette', 'Grue', 'Gueulard', 'Gueule De Fion', 'Gueule De Raie', 'Gueux', 'Gugus', 'Guignol', 'Has-been', 'Hérétique', 'Histrion', 'Homoncule', 'Hostie D’épais', 'Hurluberlu', 'Hérétique', 'Iconoclaste', 'Idiot', 'Ignare', 'Illettré', 'Imbibé', 'Imbécile', 'Impuissant', 'Infâme Raie De Cul', 'Ironie De La Création', 'Ivrogne', 'Jaune', 'Jean-foutre', 'Jobard', 'Jobastre', 'Judas', 'Kroumir', 'Kéké', 'Laideron', 'Larve', 'Lavedu', 'Lépreux', 'Loboto', 'Loutre Analphabète', 'Lèche-cul', 'Malandrin', 'Malotru', 'Malpropre', 'Manant', 'Manche à Couille', 'Mange Merde', 'Maquereau', 'Maquerelle', 'Maraud', 'Marchand De Tapis', 'Margoulin', 'Merdaillon', 'Merdasse', 'Merde', 'Merde Molle', 'Merdophile', 'Merlan Frit', 'Microcéphale', 'Minable', 'Minus', 'Miteux', 'Moins Que Rien', 'Molasson', 'Mongol', 'Mononeuronal', 'Mont De Brin', 'Morbleu', 'Morfale', 'Morille', 'Morpion', 'Mortecouille', 'Morue', 'Morveux', 'Motherfucker', 'Mou Du Bulbe', 'Mou Du Genou', 'Mou Du Gland', 'Moudlabite', 'Moule à Gauffre', 'Mouton De Panurge', 'Méchant.', 'Mécréant', 'Mérule', 'Nabot', 'Nain De Jardin', 'Nanar', 'Naze', 'Nazillon', 'Necropédophile', 'Neuneu', 'Nez De Boeuf', 'Niais, Niaiseux', 'Nigaud', 'Niguedouille', 'Noob', 'Nounouille', 'Nécrophile', 'Obsédé', 'Oiseau De Mauvaise Augure', 'Olibrius', 'Ordure Purulente', 'Outre à Pisse', 'Outrecuidant', 'Pachyderme', 'Paltoquet', 'Panaris', 'Parasite', 'Parbleu', 'Parvenu', 'Patate', 'Paumé', 'Pauvre Con', 'Paysan', 'Peau De Bite', 'Peau De Vache', 'Pecore', 'Peigne-cul', 'Peine à Jouir', 'Pendard', 'Pervers', 'Pet De Moule', 'Petite Merde', 'Petzouille', 'Phlegmon', 'Pigeon', 'Pignolo', 'Pignouf', 'Pimbêche', 'Pinailleur', 'Pine D’ours', 'Pine D’huitre', 'Pintade', 'Pipistrelle Puante', 'Piqueniquedouille', 'Pisse Froid', 'Pisse-vinaigre', 'Pisseuse', 'Pissure', 'Piètre', 'Planqué', 'Playboy De Superette', 'Pleutre', 'Plouc', 'Poire', 'Poireau', 'Poivrot', 'Polisson', 'Poltron', 'Pompe A Merde', 'Porc', 'Pot de chambre', 'Pouacreux', 'Pouffe', 'Pouffiasse', 'Poufieux', 'Pouilleux', 'Pourceau', 'Pourriture', 'Pousse Mégot', 'Punaise', 'Putassière', 'Pute Au Rabais', 'Pute Borgne', 'Putréfaction', 'Pygocéphale', 'Pécore', 'Pédale', 'Péquenot', 'Pétasse', 'Pétassoïde Conassiforme', 'Pétochard', 'Quadrizomique', 'Queutard', 'Quiche', 'Raclure De Bidet', 'Raclure De Chiotte', 'Radasse', 'Radin', 'Ramassis De Chiure De Moineau', 'Rambo De Pacotille', 'Rastaquouère', 'Renégat', 'Roquet', 'Roublard', 'Rouge', 'Roulure', 'Résidu De Fausse Couche', 'Résidus De Partouze', 'Sabraque', 'Sac à Brin', 'Sac à Foutre', 'Sac à Gnole', 'Sac à Merde', 'Sac à Viande', 'Sac à Vin', 'Sacrebleu', 'Sacrement', 'Sacripan', 'Sagouin', 'Salaud', 'Saleté', 'Saligaud', 'Salopard', 'Salope', 'Saloperie', 'Salopiaud', 'Saltinbanque', 'Saperlipopette', 'Saperlotte', 'Sauvage', 'Scaphandrier D’eau De Vaiselle', 'Scatophile', 'Scelerat', 'Schnock', 'Schpountz', 'Serpillière à Foutre', 'Sinistrose Ambulante', 'Sinoque', 'Sodomite', 'Sombre Conne', 'Sombre Crétin', 'Sot', 'Souillon', 'Sous Merde', 'Spermatozoide Avarié', 'Spermiducte', 'Suintance', 'Sybarite', 'Syphonné', 'Tabarnak', 'Tabernacle', 'Tâcheron', 'Tafiole', 'Tanche', 'Tartignole', 'Taré', 'Tas De Saindoux', 'Tasse à Foutre', 'Thon', 'Tire Couilles', 'Tocard', 'Tonnerre De Brest', 'Toqué', 'Trainé', 'Traîne Savate', 'Tricard', 'Triple Buse', 'Tromblon', 'Tronche De Cake', 'Trou De Balle', 'Trou Du Cul', 'Troubignole', 'Truand', 'Trumeaux', 'Tuberculeux', 'Tudieu', 'Tétârd', 'Tête D’ampoule', 'Tête De Bite', 'Tête De Chibre', 'Tête De Con', 'Tête De Noeud', 'Tête à Claques', 'Usurpateur', 'Va Nu Pieds', 'Va Te Faire', 'Vandale', 'Vaurien', 'Vautour', 'Ventrebleu', 'Vermine', 'Veule', 'Vicelard', 'Vieille Baderne', 'Vieille Poule', 'Vieille Taupe', 'Vieux Chnoque', 'Vieux Con', 'Vieux Fossile', 'Vieux Tableau', 'Vieux Tromblon', 'Vilain', 'Vilain Comme Une Couvée De Singe', 'Vioque', 'Vipère Lubrique', 'Voleur', 'Vorace', 'Voyou', 'Vérole', 'Wisigoth', 'Yéti Baveux', 'Zigomar', 'Zigoto', 'Zonard', 'Zouave', 'Zoulou', 'Zozo', 'Zéro'];
    let domains = [".aaa", ".aarp", ".abarth", ".abb", ".abbott", ".abbvie", ".abc", ".able", ".abogado", ".abudhabi", ".ac", ".academy", ".accenture", ".accountant", ".accountants", ".aco", ".active", ".actor", ".ad", ".adac", ".ads", ".adult", ".ae", ".aeg", ".aero", ".aetna", ".af", ".afamilycompany", ".afl", ".africa", ".ag", ".agakhan", ".agency", ".ai", ".aig", ".aigo", ".airbus", ".airforce", ".airtel", ".akdn", ".al", ".alfaromeo", ".alibaba", ".alipay", ".allfinanz", ".allstate", ".ally", ".alsace", ".alstom", ".am", ".amazon", ".americanexpress", ".americanfamily", ".amex", ".amfam", ".amica", ".amsterdam", ".an", ".analytics", ".android", ".anquan", ".anz", ".ao", ".aol", ".apartments", ".app", ".apple", ".aq", ".aquarelle", ".ar", ".arab", ".aramco", ".archi", ".army", ".arpa", ".art", ".arte", ".as", ".asda", ".asia", ".associates", ".at", ".athleta", ".attorney", ".au", ".auction", ".audi", ".audible", ".audio", ".auspost", ".author", ".auto", ".autos", ".avianca", ".aw", ".aws", ".ax", ".axa", ".az", ".azure", ".ba", ".baby", ".baidu", ".banamex", ".bananarepublic", ".band", ".bank", ".bar", ".barcelona", ".barclaycard", ".barclays", ".barefoot", ".bargains", ".baseball", ".basketball", ".bauhaus", ".bayern", ".bb", ".bbc", ".bbt", ".bbva", ".bcg", ".bcn", ".bd", ".be", ".beats", ".beauty", ".beer", ".bentley", ".berlin", ".best", ".bestbuy", ".bet", ".bf", ".bg", ".bh", ".bharti", ".bi", ".bible", ".bid", ".bike", ".bing", ".bingo", ".bio", ".biz", ".bj", ".bl", ".black", ".blackfriday", ".blanco", ".blockbuster", ".blog", ".bloomberg", ".blue", ".bm", ".bms", ".bmw", ".bn", ".bnl", ".bnpparibas", ".bo", ".boats", ".boehringer", ".bofa", ".bom", ".bond", ".boo", ".book", ".booking", ".boots", ".bosch", ".bostik", ".boston", ".bot", ".boutique", ".box", ".bq", ".br", ".bradesco", ".bridgestone", ".broadway", ".broker", ".brother", ".brussels", ".bs", ".bt", ".budapest", ".bugatti", ".build", ".builders", ".business", ".buy", ".buzz", ".bv", ".bw", ".by", ".bz", ".bzh", ".ca", ".cab", ".cafe", ".cal", ".call", ".calvinklein", ".cam", ".camera", ".camp", ".cancerresearch", ".canon", ".capetown", ".capital", ".capitalone", ".car", ".caravan", ".cards", ".care", ".career", ".careers", ".cars", ".cartier", ".casa", ".case", ".caseih", ".cash", ".casino", ".cat", ".catering", ".catholic", ".cba", ".cbn", ".cbre", ".cbs", ".cc", ".cd", ".ceb", ".center", ".ceo", ".cern", ".cf", ".cfa", ".cfd", ".cg", ".ch", ".chanel", ".channel", ".charity", ".chase", ".chat", ".cheap", ".chintai", ".chloe", ".christmas", ".chrome", ".chrysler", ".church", ".ci", ".cipriani", ".circle", ".cisco", ".citadel", ".citi", ".citic", ".city", ".cityeats", ".ck", ".cl", ".claims", ".cleaning", ".click", ".clinic", ".clinique", ".clothing", ".cloud", ".club", ".clubmed", ".cm", ".cn", ".co", ".coach", ".codes", ".coffee", ".college", ".cologne", ".com", ".comcast", ".commbank", ".community", ".company", ".compare", ".computer", ".comsec", ".condos", ".construction", ".consulting", ".contact", ".contractors", ".cooking", ".cookingchannel", ".cool", ".coop", ".corsica", ".country", ".coupon", ".coupons", ".courses", ".cpa", ".cr", ".credit", ".creditcard", ".creditunion", ".cricket", ".crown", ".crs", ".cruise", ".cruises", ".csc", ".cu", ".cuisinella", ".cv", ".cw", ".cx", ".cy", ".cymru", ".cyou", ".cz", ".dabur", ".dad", ".dance", ".data", ".date", ".dating", ".datsun", ".day", ".dclk", ".dds", ".de", ".deal", ".dealer", ".deals", ".degree", ".delivery", ".dell", ".deloitte", ".delta", ".democrat", ".dental", ".dentist", ".desi", ".design", ".dev", ".dhl", ".diamonds", ".diet", ".digital", ".direct", ".directory", ".discount", ".discover", ".dish", ".diy", ".dj", ".dk", ".dm", ".dnp", ".do", ".docs", ".doctor", ".dodge", ".dog", ".doha", ".domains", ".doosan", ".dot", ".download", ".drive", ".dtv", ".dubai", ".duck", ".dunlop", ".duns", ".dupont", ".durban", ".dvag", ".dvr", ".dz", ".earth", ".eat", ".ec", ".eco", ".edeka", ".edu", ".education", ".ee", ".eg", ".eh", ".email", ".emerck", ".energy", ".engineer", ".engineering", ".enterprises", ".epost", ".epson", ".equipment", ".er", ".ericsson", ".erni", ".es", ".esq", ".estate", ".esurance", ".et", ".etisalat", ".eu", ".eurovision", ".eus", ".events", ".everbank", ".exchange", ".expert", ".exposed", ".express", ".extraspace", ".fage", ".fail", ".fairwinds", ".faith", ".family", ".fan", ".fans", ".farm", ".farmers", ".fashion", ".fast", ".fedex", ".feedback", ".ferrari", ".ferrero", ".fi", ".fiat", ".fidelity", ".fido", ".film", ".final", ".finance", ".financial", ".fire", ".firestone", ".firmdale", ".fish", ".fishing", ".fit", ".fitness", ".fj", ".fk", ".flickr", ".flights", ".flir", ".florist", ".flowers", ".flsmidth", ".fly", ".fm", ".fo", ".foo", ".food", ".foodnetwork", ".football", ".ford", ".forex", ".forsale", ".forum", ".foundation", ".fox", ".fr", ".free", ".fresenius", ".frl", ".frogans", ".frontdoor", ".frontier", ".ftr", ".fujitsu", ".fujixerox", ".fun", ".fund", ".furniture", ".futbol", ".fyi", ".ga", ".gal", ".gallery", ".gallo", ".gallup", ".game", ".games", ".gap", ".garden", ".gay", ".gb", ".gbiz", ".gd", ".gdn", ".ge", ".gea", ".gent", ".genting", ".george", ".gf", ".gg", ".ggee", ".gh", ".gi", ".gift", ".gifts", ".gives", ".giving", ".gl", ".glade", ".glass", ".gle", ".global", ".globo", ".gm", ".gmail", ".gmbh", ".gmo", ".gmx", ".gn", ".godaddy", ".gold", ".goldpoint", ".golf", ".goo", ".goodhands", ".goodyear", ".goog", ".google", ".gop", ".got", ".gov", ".gp", ".gq", ".gr", ".grainger", ".graphics", ".gratis", ".green", ".gripe", ".grocery", ".group", ".gs", ".gt", ".gu", ".guardian", ".gucci", ".guge", ".guide", ".guitars", ".guru", ".gw", ".gy", ".hair", ".hamburg", ".hangout", ".haus", ".hbo", ".hdfc", ".hdfcbank", ".health", ".healthcare", ".help", ".helsinki", ".here", ".hermes", ".hgtv", ".hiphop", ".hisamitsu", ".hitachi", ".hiv", ".hk", ".hkt", ".hm", ".hn", ".hockey", ".holdings", ".holiday", ".homedepot", ".homegoods", ".homes", ".homesense", ".honda", ".honeywell", ".horse", ".hospital", ".host", ".hosting", ".hot", ".hoteles", ".hotels", ".hotmail", ".house", ".how", ".hr", ".hsbc", ".ht", ".htc", ".hu", ".hughes", ".hyatt", ".hyundai", ".ibm", ".icbc", ".ice", ".icu", ".id", ".ie", ".ieee", ".ifm", ".iinet", ".ikano", ".il", ".im", ".imamat", ".imdb", ".immo", ".immobilien", ".in", ".inc", ".industries", ".infiniti", ".info", ".ing", ".ink", ".institute", ".insurance", ".insure", ".int", ".intel", ".international", ".intuit", ".investments", ".io", ".ipiranga", ".iq", ".ir", ".irish", ".is", ".iselect", ".ismaili", ".ist", ".istanbul", ".it", ".itau", ".itv", ".iveco", ".iwc", ".jaguar", ".java", ".jcb", ".jcp", ".je", ".jeep", ".jetzt", ".jewelry", ".jio", ".jlc", ".jll", ".jm", ".jmp", ".jnj", ".jo", ".jobs", ".joburg", ".jot", ".joy", ".jp", ".jpmorgan", ".jprs", ".juegos", ".juniper", ".kaufen", ".kddi", ".ke", ".kerryhotels", ".kerrylogistics", ".kerryproperties", ".kfh", ".kg", ".kh", ".ki", ".kia", ".kim", ".kinder", ".kindle", ".kitchen", ".kiwi", ".km", ".kn", ".koeln", ".komatsu", ".kosher", ".kp", ".kpmg", ".kpn", ".kr", ".krd", ".kred", ".kuokgroup", ".kw", ".ky", ".kyoto", ".kz", ".la", ".lacaixa", ".ladbrokes", ".lamborghini", ".lamer", ".lancaster", ".lancia", ".lancome", ".land", ".landrover", ".lanxess", ".lasalle", ".lat", ".latino", ".latrobe", ".law", ".lawyer", ".lb", ".lc", ".lds", ".lease", ".leclerc", ".lefrak", ".legal", ".lego", ".lexus", ".lgbt", ".li", ".liaison", ".lidl", ".life", ".lifeinsurance", ".lifestyle", ".lighting", ".like", ".lilly", ".limited", ".limo", ".lincoln", ".linde", ".link", ".lipsy", ".live", ".living", ".lixil", ".lk", ".llc", ".llp", ".loan", ".loans", ".locker", ".locus", ".loft", ".lol", ".london", ".lotte", ".lotto", ".love", ".lpl", ".lplfinancial", ".lr", ".ls", ".lt", ".ltd", ".ltda", ".lu", ".lundbeck", ".lupin", ".luxe", ".luxury", ".lv", ".ly", ".ma", ".macys", ".madrid", ".maif", ".maison", ".makeup", ".man", ".management", ".mango", ".map", ".market", ".marketing", ".markets", ".marriott", ".marshalls", ".maserati", ".mattel", ".mba", ".mc", ".mcd", ".mcdonalds", ".mckinsey", ".md", ".me", ".med", ".media", ".meet", ".melbourne", ".meme", ".memorial", ".men", ".menu", ".meo", ".merckmsd", ".metlife", ".mf", ".mg", ".mh", ".miami", ".microsoft", ".mil", ".mini", ".mint", ".mit", ".mitsubishi", ".mk", ".ml", ".mlb", ".mls", ".mm", ".mma", ".mn", ".mo", ".mobi", ".mobile", ".mobily", ".moda", ".moe", ".moi", ".mom", ".monash", ".money", ".monster", ".montblanc", ".mopar", ".mormon", ".mortgage", ".moscow", ".moto", ".motorcycles", ".mov", ".movie", ".movistar", ".mp", ".mq", ".mr", ".ms", ".msd", ".mt", ".mtn", ".mtpc", ".mtr", ".mu", ".museum", ".mutual", ".mutuelle", ".mv", ".mw", ".mx", ".my", ".mz", ".na", ".nab", ".nadex", ".nagoya", ".name", ".nationwide", ".natura", ".navy", ".nba", ".nc", ".ne", ".nec", ".net", ".netbank", ".netflix", ".network", ".neustar", ".new", ".newholland", ".news", ".next", ".nextdirect", ".nexus", ".nf", ".nfl", ".ng", ".ngo", ".nhk", ".ni", ".nico", ".nike", ".nikon", ".ninja", ".nissan", ".nissay", ".nl", ".no", ".nokia", ".northwesternmutual", ".norton", ".now", ".nowruz", ".nowtv", ".np", ".nr", ".nra", ".nrw", ".ntt", ".nu", ".nyc", ".nz", ".obi", ".observer", ".off", ".office", ".okinawa", ".olayan", ".olayangroup", ".oldnavy", ".ollo", ".om", ".omega", ".one", ".ong", ".onl", ".online", ".onyourside", ".ooo", ".open", ".oracle", ".orange", ".org", ".organic", ".orientexpress", ".origins", ".osaka", ".otsuka", ".ott", ".ovh", ".pa", ".page", ".pamperedchef", ".panasonic", ".panerai", ".paris", ".pars", ".partners", ".parts", ".party", ".passagens", ".pay", ".pccw", ".pe", ".pet", ".pf", ".pfizer", ".pg", ".ph", ".pharmacy", ".phd", ".philips", ".phone", ".photo", ".photography", ".photos", ".physio", ".piaget", ".pics", ".pictet", ".pictures", ".pid", ".pin", ".ping", ".pink", ".pioneer", ".pizza", ".pk", ".pl", ".place", ".play", ".playstation", ".plumbing", ".plus", ".pm", ".pn", ".pnc", ".pohl", ".poker", ".politie", ".porn", ".post", ".pr", ".pramerica", ".praxi", ".press", ".prime", ".pro", ".prod", ".productions", ".prof", ".progressive", ".promo", ".properties", ".property", ".protection", ".pru", ".prudential", ".ps", ".pt", ".pub", ".pw", ".pwc", ".py", ".qa", ".qpon", ".quebec", ".quest", ".qvc", ".racing", ".radio", ".raid", ".re", ".read", ".realestate", ".realtor", ".realty", ".recipes", ".red", ".redstone", ".redumbrella", ".rehab", ".reise", ".reisen", ".reit", ".reliance", ".ren", ".rent", ".rentals", ".repair", ".report", ".republican", ".rest", ".restaurant", ".review", ".reviews", ".rexroth", ".rich", ".richardli", ".ricoh", ".rightathome", ".ril", ".rio", ".rip", ".rmit", ".ro", ".rocher", ".rocks", ".rodeo", ".rogers", ".room", ".rs", ".rsvp", ".ru", ".rugby", ".ruhr", ".run", ".rw", ".rwe", ".ryukyu", ".sa", ".saarland", ".safe", ".safety", ".sakura", ".sale", ".salon", ".samsclub", ".samsung", ".sandvik", ".sandvikcoromant", ".sanofi", ".sap", ".sapo", ".sarl", ".sas", ".save", ".saxo", ".sb", ".sbi", ".sbs", ".sc", ".sca", ".scb", ".schaeffler", ".schmidt", ".scholarships", ".school", ".schule", ".schwarz", ".science", ".scjohnson", ".scor", ".scot", ".sd", ".se", ".search", ".seat", ".secure", ".security", ".seek", ".select", ".sener", ".services", ".ses", ".seven", ".sew", ".sex", ".sexy", ".sfr", ".sg", ".sh", ".shangrila", ".sharp", ".shaw", ".shell", ".shia", ".shiksha", ".shoes", ".shop", ".shopping", ".shouji", ".show", ".showtime", ".shriram", ".si", ".silk", ".sina", ".singles", ".site", ".sj", ".sk", ".ski", ".skin", ".sky", ".skype", ".sl", ".sling", ".sm", ".smart", ".smile", ".sn", ".sncf", ".so", ".soccer", ".social", ".softbank", ".software", ".sohu", ".solar", ".solutions", ".song", ".sony", ".soy", ".spa", ".space", ".spiegel", ".sport", ".spot", ".spreadbetting", ".sr", ".srl", ".srt", ".ss", ".st", ".stada", ".staples", ".star", ".starhub", ".statebank", ".statefarm", ".statoil", ".stc", ".stcgroup", ".stockholm", ".storage", ".store", ".stream", ".studio", ".study", ".style", ".su", ".sucks", ".supplies", ".supply", ".support", ".surf", ".surgery", ".suzuki", ".sv", ".swatch", ".swiftcover", ".swiss", ".sx", ".sy", ".sydney", ".symantec", ".systems", ".sz", ".tab", ".taipei", ".talk", ".taobao", ".target", ".tatamotors", ".tatar", ".tattoo", ".tax", ".taxi", ".tc", ".tci", ".td", ".tdk", ".team", ".tech", ".technology", ".tel", ".telecity", ".telefonica", ".temasek", ".tennis", ".teva", ".tf", ".tg", ".th", ".thd", ".theater", ".theatre", ".tiaa", ".tickets", ".tienda", ".tiffany", ".tips", ".tires", ".tirol", ".tj", ".tjmaxx", ".tjx", ".tk", ".tkmaxx", ".tl", ".tm", ".tmall", ".tn", ".to", ".today", ".tokyo", ".tools", ".top", ".toray", ".toshiba", ".total", ".tours", ".town", ".toyota", ".toys", ".tp", ".tr", ".trade", ".trading", ".training", ".travel", ".travelchannel", ".travelers", ".travelersinsurance", ".trust", ".trv", ".tt", ".tube", ".tui", ".tunes", ".tushu", ".tv", ".tvs", ".tw", ".tz", ".ua", ".ubank", ".ubs", ".uconnect", ".ug", ".uk", ".um", ".unicom", ".university", ".uno", ".uol", ".ups", ".us", ".uy", ".uz", ".va", ".vacations", ".vana", ".vanguard", ".vc", ".ve", ".vegas", ".ventures", ".verisign", ".vermögensberater", ".vermögensberatung", ".versicherung", ".vet", ".vg", ".vi", ".viajes", ".video", ".vig", ".viking", ".villas", ".vin", ".vip", ".virgin", ".visa", ".vision", ".vista", ".vistaprint", ".viva", ".vivo", ".vlaanderen", ".vn", ".vodka", ".volkswagen", ".volvo", ".vote", ".voting", ".voto", ".voyage", ".vu", ".vuelos", ".wales", ".walmart", ".walter", ".wang", ".wanggou", ".warman", ".watch", ".watches", ".weather", ".weatherchannel", ".webcam", ".weber", ".website", ".wed", ".wedding", ".weibo", ".weir", ".wf", ".whoswho", ".wien", ".wiki", ".williamhill", ".win", ".windows", ".wine", ".winners", ".wme", ".wolterskluwer", ".woodside", ".work", ".works", ".world", ".wow", ".ws", ".wtc", ".wtf", ".xbox", ".xerox", ".xfinity", ".xihuan", ".xin", ".xperia", ".xxx", ".xyz", ".yachts", ".yahoo", ".yamaxun", ".yandex", ".ye", ".yodobashi", ".yoga", ".yokohama", ".you", ".youtube", ".yt", ".yun", ".za", ".zappos", ".zara", ".zero", ".zip", ".zippo", ".zm", ".zone", ".zuerich", ".zw"];
    let google = ["google.com", "www.google.com", ".google", "goo.gl"];
    let discord = ["discord.com", "discord.gg", "discord.media", "discordapp.com", "discordapp.net", "discord.co", "watchanimeattheoffice.com", "bigbeans.solutions", "dis.gd"];
    let youtube = ["www.youtube.com", "youtube.com", "youtu.be", "youtube-nocookie.com", "www.youtube-nocookie.com"];
    let link = ["http://", "https://", "https://www.", "www."];
    const usersMap = new Map();
    const LIMIT = 5;
    const TIME = 10000;
    const DIFF = 6000;

    const embedPing = new MessageEmbed()
        .setColor('#8000ff')
        .setTitle(client.user.tag)
        .setDescription(`Mon prefix est **${settings.prefix}**\nFaite **${settings.prefix}help** pour voir toute les commandes !`)
        .setTimestamp();

    const embedLien = new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('LIEN DETECTER')
        .setDescription(`Lien: ${message.content}`)
        .setFooter(`Author: ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();

    const logInsulte = new MessageEmbed()
        .setColor('#ffffff')
        .setTitle('INSULTE DETECTER')
        .setDescription(`Insulte: ${message.content}`)
        .setFooter(`Author: ${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp();







        /*
            LEVEL SYSTEM
        */
    if(!message.author.bot) {
        try {
            const lvl = dbUser.level;
            const xp = dbUser.experience;
            const needXp = 5 * (lvl / 2) + 50 * lvl + 300;
            const expAdd = Math.floor(Math.random() * 5) + 1;

            client.addExp(client, message.member, expAdd);

            if(xp >= needXp) {
                const updatedLevel = dbUser.level + 1
                client.updateUser(message.member, { level: updatedLevel });
                message.channel.send(`${message.author} level up to level ${updatedLevel}`)
            }
        } catch (err) {

        }
    }





        /* 
        ANTI-INSULTE
        ANTI-LIEN
        ANTI-SPAM
        PING
        */

    if (settings.antiInsulte === 'on') {
        let foundInText = false;

        for (var i in insultes) {
            if (message.content.toLocaleLowerCase() === insultes[i].toLowerCase()) foundInText = true;
        }
        if (foundInText === true) {
            message.delete();
            message.reply(`Pas d'insulte ici !`)
            if (!settings.logChannel || settings.logChannel === 'none') return;
            chan.send(logInsulte);
        }
    }


    if (settings.antiLien === 'on' && !message.author.bot && !message.member.hasPermission('ADMINISTRATOR') && !message.member.hasPermission('EMBED_LINKS')) {
        let foundInText2 = false;
        for (var i in domains) {
            if (message.content.toLocaleLowerCase().includes(domains[i].toLowerCase())) foundInText2 = true;
        }
        for (var i in google) {
            if (message.content.toLocaleLowerCase().includes(google[i].toLowerCase())) foundInText2 = true;
        }
        for (var i in discord) {
            if (message.content.toLocaleLowerCase().includes(discord[i].toLowerCase())) foundInText2 = true;
        }
        for (var i in youtube) {
            if (message.content.toLocaleLowerCase().includes(youtube[i].toLowerCase())) foundInText2 = true;
        }
        for (var i in link) {
            if (message.content.toLocaleLowerCase().includes(link[i].toLowerCase())) foundInText2 = true;
        }

        if (foundInText2 === true) {
            message.delete();
            message.channel.send("Pas de lien ici, " + message.author.username + " seul ceux qui ont la permission ADMINISTRATEUR ou la permission INTERGRER DES LIENS peuvent poster des liens")
            if (!settings.logChannel || settings.logChannel === 'none') return;
            chan.send(embedLien);
        }
    }

    if (message.content.includes(`<@${client.user.id}>`) || message.content.includes(`<@!${client.user.id}>`) || message.content.includes(client.user.tag)) {
        message.channel.send(embedPing);
    }


    if(settings.antiSpam === 'on') {
        if(usersMap.has(message.author.id)) {
            const userData = usersMap.get(message.author.id);
            const { lastMessage, timer } = userData;
           const difference = message.createdTimestamp - lastMessage.createdTimestamp;
            let msgCount = userData.msgCount;
            if(difference > DIFF) {
                console.log('Fin')
               clearTimeout(timer);
               userData.msgCount = 1;
               userData.lastMessage = message;
               userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
               }, TIME);
               usersMap.set(message.author.id, userData);
            } else {
           ++msgCount;
           if(parseInt(msgCount) === LIMIT) {
               const role = message.guild.roles.cache.find(r => r.name === "Muet")
            //    if (!role) {
            //     role = await message.guild.roles.create({
            //       data: {
            //         name: 'muted',
            //         color: '#000000',
            //         position: 1,
            //         permissions: []
            //       }
            //     });
            // }
               //const role = message.guild.roles.cache.get("775036204033900565");
                message.member.roles.add(role);
                message.channel.send(`${message.author}, vous avez été mute pour spam !`)
                message.delete(message.author.id);
               setTimeout(() => {
                    message.member.roles.remove(role);
                   message.channel.send(`${message.author}, vous avez été unmute, arreter de spammer.`)
                }, settings.muteTime);
           } else {
            userData.msgCount = msgCount;
            usersMap.set(message.author.id, userData);
                }
        }
        } else {
        let fn = setTimeout(() => {
               usersMap.delete(message.author.id);
            }, 5000);
            usersMap.set(message.author.id, {
                msgCount: 1,
                lastMessage: message,
               timer: fn
            });
        } 
    }






    /*
        DB
        COMMANDES
        PERMISSIONS
        COOLDOWNS
    */

    if (message.author.bot) return;

    if (!dbUser) await client.createUser({
        guildID: message.member.guild.id,
        guildName: message.member.guild.name,
        userID: message.member.id,
        username: message.member.user.tag,
    });



    if (!message.content.startsWith(settings.prefix)) return;

    const commandName = args.shift().toLowerCase();
    const user = message.mentions.users.first();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if (!command) return;
    if (command.help.permissions && !message.member.hasPermission('BAN_MEMBERS' || 'ADMINISTRATOR')) return message.reply("Tu n'as pas les permissions pour taper cette commande.");


    if (command.help.args && !args.length) {
        let noArgsReply = `Il nous faut des arguments pour cette commande, ${message.author}!`;

        if (command.help.usage) noArgsReply += `\nVoici comment utiliser la commande: \`${settings.prefix}${command.help.name} ${command.help.usage}\``;

        return message.channel.send(noArgsReply);
    };

    if (command.help.isUserAdmin && !user) return message.reply('Il faut mentionner un utilisateur.');

    if (command.help.isUserAdmin && message.guild.member(user).hasPermission('BAN_MEMBERS' || 'ADMINISTRATOR')) return message.reply("Tu ne peux pas utiliser cette commande sur cet utilisateur.");





    if (!client.cooldowns.has(command.help.name)) {
        client.cooldowns.set(command.help.name, new Collection());
    };

    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(command.help.name);
    const cdAmount = (command.help.cooldown || 5) * 1000;

    if (tStamps.has(message.author.id)) {
        const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

        if (timeNow < cdExpirationTime) {
            timeLeft = (cdExpirationTime - timeNow) / 1000;
            return message.reply(`Merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant de ré-utiliser la commande \`${command.help.name}\`.`);
        }
    }
    tStamps.set(message.author.id, timeNow);
    setTimeout(() => tStamps.delete(message.author.id), cdAmount);

    command.run(client, message, args, settings, dbUser);
}