// recipes.js

const recipes = {
	'Ferrero kolač': `Usitniti 30 gr keksa bez dodatog šećera, pa ga izmešati sa 30 ml bademovog mleka bez dodatog šećera i utisnuti na dno posude. 
      Preko dodati 180-200 gr protein pudinga od čokolade i 15 gr iseckanih lešnika.`,

	'Projice sa spanaćem': `U posudu dodati 2 jajeta, 100 gr kukuruznog brašna (ili palente), 180 gr Skyr islandskog jogurta (ili drugog niskomasnog 
      grčkog jogurta- treba da ima do 75 kcal/100 gr na deklaraciji), 1 ravnu kašičicu soli, 1 ravnu kašičicu praška za pecivo i 3 gr ulja. Izmešati 
      kašikom, pa dodati 50 gr obarenog, pa sitno iseckanog spanaća. Ponovo izmešati kašikom, pa preneti u 6 papirnih korpica za mafine. 
      Peći 20-25 minuta na 200 stepeni. Pola pripremljenog obroka konzumirati za doručak, a drugu polovinu ostaviti za večeru.`,

	'Salata sa jajima': `U posudu dodati 2 šake matilovca (ili baby spanaća/zelene salate/rukole), 2 iseckana kuvana jajeta i 100 gr gotovih leblebija iz konzerve. 
      Preko dodati 100 gr Skyr grčkog jogurta (ili bilo kojeg drugog niskomasnog grčkog jogurta, treba da ima do 75 kcal/100 gr na deklaraciji), začine po 
      ukusu, pa sve izmešati i posuti sa 10 gr susama (ili semenki bundeve/kikirikija).`,

	'Hladna tuna pasta': `Obariti 60 gr integralne testenine u vodi. Ocediti, pa dodati 50 gr Skyr-a (ili Olympus 2% mm grčkog jogurta, ili drugog niskomasnog
      grčkog jogurta- treba da ima do 75 kcal/100 gr na deklaraciji), 50 gr oceđene tune iz sopstvenog soka, 50 gr iseckanih zelenih krastavčića, 50 gr 
      iseckanog cherry paradajza, 50 gr kukuruza. Začiniti po ukusu, pa dodati 10 gr susama (ili semenki bundeve).`,

	'Shake sa jagodom': `Izblendati 250 gr jagoda, 100 ml bademovog mleka bez dodatog šećera i 30 gr whey proteina (koristiti ukus po želji).`,

	'Uštipci sa tikvicama': `Pomešati 2 jajeta sa 60 gr mlevenih ovsenih pahuljica (može i već gotovo ovseno brašno). Dodati 260 gr izrendane tikvice. Začiniti
      po ukusu. Peći na tiganju premazanom sa 5 gr ulja. Pola pripremljenog obroka konzumirati za doručak, a drugu polovinu ostaviti za večeru.`,

	'Kapri kolač': `Usitniti 30 gr keksa bez dodatog šećera, pa ga izmešati sa 30 ml bademovog mleka bez dodatog šećera i utisnuti na dno posude. 
      Preko dodati 100 gr skyr-a (ili olympus 2% mm niskomasnog grčkog jogurta- treba da ima do 75 kcal/100 gr) izmešanog sa 10 gr whey proteina od 
      vanile. Preko dodati 80 gr izblendanih jagoda (ako bude potrebe izblendati ih sa eritritolom), a zatim i 25 gr otopljene crne čokolade sa 75% ili više 
      kakaoa. Ostaviti u frižideru ili zamrzivaču dok se ne stegne čokoladna glazura.`,

	'Fit pizza 1': `Umutiti 1 jaje kuhinjskom žicom, pa dodati 50 gr usitnjenih ovsenih pahuljica, 30 gr skyr-a (ili olympus 2% mm grčkog jogurta- treba da ima do
      75 kcal/100 gr na deklaraciji), 1⁄2 kašičice praška za pecivo. Izmešati kašikom bez blendanja, pa preneti na pek papir i formirati smesu ravnomerno u 
      krug. Peći 8 minuta na 200 stepeni, pa dodati 40-50 gr pasiranog paradajza, 20 gr iseckane goveđe pršute (ili 40 gr iseckanih pilećih/ćurećih prsa iz 
      omota/oceđene tune), 20 gr propranog kukuruza iz konzerve (ili obarenog), 25 gr rendane mozzarele i origano. Peći još par minuta u rerni, dok se ne otopi 
      sir.`,

	'Posne keks kuglice': `Izgnječiti 75 gr banane do forme kaše, pa dodati keks bez dodatog šećera (usitniti keks bez dodatog šećera do forme mlevenog keksa, 
      pa izmeriti 75 gr). Dodati 15 gr veganskog proteina (ako ne postite, možete koristiti i whey protein). Izmešati smesu, pa oblikovati kuglice.`,

	'Voćna salata': `Pomešati u činiji 100 gr iseckane banane, 300 gr jagoda (ili dinje/lubenice) i 40 gr kikirikija.`,

	Sataraš: `Izdinstati na vodi 140 gr pilećeg belog mesa. Kada dobije beličastu boju dodati 200 gr iseckane crvene paprike 200 gr iseckanog paradajza, pa zajedno dinstati. Kada omekša, dodati umućeno celo jaje i 1 belance. Začiniti. Služiti uz 40 gr integralnog hleba.`,

	'Tuna salata': `Iseckati 200 gr cherry paradajza, 200 gr crvene paprike i 50 gr crvenog luka. Dodati u činiju, pa dodati 250 gr propranog crvenog pasulja iz 
      konzerve, 300 gr propranog kukuruza iz konzerve (ili obarenog), 180 gr oceđene tune iz sopstvenog soka. Dodati 5 gr maslinovog ulja, sok od pola limuna 
      i začine, pa sve izmešati.`,

	'Twix shake': `Izblendati 200 ml bademovog mleka bez dodatog šećera, 10 gr whey proteina od čokolade (ili drugi ukus po želji) i 40 gr mlevenog keksa bez 
      dodatog šećera (koristiti keks bez dodatog šećera pa ga usitniti do forme mlevenog keksa).`,

	'Sendvič sa goveđom pršutom': `Na 60 gr integralnog hleba dodati 40-50 gr pasiranog paradajza, 30 gr iseckane goveđe pršute, 2 iseckana cherry paradajza 
      (oko 30 gr) i 20 gr mozzarele. Kratko ubaciti u rernu ili mikrotalasnu pećnicu dok se ne otopi sir.`,

	'Slana tortilla': `Umutiti 1 jaje i 1 belance, začiniti, pa izliti na tiganj premazan sa 3 gr ulja. Kada omlet bude gotov, utisnuti 1 integralnu tortilju od 60-65 gr i 
      držati par sekundi. Okrenuti omlet i tortilju zajedno, skloniti sa tingle, pa dodati 50 gr iseckanog paradajza i 35 gr iseckane goveđe pršute (ili 50-60 gr 
      pilećih/ćurećih prsa iz omota).`,

	'Kremasta pasta sa pistaćima': `U dublji tiganj dodati 3 gr ulja i 20 gr iseckane goveđe pršute. Kratko propržiti, pa dodati 80 gr light pavlake za kuvanje (sa 
      10% mlečne masti). U međuvremenu obariti 60 gr integralne testenine, ocediti je i dodati u tiganj. Kratko kuvati i dodati začine po ukusu. Skloniti sa ringle 
      i dodati 10 gr mlevenih pistaća (ili badema/kikirikija).`,
	'Cheesecake kolač sa borovnicom':
		'Usitniti 30 gr keksa bez dodatog šećera, pa ga izmešati sa 30 ml bademovog mleka bez dodatog šećera. Preko dodati fil od 100 gr Skyr-a (ili 2% mm Olympus niskomasnog grčakog jogurta- treba da ima do 75 kcal/100 gr na deklaraciji) izmešanog sa 10 gr whey proteina  od vanile. Za sledeći sloj koristiti 100 gr izblendanih borovnica/višanja/malina/šumskog voća, pa preko dodati 30 gr otopljene crne čokolade sa 75% ili više  kakaoa. Ostaviti 30-60 min u frižideru, ili kraće u zamrzivaču, dok se ne stegne čokoladna glazura.',
	'Tortilla burger':
		'110 gr junećeg buta oblikovati u loptu, pa dodati na 60-65 gr integralne tortilje i rukama ravnomerno rastanjiti meso do ivica tortilje. Na  tiganj dodati 3 gr ulja, razmazati četkicom, pa dodati tortilju tako da junetina bude direktno na tiganju. Kada bude govoto, okrenuti zajedno tortilju i juneću  but (najbolje pomoću tanjira), pa dodati 50 gr Skyr-a (ili Olympus 2% mm grčkog jogurta- treba da ima do 75 kcal/100 gr na deklaraciji) izmešanog sa ½-1  kašičice senfa, 50 gr iseckanog paradajza i 20-30 gr iseckanih zelenih krastavčića.',
	'Proteinski sladoled':
		'Izblendati 120 gr Skyr-a (ili Olympus 2% mm grčkog jogurta- treba da ima do 75 kcal/100 gr na deklaraciji), 120 gr zaleđenih višanja  (ili borovnica/malina/mix-a crvenog voća) i 20 gr whey proteina. Ostaviti 1-2 h u zamrzivaču.',
	'Pita sa spanaćem':
		'Umutiti u posudi 2 jajeta viljuškom, pa dodati 150 gr Skyr-a (ili Olympus 2% mm grčkog jogurta- treba da ima do 75 kcal/100 gr na deklaraciji), šakom sitno iseckanog spanaća (ako ga ne volite, samo ga izostavite iz recepta),100 gr ovsenih pahuljica. Izmešati kašikom, pa  dodati 60 gr izmrvljenog feta sira. Ponovo promešati, pa preneti na pleh obložen pek papirom. Posuti sa 10 gr susama, pa peći 30 min na 180 stepeni.  Polovinu pripremljenog obroka konzumirati za doručak, a drugu polovinu ostaviti za večeru. Napomena: I uz doručak i uz večeru konzumirati i po 150 gr Balans jogurta (ili bilo kojeg drugog sa 1% mm).',
	'Pita sa šumskim voćem':
		'Integralnu tortilju od 60-65 gr zagrejati po upustvu proizvođača, pa je premazati sa 25 gr kikiriki putera, dodati 80 gr crvenog bobičastog voća po izboru (borovnice, miks crvenog voća, maline...) i urolati je tako što ćete je saviti sa bočnih strana ka unutra, pa je urolati od dna ka  vrhu. Po želji se može dodatno kratko prepeći na tiganju, ili u pekaču za sendviče.',
	'Posni grašak':
		'Na vodi izdinstati prethodno iseckanu ½ glavice luka i ½ veće šargarepe, pa dodati 250 gr graška. Naliti 500 ml vode, pa ubrzo zatim i 50 ml paradajz pelata, so i začine. Grašak kuvati nekih 20-ak minuta, pa na kraju dodati i 25 gr ovsenih pahuljica. Na samom kraju, kada grašak  sklonite sa ringle, dodajte 5 ml maslinovog ulja. Polovinu pripremljenog obroka konzumirati za ručak, a drugu polovinu ostaviti za večeru.',
	'Palačinke sa vanilom i jagodama':
		'Izbendati 80 gr izgnječene banane, 20 gr heljdinog brašna (ili drugog integralnog brašna), 1 jaje, 50 gr Skyr-a (ili Olympus 2% mm niskomasnog grčkog jogurta- treba da ima do 75 kcal/100 gr), 15 gr whey proteina od vanile i ½ kašičice praška za pecivo. Izlivati  palačinke na tiganju premazanom sa 3 gr ulja i peći ravnomerno sa obe strane. Palačinke služiti uz 80 gr protein pudinga od vanile i 100 gr iseckanih  jagoda.',
	'Pita sa jabukom':
		'Integralnu tortilju od 60-65 gr zagrejati po upustvu proizvođača, pa je premazati sa 25 gr kikiriki putera, dodati 80 gr izrendane jabuke, cimet i urolati je tako što ćete je saviti sa bočnih strana ka unutra, pa je urolati od dna ka vrhu. Po želji se može dodatno kratko prepeći na tiganju, ili u  pekaču za sendviče. Po želji posuti sa još malo cimeta.',
	'Švarcvald sladoled':
		'Izblendati 260 gr Skyr-a (ili Olympus 2% mm grčkog jogurta) sa 100 gr izgnječene banane i 25 gr whey proteina. Dodati 80 gr višanja  (ili borovnica/šumskog voća...), izmešati pa zalediti. *Umesto whey proteina možete dodati i 4 srednje otkoštene sveže urme (usitniti ih prvo nožem), pa sve izblendati.',
	Đuveč:
		'Izdinstati na vodi 1 glavicu crnog luka. Kada omekša, dodati 100 gr pilećeg mesa, a zatim 150 gr iseckane crvene paprike. Nastaviti dinstanje. Posle  toga dodati 300 gr iseckanog paradajza i začiniti. Dinstati još dvadesetak minuta. Služiti uz 50 gr integralnog hleba.',
	'Pita sa tikvicama':
		'Izrendati jednu srednju tikvicu, malo je posoliti i ostaviti da pusti vodu. Nakon toga je dobro ocediti, pa dodati iseckanu 1  vezicu mladog luka, 2 jajeta, 150 gr izmrvljenog feta sira, ½ kesice praška za pecivo, 100 ml Balans jogurta (ili bilo kojeg drugog sa 1% mm), 60 gr speltinog  brašna (ili bilo kojeg drugog integralnog brašna). Izmešati sastojke, pa izliti na pleh ili kalup obložen pek papirom. Posuti sa 10 gr susama, pa peći na 180  stepeni, dok pita ne dobije rumenu boju. Pola pripremljenog obroka konzumirati za večeru, a drugu polovinu ostaviti za naredni dan za doručak.',
	'Fit pizza 2':
		'Pomešati 70 gr Skyr-a (ili Olympus 2% mm grčkog jogurta- treba da ima do 75 kcal/100 gr na deklaraciji), sa 60 gr sitnih ovsenih pahuljica, pola kesice praška za pecivo i malo soli. Umesiti testo, pa preneti na pek papir i rastanjiti ga pomoću drugog pek papira od gore. Na testo dodati 40-50 gr  pasiranog parajdaza, 50 gr iseckanih pilećih ili ćurećih prsa iz omota (ili 25 gr iseckane goveđe pršute), 50 gr šampinjona, origano i 35 gr mozzarele. Peći na  180 stepeni oko 20 minuta.',
	'Sendvič sa goveđom pršutom':
		'Recept je isti kao Sendvič sa goveđom pršutom u 1. i 3. nedelji.',
	'Špagete bolognese':
		'Izdinstati 1 glavicu crnog luka na vodi. Kada luk omekša,dodati 110 gr junećeg nemasnog mlevenog mesa (Umesto njega može 130 gr pilećegmlevenog belog mesa). Dinstati meso dok ne omekša. Dodati 150 ml soka od paradajza. Začiniti. Dinstati dok ne ispari sva voda. Za to vreme skuvati 50 gr integralne testenine u vodi, pa preliti pripremljenim sosom.',
	'Omlet sa tortillom':
		'Izblendati 1 celo jaje, 1 belance i šaku spanaća. Izliti na tiganj premazan sa 3 gr ulja. Kada se zapeče, dodati jednu integralnu tortilju od 60-65 gr, kratko utisnuti, pa zajedno okrenuti omlet sa tortiljom. Dodati 25 gr izrendanog kačkavalja i 40 gr iseckanih pilećih/ćurećih prsa iz omota (ili 20 gr goveđe pršute).',
};

const alternatives = {
	'Ferrero kolač': [
		'Kapri kolač',
		'Slana tortilla',
		'Pita sa šumskim voćem',
		'Pita sa jabukom',
		'Švarcvald sladoled',
	],
	'Salata sa jajima': ['Fit pizza 1', 'Fitt pizza 2'],
	'Projice sa spanaćem': ['Uštipci sa tikvicama'],
	'Hladna tuna pasta': [
		'Tuna salata',
		'Tortilla burger',
		'Đuveč',
		'Špagete bolognese:',
	],
	'Shake sa jagodom': ['Twix shake', 'Proteinski sladoled'],
	'Posne keks kuglice': [
		'Voćna salata',
		'Cheesecake kolač sa borovnicom',
		'Palačinke sa vanilom i jagodama',
		'Pita sa tikvicama',
		'Omlet sa tortillom',
	],
	Sataraš: ['Kremasta pasta sa pistaćima'],
	'Sendvič sa goveđom pršutom:': [
		'Proteinski sladoled',
		'Shake sa jagodom',
		'Twix shake',
	],
};
