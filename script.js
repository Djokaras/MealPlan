let state = {
	currentUser: 'Djordje',
	currentWeek: 1,
	selectedDayIdx: 0,
	modalRootMeal: null,
	swappedIngredients: {}, // Ovde pamtimo šta smo zamenili u listi za kupovinu
};

function init() {
	renderDaySelector();
	renderMeals();
	updateUI();
	renderShopDayGrid();
}

// Menjanje ekrana (Plan / Kupovina)
function showView(view) {
	const plan = document.getElementById('planView');
	const shop = document.getElementById('shoppingView');
	const nP = document.getElementById('navPlan');
	const nS = document.getElementById('navShop');

	if (view === 'plan') {
		plan.classList.remove('hidden');
		shop.classList.add('hidden');
		nP.classList.add('text-purple-800', 'scale-110');
		nP.classList.remove('text-gray-400');
		nS.classList.add('text-gray-400');
		nS.classList.remove('text-purple-800', 'scale-110');
	} else {
		plan.classList.add('hidden');
		shop.classList.remove('hidden');
		nS.classList.add('text-purple-800', 'scale-110');
		nS.classList.remove('text-gray-400');
		nP.classList.add('text-gray-400');
		nP.classList.remove('text-purple-800', 'scale-110');
		generateShoppingList();
	}
}

// Generisanje dana u filteru za kupovinu
function renderShopDayGrid() {
	const container = document.getElementById('shopDayGrid');
	container.innerHTML = '';
	for (let i = 1; i <= 7; i++) {
		const label = document.createElement('label');
		label.className =
			'flex-none flex flex-col items-center gap-1 px-4 py-3 bg-gray-50 rounded-2xl cursor-pointer min-w-[70px] border-2 border-transparent has-[:checked]:border-purple-600 has-[:checked]:bg-purple-50 transition-all';
		label.innerHTML = `<span class="text-[10px] font-black text-gray-400 uppercase">Dan ${i}</span><input type="checkbox" name="shopDay" value="${
			i - 1
		}" checked class="hidden" onchange="generateShoppingList()">`;
		container.appendChild(label);
	}
}

// GLAVNA LOGIKA ZA SHOPPING LISTU
function generateShoppingList() {
	const listDj = document.getElementById('shopDj').checked;
	const listMi = document.getElementById('shopMi').checked;
	const selDays = Array.from(
		document.querySelectorAll('input[name="shopDay"]:checked')
	).map((cb) => parseInt(cb.value));

	let master = {};
	const users = [];
	if (listDj) users.push('Djordje');
	if (listMi) users.push('Miljana');

	users.forEach((u) => {
		selDays.forEach((d) => {
			const meals = mealData[u][state.currentWeek][d]?.meals || {};
			Object.values(meals).forEach((m) => parseIngredients(m, master));
		});
	});

	renderShopUI(master);
}

// Izvlačenje namirnica iz teksta obroka
function parseIngredients(str, master) {
	const regex = /(\d+)\s*(gr|kom|ml|šake)\s*([a-zA-Zčćšđž\s]+)/gi;
	let m;
	while ((m = regex.exec(str)) !== null) {
		let qty = parseInt(m[1]);
		let unit = m[2];
		let originalName = m[3].trim().toLowerCase();
		let name = originalName;

		// KLJUČNO: Ako je korisnik u listi izabrao zamenu (npr. leblebija -> kukuruz)
		if (state.swappedIngredients[originalName]) {
			const swap = state.swappedIngredients[originalName];
			name = swap.target;
			qty = Math.round(qty * swap.factor);
		}

		const cat = getCategory(name);
		const key = `${name}_${unit}`;
		if (!master[key])
			master[key] = { name, qty: 0, unit, cat, original: originalName };
		master[key].qty += qty;
	}
}

function getCategory(name) {
	if (subData.nuts.items.some((i) => name.includes(i)))
		return 'Orašasto i masti';
	if (subData.meat.items.some((i) => name.includes(i))) return 'Meso i Riba';
	if (subData.legumes.items.some((i) => name.includes(i)))
		return 'Mahunarke i Skrob';
	if (
		name.includes('jogurt') ||
		name.includes('skyr') ||
		name.includes('sir') ||
		name.includes('mleko')
	)
		return 'Mlečni proizvodi';
	return 'Voće i Povrće';
}

// Funkcija koja menja stavku u listi
function swapShoppingItem(original, target, factor) {
	if (
		state.swappedIngredients[original] &&
		state.swappedIngredients[original].target === target
	) {
		delete state.swappedIngredients[original]; // Vrati na original ako klikne ponovo
	} else {
		state.swappedIngredients[original] = { target, factor };
	}
	generateShoppingList();
}

