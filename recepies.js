const subData = {
	fruit: {
		items: [
			'jagoda',
			'banana',
			'jabuka',
			'borovnic',
			'voće',
			'malin',
			'višnj',
			'breskv',
			'kajsij',
			'krušk',
			'trešnj',
			'mandarin',
			'mango',
			'kivi',
			'nektarin',
			'dinja',
			'lubenica',
			'grožđe',
			'nar',
		],
	},
	nuts: {
		items: [
			'badem',
			'lešnik',
			'kikiriki',
			'susam',
			'pistać',
			'orah',
			'indijski orah',
			'semenke bundeve',
			'kikiriki puter',
		],
		conversions: {
			'jabuka/borovnica': 10.5,
			'balans jogurt': 14.5,
			kokos: 1.18,
			humus: 2.3,
			'feta sir': 2.85,
			avokado: 3.5,
		},
	},
	grains: {
		items: [
			'kuskus',
			'testenina',
			'ovsene',
			'pirinač',
			'heljdin',
			'hleb',
			'brašna',
			'pahuljica',
			'galete',
			'tortilja',
			'njoke',
		],
		conversions: { hleb: 1.3, galete: 0.9, tortilja: 1.25, krompir: 3.3 },
	},
	meat: {
		items: [
			'pileći file',
			'oslić',
			'tuna',
			'juneći',
			'lignje',
			'pršut',
			'gambori',
			'orada',
			'som',
			'pljeskavica',
			'file',
		],
		conversions: {
			'pileći file': 1.1,
			losos: 0.65,
			lignje: 1.4,
			'orada/som': 1.4,
			oslić: 1.6,
		},
	},
	legumes: {
		items: ['leblebija', 'kukuruz', 'grašak', 'pasulj', 'krompir', 'batat'],
		conversions: {
			kukuruz: 1.15,
			'grašak/krompir': 1.5,
			batat: 1.35,
			avokado: 0.65,
			'crveni pasulj': 2,
		},
	},
	vegetables: {
		items: [
			'tikvica',
			'krastavac',
			'paradajz',
			'paprika',
			'šampinjon',
			'plavi patlidžan',
			'luk',
		],
		conversions: {
			krastavac: 1.0,
			paradajz: 1.0,
			paprika: 1.0,
			šampinjoni: 1.0,
		},
	},
};

