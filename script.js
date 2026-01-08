let state = {
	currentUser: 'Djordje',
	currentWeek: 1,
	selectedDayIdx: 0,
	modalRootMeal: null,
};

function init() {
	renderDaySelector();
	renderMeals();
	updateUI();
}

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
			const lowerIng = ing.toLowerCase();
			const foundGroup = Object.values(subData).find((g) =>
				g.items.some((i) => lowerIng.includes(i))
			);
			if (
				foundGroup ||
				lowerIng.includes('banan') ||
				lowerIng.includes('prsa') ||
				lowerIng.includes('tuna')
			) {
				return `<span class="sub-badge" onclick="showSubstitutions('${ing.trim()}', ${val})">${match}</span>`;
			}
			return match;
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
	const lowerName = name.toLowerCase();
	title.innerText = `Zamena za: ${amount}g ${name}`;
	list.innerHTML = '';
	let conversions = {};
	if (lowerName.includes('banan'))
		conversions = {
			'jabuka/ananas': 1.8,
			grožđe: 1.45,
			nar: 1.25,
			'jagoda/dinja': 2.7,
		};
	else if (lowerName.includes('tikvic'))
		conversions = {
			krastavac: 1.0,
			paradajz: 1.0,
			paprika: 1.0,
			šampinjoni: 1.0,
			patlidžan: 1.0,
		};
	else if (lowerName.includes('prsa'))
		conversions = {
			'goveđa pršuta': 0.5,
			'mozzarella/feta': 0.6,
			'jaje (kom)': 0.02,
			tuna: 1.0,
		};
	else if (lowerName.includes('tuna'))
		conversions = { 'pileći file': 0.88, oslić: 1.27, losos: 0.75 };
	else if (
		lowerName.includes('jagod') ||
		lowerName.includes('dinj') ||
		lowerName.includes('lubenic')
	)
		conversions = { 'standardno voće': 0.67, banana: 0.35, grožđe: 0.5 };
	else if (subData.fruit.items.some((i) => lowerName.includes(i)))
		conversions = {
			banana: 0.52,
			grožđe: 0.75,
			nar: 0.65,
			'jagoda/dinja': 1.5,
			badem: 0.08,
		};
	else {
		const group = Object.values(subData).find((g) =>
			g.items.some((i) => lowerName.includes(i))
		);
		if (group && group.conversions) conversions = group.conversions;
	}
	if (Object.keys(conversions).length > 0) {
		Object.entries(conversions).forEach(([target, factor]) => {
			const finalAmount = target.includes('kom')
				? (amount * factor).toFixed(1)
				: Math.round(amount * factor);
			const item = document.createElement('div');
			item.className =
				'bg-white p-2 rounded-lg border border-blue-100 flex flex-col items-center justify-center text-center';
			item.innerHTML = `<span class="text-[10px] text-gray-400 font-bold uppercase">${target}</span><span class="text-sm font-black text-blue-700">${finalAmount}${
				target.includes('kom') ? '' : 'g'
			}</span>`;
			list.appendChild(item);
		});
		panel.classList.remove('hidden');
		panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
	}
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