function renderShopUI(list) {
	const container = document.getElementById('shoppingListContainer');
	container.innerHTML = '';
	const cats = {};
	Object.values(list).forEach((item) => {
		if (!cats[item.cat]) cats[item.cat] = [];
		cats[item.cat].push(item);
	});

	Object.entries(cats)
		.sort()
		.forEach(([cat, items]) => {
			const sec = document.createElement('div');
			sec.innerHTML = `<h3 class="text-xs font-black text-purple-800 uppercase tracking-widest mb-3 flex items-center gap-2"><span class="w-1.5 h-1.5 bg-purple-800 rounded-full"></span> ${cat}</h3>
            <div class="bg-white rounded-3xl border border-gray-100 divide-y divide-gray-50 overflow-hidden shadow-sm">
                ${items
									.map((item) => {
										// Provera da li ova namirnica ima ponuđene zamene
										const group = Object.values(subData).find((g) =>
											g.items.some((i) => item.original.includes(i))
										);
										const canSwap = group && group.conversions;
										return `<div class="px-5 py-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <input type="checkbox" class="w-5 h-5 accent-purple-600 rounded-lg" onchange="this.nextElementSibling.classList.toggle('checked-item')">
                                <span class="text-sm font-bold text-gray-700 capitalize">${
																	item.name
																}</span>
                            </div>
                            <span class="text-sm font-black text-purple-900 bg-purple-50 px-3 py-1 rounded-lg">${
															item.qty
														}${
											item.unit.includes('kom') ? '' : ' ' + item.unit
										}</span>
                        </div>
                        ${
													canSwap
														? `<div class="ml-8 mt-2 flex flex-wrap gap-2">
                            <span class="text-[9px] font-black text-gray-400 uppercase pt-1">Zameni sa:</span>
                            ${Object.entries(group.conversions)
															.map(
																([t, f]) => `
                                <button onclick="swapShoppingItem('${
																	item.original
																}', '${t}', ${f})" class="text-[10px] font-bold px-2 py-1 rounded-md border ${
																	item.name === t
																		? 'bg-purple-600 text-white border-purple-600'
																		: 'bg-white text-gray-400 border-gray-200'
																}">${t}</button>
                            `
															)
															.join('')}
                        </div>`
														: ''
												}
                    </div>`;
									})
									.join('')}
            </div>`;
			container.appendChild(sec);
		});
}

function clearShoppingChecks() {
	state.swappedIngredients = {};
	generateShoppingList();
}

// --- Plan Logic (Recepies & Modals) ---
function renderDaySelector() {
	const container = document.getElementById('daySelector');
	const data = mealData[state.currentUser][state.currentWeek];
	container.innerHTML = '';
	data.forEach((entry, idx) => {
		const isActive = state.selectedDayIdx === idx;
		const button = document.createElement('button');
		button.className = `flex-none px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm ${
			isActive ? 'bg-purple-800 text-white' : 'bg-white text-gray-400'
		}`;
		button.innerText = entry.day;
		button.onclick = () => {
			state.selectedDayIdx = idx;
			renderDaySelector();
			renderMeals();
		};
		container.appendChild(button);
	});
}

function renderMeals() {
	const container = document.getElementById('mealsContainer');
	const data =
		mealData[state.currentUser][state.currentWeek][state.selectedDayIdx];
	container.innerHTML = '';
	['Doručak', 'Užina', 'Ručak', 'Užina2', 'Večera'].forEach((type) => {
		const name = data.meals[type];
		if (!name || name === 'x') return;
		const card = document.createElement('div');
		card.className = `meal-card p-4 rounded-2xl bg-white border border-gray-100 shadow-sm flex justify-between items-center cursor-pointer active:bg-gray-50`;
		card.onclick = () => openRecipe(name, true);
		card.innerHTML = `<div><span class="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-1 block">${type}</span><h4 class="text-base font-bold text-gray-800">${name}</h4></div><div class="p-2 bg-purple-50 rounded-xl"><svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"></path></svg></div>`;
		container.appendChild(card);
	});
	document.getElementById('dailyKcal').innerText = `${data.kcal} kcal`;
}