const recipes = {
	'Ferrero kolač':
		'Usitniti 30 gr keksa bez dodatog šećera, pa ga izmešati sa 30 ml bademovog mleka bez dodatog šećera i utisnuti na dno posude. Preko dodati 180-200 gr protein pudinga od čokolade i 15 gr iseckanih lešnika.',
	'Projice sa spanaćem':
		'U posudu dodati 2 jajeta, 100 gr kukuruznog brašna, 180 gr Skyr islandskog jogurta, 1 kašičicu soli, 1 kašičicu praška za pecivo i 3 gr ulja. Dodati 50 gr spanaća. Peći 20-25 min na 200 stepeni.',
	'Salata sa jajima':
		'2 šake matilovca (ili baby spanaća), 2 iseckana kuvana jajeta i 100 gr gotovih leblebija iz konzerve. Preko dodati 100 gr Skyr-a, začine i 10 gr susama.',
	'Hladna tuna pasta':
		'60 gr integralne testenine, 50 gr Skyr-a, 50 gr oceđene tune, 50 gr zelenih krastavčića, 50 gr cherry paradajza, 50 gr kukuruza. Dodati 10 gr susama.',
	'Shake sa jagodom':
		'Izblendati 250 gr jagoda, 100 ml bademovog mleka bez dodatog šećera i 30 gr whey proteina.',
	'Uštipci sa tikvicama': `Pomešati 2 jajeta sa 60 gr mlevenih ovsenih pahuljica (može i već gotovo ovseno brašno). Dodati 260 gr izrendane tikvice. Začiniti po ukusu. Peći na tiganju premazanom sa 5 gr ulja. Pola pripremljenog obroka konzumirati za doručak, a drugu polovinu ostaviti za večeru.`,
	'Posne keks kuglice':
		'75 gr banane, 75 gr mlevenog keksa bez dodatog šećera, 15 gr veganskog ili whey proteina. Oblikovati kuglice.',
	Sataraš:
		'Izdinstati na vodi 140 gr pilećeg belog mesa, dodati 200 gr crvene paprike, 200 gr paradajza. Na kraju umućeno celo jaje i 1 belance. Služiti uz 40 gr integralnog hleba.',
	'Voćna salata':
		'Pomešati u činiji 100 gr iseckane banane, 300 gr jagoda (ili dinje/lubenice) i 40 gr kikirikija.',
	'Tuna salata':
		'200 gr cherry paradajza, 200 gr crvene paprike, 50 gr crvenog luka, 250 gr crvenog pasulja, 300 gr kukuruza, 180 gr oceđene tune. Dodati 5 gr maslinovog ulja i limun.',
	'Kapri kolač':
		'30 gr keksa, 30 ml bademovog mleka. Fil: 100 gr skyr + 10 gr whey vanila. Top: 80 gr jagoda + 25 gr crne čokolade.',
	'Fit pizza 1':
		'1 jaje, 50 gr ovsenih, 30 gr skyr, 1/2 praška za pecivo. Top: 40-50 gr paradajza, 20 gr pršute, 20 gr kukuruza, 25 gr mozzarele.',
	'Twix shake':
		'200 ml bademovog mleka, 10 gr whey čokolade, 40 gr mlevenog keksa bez šećera.',
	'Sendvič sa goveđom pršutom':
		'Na 60 gr integralnog hleba dodati 40-50 gr paradajza, 30 gr pršute, 2 cherry paradajza i 20 gr mozzarele. Kratko zapeći.',
	'Slana tortilla':
		'Omlet (1 jaje, 1 belance) na tortilji (60-65 gr). Dodati 50 gr paradajza i 35 gr pršute.',
	'Kremasta pasta sa pistaćima':
		'20 gr pršute na 3 gr ulja, 80 gr light pavlake, 60 gr testenine, 20 gr mozzarelle i 10 gr pistaća.',
	'Cheesecake kolač sa borovnicom':
		'30 gr keksa, 30 ml bademovog mleka, 100 gr skyr, 10 gr whey, 100 gr borovnica, 30 gr crne čokolade.',
	'Tortilla burger':
		'110 gr junećeg buta na tortilji (65 gr). Dodati 50 gr skyr-a, senf, 50 gr paradajza i 20-30 gr krastavčića.',
	'Proteinski sladoled':
		'Izblendati 120 gr Skyr-a, 120 gr zaleđenih višanja i 20 gr whey proteina. Ostaviti 1-2 h u zamrzivaču.',
	'Pita sa spanaćem':
		'2 jajeta, 150 gr skyr, šaka spanaća, 100 gr ovsenih, 60 gr feta sira, 10 gr susama. Peći 30 min na 180 stepeni.',
	'Pita sa šumskim voćem':
		'Integralnu tortilju od 60-65 gr zagrejati, premazati sa 25 gr kikiriki putera, dodati 80 gr crvenog bobičastog voća i urolati.',
	'Posni grašak':
		'250 gr graška, šargarepa, luk, 50 ml paradajz pelata, 25 gr ovsenih, 5 ml maslinovog ulja.',
	'Palačinke sa vanilom i jagodama':
		'80 gr banane, 20 gr heljdinog brašna, 1 jaje, 50 gr skyr, 15 gr whey. Služiti uz 80 gr protein pudinga i 100 gr jagoda.',
	'Pita sa jabukom':
		'Tortilja (65 gr), 25 gr kikiriki putera, 80 gr jabuke, cimet.',
	'Švarcvald sladoled':
		'260 gr skyr, 100 gr banane, 25 gr whey, 80 gr višanja.',
	Đuveč:
		'100 gr piletine, 150 gr paprike, 300 gr paradajza, luk. Služiti uz 50 gr integralnog hleba.',
	'Pita sa tikvicama':
		'Tikvica, 2 jajeta, 150 gr fete, 100 ml Balans jogurta, 60 gr speltinog brašna, 10 gr susama.',
	'Fit pizza 2':
		'70 gr skyr, 60 gr ovsenih. Top: paradajz, 50 gr pilećih prsa, 50 gr šampinjoni, 35 gr mozzarele.',
	'Špagete bolognese':
		'110 gr junetine, luk, 150 ml paradajza, 50 gr integralne testenine.',
	'Omlet sa tortillom': `Izblendati 1 celo jaje, 1 belance i šaku spanaća. Izliti na tiganj premazan sa 3 gr ulja. Kada se zapeče, dodati jednu integralnu tortilju od 60-65 gr, kratko utisnuti, pa zajedno okrenuti omlet sa tortiljom. Dodati 25 gr izrendanog kačkavalja i 40 gr pilećih/ćurećih prsa iz omota (ili 20 gr goveđe pršute).`,
};

