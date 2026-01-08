// --- GLOBAL FUNCTIONS DEFINED FIRST FOR SCOPE ---
window.showView = function (view) {
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
};

window.toggleLabelStyle = function (input) {
	const label = input.parentElement;
	if (input.checked) label.classList.add('user-label-active');
	else label.classList.remove('user-label-active');
};
let state = {
	currentUser: 'Djordje',
	currentWeek: 1,
	selectedDayIdx: 0,
	modalRootMeal: null,
	swappedIngredients: {},
	currentMasterList: {},
};

function init() {
	renderDaySelector();
	renderMeals();
	updateUI();
	renderShopDayGrid();
	toggleLabelStyle(document.getElementById('shopDj'));
	toggleLabelStyle(document.getElementById('shopMi'));
}

function renderShopDayGrid() {
	const container = document.getElementById('shopDayGrid');
	if (!container) return;
	container.innerHTML = '';
	for (let i = 1; i <= 7; i++) {
		const label = document.createElement('label');
		label.className =
			'flex-none flex flex-col items-center gap-1 px-4 py-3 bg-gray-50 rounded-2xl cursor-pointer min-w-[70px] border-2 border-transparent transition-all';
		label.innerHTML = `<span class="text-[10px] font-black text-gray-400 uppercase">Dan ${i}</span><input type="checkbox" name="shopDay" value="${
			i - 1
		}" checked class="hidden" onchange="toggleLabelStyle(this); generateShoppingList();">`;
		container.appendChild(label);
		toggleLabelStyle(label.querySelector('input'));
	}
}

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
		const weekData = mealData[u] && mealData[u][state.currentWeek];
		if (!weekData) return;

		selDays.forEach((d) => {
			const dayData = weekData[d];
			const meals = dayData && dayData.meals;
			if (!meals) return;

			Object.keys(meals).forEach((key) => {
				parseIngredients(meals[key], master);
			});
		});
	});

	state.currentMasterList = master;
	renderShopUI(master);
}

function parseIngredients(str, master) {
	if (!str) return;
	const regex = /(\d+)\s*(gr|kom|ml|šake)\s*([a-zA-Zčćšđž\s]+)/gi;
	let m;
	while ((m = regex.exec(str)) !== null) {
		let qty = parseInt(m[1]);
		let unit = m[2];
		let originalName = m[3].trim().toLowerCase();
		let name = originalName;

		if (state.swappedIngredients[originalName]) {
			const swap = state.swappedIngredients[originalName];
			name = swap.target;
			qty = Math.round(qty * swap.factor);
		}

		const cat = getCategory(name);
		const key = name + '_' + unit;
		if (!master[key])
			master[key] = {
				name: name,
				qty: 0,
				unit: unit,
				cat: cat,
				original: originalName,
			};
		master[key].qty += qty;
	}
}

function getCategory(name) {
	const ln = name.toLowerCase();
	if (subData.nuts.items.some((i) => ln.indexOf(i) !== -1))
		return 'Orašasto i masti';
	if (subData.meat.items.some((i) => ln.indexOf(i) !== -1))
		return 'Meso i Riba';
	if (subData.legumes.items.some((i) => ln.indexOf(i) !== -1))
		return 'Mahunarke i Skrob';
	if (
		ln.indexOf('jogurt') !== -1 ||
		ln.indexOf('skyr') !== -1 ||
		ln.indexOf('sir') !== -1 ||
		ln.indexOf('mleko') !== -1
	)
		return 'Mlečni proizvodi';
	return 'Voće i Povrće';
}

function swapShoppingItem(original, target, factor) {
	if (
		state.swappedIngredients[original] &&
		state.swappedIngredients[original].target === target
	) {
		delete state.swappedIngredients[original];
	} else {
		state.swappedIngredients[original] = { target: target, factor: factor };
	}
	generateShoppingList();
}