function openRecipe(name, isNewRoot = false) {
	if (isNewRoot) state.modalRootMeal = name;
	const modal = document.getElementById('recipeModal');
	document.getElementById('modalMealTitle').innerText = name;
	hideSubPanel();
	let recipeKey =
		Object.keys(recipes).find((key) => name.includes(key)) || name;
	const rawText = recipes[recipeKey] || name;
	const processedText = rawText.replace(
		/(\d+)\s*gr\s*([a-zA-Z\sčćšđž]+)/gi,
		(match, val, ing) => {
			return `<span class="sub-badge" onclick="showSubstitutions('${ing.trim()}', ${val})">${match}</span>`;
		}
	);
	document.getElementById('modalInstructions').innerHTML = processedText;
	let rootAltKey = Object.keys(alternatives).find((key) =>
		state.modalRootMeal.includes(key)
	);
	const alts = rootAltKey
		? [rootAltKey, ...alternatives[rootAltKey]]
		: [state.modalRootMeal];
	const altSection = document.getElementById('alternativesSection');
	const altList = document.getElementById('alternativesList');
	if (alts.length > 1) {
		altSection.classList.remove('hidden');
		altList.innerHTML = '';
		[...new Set(alts)].forEach((opt) => {
			const isActive = opt === name;
			const card = document.createElement('div');
			card.className = `alternative-item p-3 rounded-xl cursor-pointer border ${
				isActive
					? 'bg-purple-50 border-purple-400 active'
					: 'bg-white border-gray-200'
			}`;
			card.onclick = () => openRecipe(opt, false);
			card.innerHTML = `<p class="text-[9px] ${
				isActive ? 'text-purple-600' : 'text-gray-400'
			} font-bold uppercase mb-1">Opcija</p><p class="text-xs font-bold text-gray-800 line-clamp-2">${opt}</p>`;
			altList.appendChild(card);
		});
	} else {
		altSection.classList.add('hidden');
	}
	modal.classList.remove('hidden');
	setTimeout(() => modal.classList.add('opacity-100'), 10);
	document.body.style.overflow = 'hidden';
}

function showSubstitutions(name, amount) {
	const panel = document.getElementById('subPanel');
	const list = document.getElementById('subList');
	const title = document.getElementById('subTitle');
	const ln = name.toLowerCase();
	title.innerText = `Zamena za: ${amount}g ${name}`;
	list.innerHTML = '';
	let conv = {};
	if (ln.includes('banan'))
		conv = {
			'jabuka/ananas': 1.8,
			grožđe: 1.45,
			nar: 1.25,
			'jagoda/dinja': 2.7,
		};
	else if (ln.includes('tikvic'))
		conv = { krastavac: 1.0, paradajz: 1.0, paprika: 1.0, šampinjoni: 1.0 };
	else if (ln.includes('prsa'))
		conv = { 'goveđa pršuta': 0.5, 'mozzarella/feta': 0.6, tuna: 1.0 };
	else if (ln.includes('tuna'))
		conv = { 'pileći file': 0.88, oslić: 1.27, losos: 0.75 };
	else if (ln.includes('jagod') || ln.includes('dinj'))
		conv = { 'standardno voće': 0.67, banana: 0.35 };
	else {
		const group = Object.values(subData).find((g) =>
			g.items.some((i) => ln.includes(i))
		);
		if (group && group.conversions) conv = group.conversions;
	}
	Object.entries(conv).forEach(([t, f]) => {
		const final = Math.round(amount * f);
		const item = document.createElement('div');
		item.className =
			'bg-white p-2 rounded-lg border border-blue-100 text-center';
		item.innerHTML = `<span class="text-[10px] text-gray-400 font-bold uppercase">${t}</span><br><span class="text-sm font-black text-blue-700">${final}g</span>`;
		list.appendChild(item);
	});
	panel.classList.remove('hidden');
	panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideSubPanel() {
	document.getElementById('subPanel').classList.add('hidden');
}
function closeModal() {
	document.getElementById('recipeModal').classList.remove('opacity-100');
	setTimeout(() => {
		document.getElementById('recipeModal').classList.add('hidden');
		document.body.style.overflow = 'auto';
	}, 300);
}
function changeUser(user) {
	state.currentUser = user;
	state.selectedDayIdx = 0;
	updateUI();
	renderDaySelector();
	renderMeals();
}
function changeWeek(week) {
	state.currentWeek = week;
	state.selectedDayIdx = 0;
	updateUI();
	renderDaySelector();
	renderMeals();
}
function updateUI() {
	const dj = document.getElementById('btnDjordje');
	const mi = document.getElementById('btnMiljana');
	if (state.currentUser === 'Djordje') {
		dj.className =
			'px-3 py-1 rounded-full text-xs font-semibold border-2 bg-purple-800 text-white border-purple-800';
		mi.className =
			'px-3 py-1 rounded-full text-xs font-semibold border-2 bg-white text-gray-500 border-transparent';
	} else {
		mi.className =
			'px-3 py-1 rounded-full text-xs font-semibold border-2 bg-purple-800 text-white border-purple-800';
		dj.className =
			'px-3 py-1 rounded-full text-xs font-semibold border-2 bg-white text-gray-500 border-transparent';
	}
	const w1 = document.getElementById('week1Btn');
	const w2 = document.getElementById('week2Btn');
	if (state.currentWeek === 1) {
		w1.className =
			'flex-1 py-2 text-sm font-medium rounded-md bg-white shadow-sm text-purple-800';
		w2.className = 'flex-1 py-2 text-sm font-medium text-gray-500';
	} else {
		w2.className =
			'flex-1 py-2 text-sm font-medium rounded-md bg-white shadow-sm text-purple-800';
		w1.className = 'flex-1 py-2 text-sm font-medium text-gray-500';
	}
}

window.onload = init;