const alternatives = {
	'Ferrero kolač': [
		'Kapri kolač',
		'Slana tortilla',
		'Pita sa šumskim voćem',
		'Pita sa jabukom',
		'Švarcvald sladoled',
	],
	'Salata sa jajima': ['Fit pizza 1', 'Fit pizza 2'],
	'Projice sa spanaćem': ['Uštipci sa tikvicama'],
	'Hladna tuna pasta': [
		'Tuna salata',
		'Tortilla burger',
		'Đuveč',
		'Špagete bolognese',
	],
	'Shake sa jagodom': ['Twix shake', 'Proteinski sladoled'],
	'Uštipci sa tikvicama': ['Projice sa spanaćem'],
	'Posne keks kuglice': [
		'Voćna salata',
		'Cheesecake kolač sa borovnicom',
		'Palačinke sa vanilom i jagodama',
		'Pita sa tikvicama',
		'Omlet sa tortillom',
	],
	Sataraš: ['Kremasta pasta sa pistaćima'],
	'Sendvič sa goveđom pršutom': [
		'Proteinski sladoled',
		'Shake sa jagodom',
		'Twix shake',
		'Slana tortilla',
		'Fit pizza 1',
	],
	'Voćna salata': ['Posne keks kuglice', 'Cheesecake kolač sa borovnicom'],
};