function renderShopUI(list) {
	const container = document.getElementById('shoppingListContainer');
	if (!container) return;
	container.innerHTML = '';
	const cats = {};
	Object.keys(list).forEach((k) => {
		const item = list[k];
		if (!cats[item.cat]) cats[item.cat] = [];
		cats[item.cat].push(item);
	});

	Object.keys(cats)
		.sort()
		.forEach((cat) => {
			const items = cats[cat];
			const sec = document.createElement('div');
			let itemsHtml = items
				.map((item) => {
					let group = null;
					const subGroups = Object.keys(subData);
					for (let i = 0; i < subGroups.length; i++) {
						const g = subData[subGroups[i]];
						if (
							g.items &&
							g.items.some((it) => item.original.indexOf(it) !== -1)
						) {
							group = g;
							break;
						}
					}
					const canSwap = group && group.conversions;

					let swapButtons = '';
					if (canSwap) {
						const targets = Object.keys(group.conversions);
						swapButtons = targets
							.map((t) => {
								const active =
									item.name === t
										? 'bg-purple-600 text-white border-purple-600'
										: 'bg-white text-gray-400 border-gray-200';
								return `<button onclick="swapShoppingItem('${item.original}', '${t}', ${group.conversions[t]})" class="text-[10px] font-bold px-2 py-1 rounded-md border ${active}">${t}</button>`;
							})
							.join('');
					}

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
						item.unit.indexOf('kom') !== -1 ? '' : ' ' + item.unit
					}</span>
                                </div>
                                ${
																	canSwap
																		? `<div class="ml-8 mt-2 flex flex-wrap gap-2">
                                    <span class="text-[9px] font-black text-gray-400 uppercase pt-1">Zameni:</span>
                                    ${swapButtons}
                                </div>`
																		: ''
																}
                            </div>`;
				})
				.join('');

			sec.innerHTML = `<h3 class="text-xs font-black text-purple-800 uppercase tracking-widest mb-3 flex items-center gap-2"><span class="w-1.5 h-1.5 bg-purple-800 rounded-full"></span> ${cat}</h3>
                    <div class="bg-white rounded-3xl border border-gray-100 divide-y divide-gray-50 overflow-hidden shadow-sm">${itemsHtml}</div>`;
			container.appendChild(sec);
		});
}

function clearShoppingChecks() {
	state.swappedIngredients = {};
	generateShoppingList();
}

function formatListForSharing() {
	let text = '🛒 *LISTA ZA KUPOVINU*\n\n';
	const cats = {};
	Object.keys(state.currentMasterList).forEach((k) => {
		const item = state.currentMasterList[k];
		if (!cats[item.cat]) cats[item.cat] = [];
		cats[item.cat].push(item);
	});
	const icons = {
		'Orašasto i masti': '🥜',
		'Meso i Riba': '🥩',
		'Mahunarke i Skrob': '🥔',
		'Mlečni proizvodi': '🥛',
		'Voće i Povrće': '🥦',
	};
	Object.keys(cats)
		.sort()
		.forEach((cat) => {
			const items = cats[cat];
			text += (icons[cat] || '🔹') + ' *' + cat.toUpperCase() + '*\n';
			items.forEach(
				(item) =>
					(text +=
						'- ' +
						item.name.charAt(0).toUpperCase() +
						item.name.slice(1) +
						': ' +
						item.qty +
						item.unit +
						'\n')
			);
			text += '\n';
		});
	return text + '_Generisano iz Meal Plannera_';
}

window.copyShoppingList = function () {
	const text = formatListForSharing();
	const textArea = document.getElementById('hiddenClipboard');
	textArea.value = text;
	textArea.focus();
	textArea.select();
	try {
		document.execCommand('copy');
		showToast('Kopirano u clipboard!');
	} catch (err) {
		showToast('Greška pri kopiranju.');
	}
};

window.shareOnWhatsApp = function () {
	const text = encodeURIComponent(formatListForSharing());
	window.open('https://wa.me/?text=' + text, '_blank');
};

function showToast(msg) {
	const t = document.getElementById('toast');
	t.innerText = msg;
	t.style.opacity = '1';
	t.style.transform = 'translate(-50%, -10px)';
	setTimeout(() => {
		t.style.opacity = '0';
		t.style.transform = 'translate(-50%, 0)';
	}, 2000);
}

// --- Original Plan Logic ---
function renderDaySelector() {
	const container = document.getElementById('daySelector');
	if (!container) return;
	const data =
		mealData[state.currentUser] &&
		mealData[state.currentUser][state.currentWeek];
	if (!data) return;
	container.innerHTML = '';
	data.forEach((entry, idx) => {
		const isActive = state.selectedDayIdx === idx;
		const button = document.createElement('button');
		button.className =
			'flex-none px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm ' +
			(isActive ? 'bg-purple-800 text-white' : 'bg-white text-gray-400');
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
	if (!container) return;
	const weekData =
		mealData[state.currentUser] &&
		mealData[state.currentUser][state.currentWeek];
	const data = weekData && weekData[state.selectedDayIdx];
	if (!data) return;
	container.innerHTML = '';
	const mealOrder = ['Doručak', 'Užina', 'Ručak', 'Užina2', 'Večera'];
	for (let i = 0; i < mealOrder.length; i++) {
		const type = mealOrder[i];
		const name = data.meals[type];
		if (!name || name === 'x') continue;
		const card = document.createElement('div');
		card.className =
			'meal-card p-4 rounded-2xl bg-white border border-gray-100 shadow-sm flex justify-between items-center cursor-pointer active:bg-gray-50';
		card.onclick = () => openRecipe(name, true);
		card.innerHTML = `<div><span class="text-[9px] font-black text-purple-400 uppercase tracking-widest mb-1 block">${type}</span><h4 class="text-base font-bold text-gray-800">${name}</h4></div><div class="p-2 bg-purple-50 rounded-xl"><svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"></path></svg></div>`;
		container.appendChild(card);
	}
	document.getElementById('dailyKcal').innerText = data.kcal + ' kcal';
}

function openRecipe(name, isNewRoot) {
	if (isNewRoot) state.modalRootMeal = name;
	const modal = document.getElementById('recipeModal');
	document.getElementById('modalMealTitle').innerText = name;
	hideSubPanel();

	let recipeKey = null;
	const keys = Object.keys(recipes);
	for (let i = 0; i < keys.length; i++) {
		if (name.indexOf(keys[i]) !== -1) {
			recipeKey = keys[i];
			break;
		}
	}
	if (!recipeKey) recipeKey = name;

	const rawText = recipes[recipeKey] || name;
	const processedText = rawText.replace(
		/(\d+)\s*gr\s*([a-zA-Z\sčćšđž]+)/gi,
		(match, val, ing) => {
			const lowerIng = ing.toLowerCase();
			let found = false;
			const groups = Object.keys(subData);
			for (let j = 0; j < groups.length; j++) {
				if (subData[groups[j]].items.some((i) => lowerIng.indexOf(i) !== -1)) {
					found = true;
					break;
				}
			}
			if (
				found ||
				lowerIng.indexOf('banan') !== -1 ||
				lowerIng.indexOf('prsa') !== -1 ||
				lowerIng.indexOf('tuna') !== -1
			) {
				return `<span class="sub-badge" onclick="showSubstitutions('${ing.trim()}', ${val})">${match}</span>`;
			}
			return match;
		}
	);
	document.getElementById('modalInstructions').innerHTML = processedText;

	let rootAltKey = null;
	const altKeys = Object.keys(alternatives);
	for (let i = 0; i < altKeys.length; i++) {
		if (state.modalRootMeal.indexOf(altKeys[i]) !== -1) {
			rootAltKey = altKeys[i];
			break;
		}
	}
	const alts = rootAltKey
		? [rootAltKey].concat(alternatives[rootAltKey])
		: [state.modalRootMeal];
	const altSection = document.getElementById('alternativesSection');
	const altList = document.getElementById('alternativesList');

	const uniqueAlts = [];
	alts.forEach((a) => {
		if (uniqueAlts.indexOf(a) === -1) uniqueAlts.push(a);
	});

	if (uniqueAlts.length > 1) {
		altSection.classList.remove('hidden');
		altList.innerHTML = '';
		uniqueAlts.forEach((opt) => {
			const isActive = opt === name;
			const card = document.createElement('div');
			card.className =
				'alternative-item p-3 rounded-xl cursor-pointer border ' +
				(isActive
					? 'bg-purple-50 border-purple-400'
					: 'bg-white border-gray-200');
			card.onclick = () => openRecipe(opt, false);
			card.innerHTML =
				`<p class="text-[9px] ` +
				(isActive ? 'text-purple-600' : 'text-gray-400') +
				` font-bold uppercase mb-1">Opcija</p><p class="text-xs font-bold text-gray-800 line-clamp-2">${opt}</p>`;
			altList.appendChild(card);
		});
	} else {
		altSection.classList.add('hidden');
	}
	modal.classList.remove('hidden');
	setTimeout(() => modal.classList.add('opacity-100'), 10);
	document.body.style.overflow = 'hidden';
}

window.showSubstitutions = function (name, amount) {
	const panel = document.getElementById('subPanel');
	const list = document.getElementById('subList');
	const title = document.getElementById('subTitle');
	const ln = name.toLowerCase();
	title.innerText = 'Zamena za: ' + amount + 'g ' + name;
	list.innerHTML = '';
	let conv = {};
	if (ln.indexOf('banan') !== -1)
		conv = {
			'jabuka/ananas': 1.8,
			grožđe: 1.45,
			nar: 1.25,
			'jagoda/dinja': 2.7,
		};
	else if (ln.indexOf('tikvic') !== -1)
		conv = {
			krastavac: 1.0,
			paradajz: 1.0,
			paprika: 1.0,
			šampinjoni: 1.0,
			patlidžan: 1.0,
		};
	else if (ln.indexOf('prsa') !== -1)
		conv = {
			'goveđa pršuta': 0.5,
			'mozzarella/feta': 0.6,
			'jaje (kom)': 0.02,
			tuna: 1.0,
		};
	else if (ln.indexOf('tuna') !== -1)
		conv = { 'pileći file': 0.88, oslić: 1.27, losos: 0.75 };
	else if (ln.indexOf('jagod') !== -1 || ln.indexOf('dinj') !== -1)
		conv = { 'standardno voće': 0.67, banana: 0.35, grožđe: 0.5 };
	else {
		const groups = Object.keys(subData);
		let group = null;
		for (let i = 0; i < groups.length; i++) {
			if (subData[groups[i]].items.some((it) => ln.indexOf(it) !== -1)) {
				group = subData[groups[j]];
				break;
			}
		}
		if (group && group.conversions) conv = group.conversions;
	}
	const targets = Object.keys(conv);
	if (targets.length > 0) {
		targets.forEach((t) => {
			const factor = conv[t];
			const finalAmount =
				t.indexOf('kom') !== -1
					? (amount * factor).toFixed(1)
					: Math.round(amount * factor);
			const item = document.createElement('div');
			item.className =
				'bg-white p-2 rounded-lg border border-blue-100 flex flex-col items-center justify-center text-center';
			item.innerHTML = `<span class="text-[10px] text-gray-400 font-bold uppercase">${t}</span><span class="text-sm font-black text-blue-700">${finalAmount}${
				t.indexOf('kom') !== -1 ? '' : 'g'
			}</span>`;
			list.appendChild(item);
		});
		panel.classList.remove('hidden');
		panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
	}
};

window.hideSubPanel = function () {
	document.getElementById('subPanel').classList.add('hidden');
};
window.closeModal = function () {
	document.getElementById('recipeModal').classList.remove('opacity-100');
	setTimeout(() => {
		document.getElementById('recipeModal').classList.add('hidden');
		document.body.style.overflow = 'auto';
	}, 300);
};
window.changeUser = function (user) {
	state.currentUser = user;
	state.selectedDayIdx = 0;
	updateUI();
	renderDaySelector();
	renderMeals();
};
window.changeWeek = function (week) {
	state.currentWeek = week;
	state.selectedDayIdx = 0;
	updateUI();
	renderDaySelector();
	renderMeals();
};

function updateUI() {
	const dj = document.getElementById('btnDjordje');
	const mi = document.getElementById('btnMiljana');
	if (!dj || !mi) return;
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
	if (!w1 || !w2) return;
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

// --- Start ---
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', init);
} else {
	init();
}