const mealData = {
	Djordje: {
		1: [
			{
				day: '1. Dan',
				kcal: 1731,
				meals: {
					Doručak: 'Ferrero kolač',
					Užina: '150 gr jagoda + 100 gr banane',
					Ručak: 'Salata sa jajima',
					Užina2: '300 gr jagoda + 15 gr whey proteina',
					Večera:
						'60 gr kuskusa + salata + 150 gr leblebija iz konzerve + 80 gr pečenog pilećeg belog mesa',
				},
			},
			{
				day: '2. Dan',
				kcal: 1721,
				meals: {
					Doručak: 'Projice sa spanaćem (1/2) + 180 gr Balans jogurta',
					Užina: '20 gr lešnika + 150 gr jabuke',
					Ručak: 'Hladna tuna pasta',
					Užina2: 'Shake sa jagodom',
					Večera: 'Projice sa spanaćem (1/2) + 180 gr Balans jogurta',
				},
			},
			{
				day: '3. Dan',
				kcal: 1727,
				meals: {
					Doručak: 'Posne keks kuglice',
					Užina: '35 gr lešnika + 200 gr jagoda',
					Ručak: '200 gr oslića + 50 gr kuskusa + salata + 100 gr graška',
					Užina2: '20 gr lešnika',
					Večera: '150 gr oslića + 40 gr kuskusa + salata + 50 gr graška',
				},
			},
			{
				day: '4. Dan',
				kcal: 1745,
				meals: {
					Doručak: 'Uštipci sa tikvicama (1/2) + salata',
					Užina: '100 gr banane + 200 gr jagoda + 10 gr kikiriki putera',
					Ručak: 'Sataraš',
					Užina2: 'Shake sa jagodom',
					Večera: 'Uštipci sa tikvicama (1/2) + salata',
				},
			},
			{
				day: '5. Dan',
				kcal: 1712,
				meals: {
					Doručak: 'Voćna salata',
					Užina: '20 gr veganskog proteina',
					Ručak: 'Tuna salata (1/2) + 40 gr integralnog hleba',
					Užina2: '200 gr jagoda + 25 gr kikirikija',
					Večera: 'Tuna salata (1/2)',
				},
			},
			{
				day: '6. Dan',
				kcal: 1730,
				meals: {
					Doručak: 'Kapri kolač',
					Užina: '300 gr jagoda + 100 gr banane',
					Ručak: 'Fit pizza 1',
					Užina2: 'Twix shake',
					Večera: 'Sendvič sa goveđom pršutom + 300 gr Balans jogurta',
				},
			},
			{
				day: '7. Dan',
				kcal: 1722,
				meals: {
					Doručak: 'Slana tortilla + 200 gr Balans jogurta',
					Užina: '300 gr jagoda',
					Ručak: 'Kremasta pasta sa pistaćima',
					Užina2: 'x',
					Večera:
						'150 gr pileći file + salata + 200 gr kukuruza + 50 gr kuskusa',
				},
			},
		],
		2: [
			{
				day: '1. Dan',
				kcal: 1733,
				meals: {
					Doručak: 'Cheesecake kolač sa borovnicom',
					Užina: '200 gr borovnica + 20 gr badema',
					Ručak: 'Tortilla burger',
					Užina2: 'Proteinski sladoled',
					Večera: '40 gr kuskusa + 150 gr kukuruza + salata',
				},
			},
			{
				day: '2. Dan',
				kcal: 1734,
				meals: {
					Doručak: 'Pita sa spanaćem (1/2)',
					Užina: '300 gr jagoda + 10 gr kikiriki putera',
					Ručak:
						'150 gr pileći file + 50 gr kuskusa + salata + 150 gr kukuruza',
					Užina2: 'x',
					Večera: 'Pita sa spanaćem (1/2)',
				},
			},
			{
				day: '3. Dan',
				kcal: 1720,
				meals: {
					Doručak: 'Pita sa šumskim voćem',
					Užina: '300 gr voća + 40 gr badema',
					Ručak: 'Posni grašak (1/2) + 200 gr pečenog oslića + salata',
					Užina2: '120 gr banane',
					Večera: 'Posni grašak (1/2) + 150 gr pečenog oslića + salata',
				},
			},
			{
				day: '4. Dan',
				kcal: 1720,
				meals: {
					Doručak: 'Palačinke sa vanilom i jagodama',
					Užina: '150 gr jabuke + 15 gr badema',
					Ručak:
						'120 gr pljeskavica + 50 gr pirinča + salata (+5 gr maslinovo ulje)',
					Užina2: '120 gr protein puding + 250 gr jagoda',
					Večera:
						'120 gr pljeskavica + 50 gr pirinča + salata (+5 gr maslinovo ulje)',
				},
			},
			{
				day: '5. Dan',
				kcal: 1721,
				meals: {
					Doručak: 'Pita sa jabukom',
					Užina: '100 gr jabuke + 30 gr kikiriki putera',
					Ručak:
						'200 gr grilovanih lignji + 50 gr pirinča + salata + 100 gr graška',
					Užina2: '20 gr badema',
					Večera:
						'200 gr grilovanih lignji + 50 gr pirinča + salata + 50 gr graška',
				},
			},
			{
				day: '6. Dan',
				kcal: 1731,
				meals: {
					Doručak: 'Švarcvald sladoled',
					Užina: '150 gr banane',
					Ručak: 'Đuveč',
					Užina2: '250 gr jagoda + 15 gr badema',
					Večera: 'Pita sa tikvicama (1/2) + 150 gr Balans jogurta + salata',
				},
			},
			{
				day: '7. Dan',
				kcal: 1725,
				meals: {
					Doručak: 'Pita sa tikvicama (1/2) + 150 gr Balans jogurta + salata',
					Užina: '200 gr banane',
					Ručak: 'Fit pizza 2',
					Užina2: '300 gr jagoda',
					Večera: 'Sendvič sa goveđom pršutom + 200 gr Balans jogurta',
				},
			},
		],
	},
	Miljana: {
		1: [
			{
				day: '1. Dan',
				kcal: 1323,
				meals: {
					Doručak: 'Ferrero kolač',
					Užina: 'x',
					Ručak: 'Salata sa jajima',
					Užina2: '300 gr jagoda',
					Večera: '50 gr kuskusa + salata + 100 gr leblebija',
				},
			},
			{
				day: '2. Dan',
				kcal: 1341,
				meals: {
					Doručak: 'Projice sa spanaćem (1/2) + 150 gr Balans jogurta',
					Užina: 'x',
					Ručak: 'Hladna tuna pasta',
					Užina2: '15 gr badema',
					Večera: 'Projice sa spanaćem (1/2) + 180 gr Balans jogurta',
				},
			},
			{
				day: '3. Dan',
				kcal: 1335,
				meals: {
					Doručak: 'Posne keks kuglice',
					Užina: '30 gr lešnika + 200 gr jagoda',
					Ručak: '130 gr oslića + 30 gr kuskusa + salata + 50 gr graška',
					Užina2: 'x',
					Večera: '130 gr oslića + 30 gr kuskusa + salata + 50 gr graška',
				},
			},
			{
				day: '4. Dan',
				kcal: 1358,
				meals: {
					Doručak: 'Uštipci sa tikvicama (1/2)',
					Užina: '100 gr banane',
					Ručak: 'Sataraš',
					Užina2: '200 gr jagoda',
					Večera: 'Uštipci sa tikvicama (1/2)',
				},
			},
			{
				day: '5. Dan',
				kcal: 1352,
				meals: {
					Doručak: 'Voćna salata',
					Užina: 'x',
					Ručak: 'Tuna salata (1/2) + 40 gr integralnog hleba',
					Užina2: '150 gr jagoda',
					Večera: 'Tuna salata (1/2)',
				},
			},
			{
				day: '6. Dan',
				kcal: 1335,
				meals: {
					Doručak: 'Kapri kolač',
					Užina: '300 gr jagoda',
					Ručak: 'Fit pizza 1',
					Užina2: '200 gr jagoda',
					Večera: 'Sendvič sa goveđom pršutom + 300 gr Balans jogurta',
				},
			},
			{
				day: '7. Dan',
				kcal: 1343,
				meals: {
					Doručak: 'Sendvič sa goveđom pršutom',
					Užina: '300 gr jagoda',
					Ručak: 'Kremasta pasta sa pistaćima',
					Užina2: 'x',
					Večera:
						'130 gr pileći file + salata + 120 gr kukuruza + 30 gr kuskusa',
				},
			},
		],
		2: [
			{
				day: '1. Dan',
				kcal: 1351,
				meals: {
					Doručak: 'Cheesecake kolač sa borovnicom',
					Užina: 'x',
					Ručak: 'Tortilla burger',
					Užina2: '150 gr banane + 130 gr borovnica',
					Večera: 'Proteinski sladoled',
				},
			},
			{
				day: '2. Dan',
				kcal: 1350,
				meals: {
					Doručak: 'Pita sa spanaćem (1/2) + 180 gr Balans jogurta',
					Užina: '200 gr jagoda',
					Ručak: '80 gr pileći file + 40 gr kuskusa + salata',
					Užina2: 'x',
					Veclera: 'Pita sa spanaćem (1/2) + 180 gr Balans jogurta',
				},
			},
			{
				day: '3. Dan',
				kcal: 1342,
				meals: {
					Doručak: 'Pita sa šumskim voćem',
					Užina: '200 gr voća + 20 gr badema',
					Ručak: 'Posni grašak (1/2) + 130 gr oslića + salata',
					Užina2: 'x',
					Večera: 'Posni grašak (1/2) + 130 gr oslića + salata',
				},
			},
			{
				day: '4. Dan',
				kcal: 1334,
				meals: {
					Doručak: 'Palačinke sa vanilom i jagodama',
					Užina: 'x',
					Ručak: '80 gr pljeskavica + 50 gr pirinča + salata',
					Užina2: '120 gr protein puding + 15 gr badema',
					Večera: '80 gr pljeskavica + 50 gr pirinča + salata',
				},
			},
			{
				day: '5. Dan',
				kcal: 1337,
				meals: {
					Doručak: 'Pita sa jabukom',
					Užina: '100 gr jabuka + 20 gr kikiriki putera',
					Ručak: '200 gr grilovanih lignji + 40 gr pirinča + salata',
					Užina2: 'x',
					Večera: '200 gr grilovanih lignji + 40 gr pirinča + salata',
				},
			},
			{
				day: '6. Dan',
				kcal: 1339,
				meals: {
					Doručak: 'Shake sa jagodom',
					Užina: '100 gr banane + 200 gr jagoda',
					Ručak: 'Đuveč',
					Užina2: 'x',
					Večera: 'Pita sa tikvicama (1/2) + 150 gr Balans jogurta',
				},
			},
			{
				day: '7. Dan',
				kcal: 1722,
				meals: {
					Doručak: 'Pita sa tikvicama (1/2) + 150 gr Balans jogurta',
					Užina: 'x',
					Ručak: 'Fit pizza 2',
					Užina2: '100 gr banane + 100 gr jagoda',
					Večera: 'Twix shake',
				},
			},
		],
	},
};
