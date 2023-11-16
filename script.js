var elements = {};

window.addEventListener("load", function () {
	elements.ttlGame = document.querySelector("#title-span");
	elements.txtWords = document.querySelector("#res-words");
	elements.btnWrite = document.querySelector("#write-button");
	elements.txtManual = document.querySelector("#manual-words");
	elements.txtWPM = document.querySelector("#automated-words");
	elements.txtDollars = document.querySelector("#res-dollars");
	elements.hdngTool = document.querySelector("#tool-heading");
	elements.btnTypewriter = document.querySelector("#buy-tool");
	elements.emjTool = document.querySelector("#tool-emoji");
	elements.btntxtTypewriter = document.querySelector("#buy-typewriter-text");
	elements.hdngGenre = document.querySelector("#genre-heading");
	elements.txtLevelCounter = document.querySelector("#active-genre-level");
	elements.txtActiveGenreLevel = document.querySelector("#active-genre-level");
	elements.cntnrActiveGenreBar = document.querySelector(
		"#active-genre-bar-container"
	);

	elements.prgrssActiveGenreBar = document.querySelector(
		"#active-genre-bar-progress"
	);
	elements.btnChangeGenre = document.querySelector("#change-genre-button");
	elements.pnlWritersRoom = document.querySelector("#writers-room-container");
	elements.pnlWritersRoomUpgrade = document.querySelector(
		"#writers-room-upgrade-panel"
	);
	elements.txtWritersRoom = document.querySelector("#writers-room-count");
	elements.effectTool = document.querySelector("#effect-tool");
	elements.btnWritersRoom = document.querySelector(
		"#writers-room-upgrade-button"
	);
	elements.txtWritersRoomUpgrade = document.querySelector(
		"#writers-room-upgrade-text"
	);
	elements.txtLogline = document.querySelector("#logline");
	elements.btnLogline = document.querySelector("#sell-logline");
	elements.payLogline = document.querySelector("#pay-logline");
	elements.btntxtLogline = document.querySelector("#sell-logline-text");
	elements.txtSynopsis = document.querySelector("#synopsis-count");
	elements.btnSynopsis = document.querySelector("#sell-synopsis");
	elements.paySynopsis = document.querySelector("#pay-synopsis");
	elements.btntxtSynopsis = document.querySelector("#sell-synopsis-text");
	elements.txtOutline = document.querySelector("#outline-count");
	elements.btnOutline = document.querySelector("#sell-outline");
	elements.payOutline = document.querySelector("#pay-outline");
	elements.btntxtOutline = document.querySelector("#sell-outline-text");
	elements.txtTreatment = document.querySelector("#treatment-count");
	elements.btnTreatment = document.querySelector("#sell-treatment");
	elements.payTreatment = document.querySelector("#pay-treatment");
	elements.btntxtTreatment = document.querySelector("#sell-treatment-text");
	elements.txtScript = document.querySelector("#script-count");
	elements.btnScript = document.querySelector("#sell-script");
	elements.payScript = document.querySelector("#pay-script");
	elements.btntxtScript = document.querySelector("#sell-script-text");
	elements.btnScriptDoctor = document.querySelector("#hire-script-doctor");
	elements.txtScriptDoctor = document.querySelector("#script-doctor");
	elements.btntxtScriptDoctor = document.querySelector(
		"#hire-script-doctor-text"
	);
	elements.txtIntern = document.querySelector("#intern");
	elements.btnIntern = document.querySelector("#hire-intern");
	elements.btntxtIntern = document.querySelector("#hire-intern-text");
	elements.txtJunior = document.querySelector("#junior");
	elements.btnJunior = document.querySelector("#hire-junior");
	elements.btntxtJunior = document.querySelector("#hire-junior-text");
	elements.pnlScreenwriter = document.querySelector("#screenwriter-panel");
	elements.txtScreenwriter = document.querySelector("#screenwriter-count");
	elements.btnScreenwriter = document.querySelector("#hire-screenwriter");
	elements.btntxtScreenwriter = document.querySelector(
		"#hire-screenwriter-text"
	);
	elements.txtCowriters = document.querySelector("#cowriters-count");
	elements.btnCowriters = document.querySelector("#hire-cowriters");
	elements.btntxtCowriters = document.querySelector("#hire-cowriters-text");
	updateWordsText();
	updateDollarsText();
	genreExperience(activeGenre, 0);
	updateProductText("Logline");
	updateProductText("Synopsis");
	updateProductText("Outline");
	updateProductText("Treatment");
	updateProductText("Script");
	updateTypewriterText();
	updateWritersRoomText();
	updateWritersRoomUpgradeText();
	updateButtonStates();
	showCustomPrompt(
		"Congratulations!",
		"You've decided to found your own movie studio! \n You have dreams of one day dominating the box office and raking in the awards, but it all starts here. \n Name your studio to start your journey to Hollywood stardom!",
		"Click Studios",
		function (userInput) {
			if (userInput) {
				// Set the title-span text content here, inside the callback
				document.querySelector("#title-span").textContent = userInput;

				showCustomAlert(
					"First Phase: Writing",
					"Excellent! You've got a long way to go before you release your first movie, so start things at the beginning -- putting pencils to paper! \n Write projects and sell them to other studios until you're writing enough words to pump out some feature-length scripts at " +
						userInput
				);
			}
		}
	);
	gameLoop();
	adjustTitleFontSize();
});

let studioName = "Click Studios";

const SECOND = 1000; // Number of milliseconds in a second
const MINUTE = 60 * SECOND; // Number of milliseconds in a minute
const HOUR = 60 * MINUTE; // Number of milliseconds in an hour

let numWords = 0;
let numDollars = 0;

let wordsPerLoop = 0;

let activeGenre = "Comedy";

const genreLevelCaps = [
	330, 500, 1200, 1400, 30000, 60000, 100000, 230000, 822222,
];

let genreTypes = {
	Comedy: {
		level: 1,
		wordsNeeded: genreLevelCaps[0],
		wordsCurrent: 0,
		emoji: "🤣",
		quality: 1,
	},
	Horror: {
		level: 1,
		wordsNeeded: genreLevelCaps[0],
		wordsCurrent: 0,
		emoji: "😱",
		quality: 1,
	},
	Drama: {
		level: 1,
		wordsNeeded: genreLevelCaps[0],
		wordsCurrent: 0,
		emoji: "🥲",
		quality: 1,
	},
	Action: {
		level: 1,
		wordsNeeded: genreLevelCaps[0],
		wordsCurrent: 0,
		emoji: "😎",
		quality: 1,
	},
};

let uniqueId = 0;

let clickMultiplier = 1;

let typewriters = {
	currency: "dollars",
	cost: 25,
	multiplier: 3,
};

let toolLevel = 0;

let writersRoomCurrentCapacity = 0;

let writersRoomNextCapacity = {
	0: 3,
	3: 6,
	6: 12,
	12: 18,
	18: 24,
};

let writersRoomHeadcount = 0;

let writersRoomUpgradeCost = {
	0: 60,
	3: 200,
	6: 1100,
	12: 3000,
	18: 20000,
};

let products = {
	Logline: {
		count: 0,
		totalcount: 0,
		currency: "words",
		emoji: "💡",
		cost: 20,
		pay: 5,
	},
	Synopsis: {
		count: 0,
		totalcount: 0,
		currency: "words",
		emoji: "💭",
		cost: 120,
		pay: 40,
	},
	Outline: {
		count: 0,
		totalcount: 0,
		currency: "words",
		emoji: "📋",
		cost: 800,
		pay: 220,
	},
	Treatment: {
		count: 0,
		totalcount: 0,
		currency: "words",
		emoji: "🗒️",
		cost: 5000,
		pay: 1200,
	},
	Script: {
		count: 0,
		totalcount: 0,
		currency: "words",
		emoji: "📑",
		cost: 30000,
		pay: 3000,
	},
};

let workerTypes = {
	Intern: {
		count: 0,
		currency: "dollars",
		cost: 25,
		words: 10,
		duration: 30 * SECOND,
		emoji: "🙋",
	},
	Junior: {
		count: 0,
		currency: "dollars",
		cost: 80,
		words: 12,
		duration: 1 * MINUTE,
		emoji: "🧑‍💻",
	},
	Screenwriter: {
		count: 0,
		currency: "dollars",
		cost: 600,
		words: 24,
		duration: 5 * MINUTE,
		emoji: "🧑‍💼",
	},
	Cowriters: {
		count: 0,
		currency: "dollars",
		cost: 2200,
		words: 40,
		duration: 15 * MINUTE,
		emoji: "👥",
	},
	ScriptDoctor: {
		count: 0,
		currency: "dollars",
		cost: 450,
		words: 0,
		duration: 2 * HOUR,
		emoji: "👩‍⚕️",
		effect: 1.4,
	},
};

let workerTimers = {
	Intern: [],
	Junior: [],
	Screenwriter: [],
	Cowriters: [],
};

let wordsToDate = 0;

document
	.querySelector("#write-button")
	.addEventListener("click", function (evt) {
		numWords += clickMultiplier;
		wordsToDate += clickMultiplier;
		updateWordsText();
		//console.log("write button clicked");
	});

document.querySelector("#buy-tool").addEventListener("click", function (evt) {
	numDollars -= typewriters.cost;
	toolLevel++;
	typewriters.cost *= 8;
	clickMultiplier *= typewriters.multiplier;
	updateTypewriterText();
	updateDollarsText();
});

document
	.querySelector("#change-genre-button")
	.addEventListener("click", function (evt) {
		console.log("Change Genre clicked!");
	});

function genreExperience(genre, wordsUsed) {
	let genreObject = genreTypes[genre];
	if (genreObject.level === 10) {
		elements.prgrssActiveGenreBar.style.width = "100%";
		return;
	}
	if (genreObject.level < 10) {
		genreObject.wordsCurrent += wordsUsed;
		var percentWordage =
			100 * (genreObject.wordsCurrent / genreObject.wordsNeeded);
		elements.prgrssActiveGenreBar.style.width = percentWordage + "%";
		console.log(percentWordage + " percent!");
		console.log(
			genreObject.wordsNeeded - genreObject.wordsCurrent + " words left!"
		);

		// If level up
		if (genreObject.wordsCurrent >= genreObject.wordsNeeded) {
			let excessWords = genreObject.wordsCurrent - genreObject.wordsNeeded;
			genreObject.level++;
			genreObject.wordsNeeded =
				genreObject.level < 10 ? genreLevelCaps[genreObject.level - 1] : 0;
			genreObject.wordsCurrent = 0;
			genreExperience(activeGenre, excessWords);
			//updateQuality(genre);
			updateActiveGenreText();
		}
	}
}

function sellProduct(productType) {
	// Access the product object from the products variable
	var product = products[productType];

	// Check if there are enough words to sell this product
	if (numWords < product.cost) return;

	// Perform the transaction
	product.count += 1; // Increment the product count
	numWords -= product.cost; // Deduct the cost from numWords
	genreExperience(activeGenre, product.cost);
	numDollars += product.pay; // Add the pay to numDollars

	/*
	XYZ This is where I'll add in the functionality to fill the activeGenre bar, something like
	genreExperience(genre, product.cost);
	*/

	// Update the UI to reflect the changes
	updateProductText(productType);
	updateWordsText();
	updateDollarsText();
}

document
	.querySelector("#change-genre-button")
	.addEventListener("click", function () {
		showCustomAlert(
			"Change Genres",
			"The ability to switch genres is coming soon. \n You'll start with a choice of comedy, drama, action, or horror and unlock more from there!"
		);
	});

document.querySelector("#sell-logline").addEventListener("click", function () {
	sellProduct("Logline");
});

document.querySelector("#sell-synopsis").addEventListener("click", function () {
	sellProduct("Synopsis");
});

document.querySelector("#sell-outline").addEventListener("click", function () {
	sellProduct("Outline");
});

document
	.querySelector("#sell-treatment")
	.addEventListener("click", function () {
		sellProduct("Treatment");
	});

document.querySelector("#sell-script").addEventListener("click", function () {
	sellProduct("Script");
});

document
	.querySelector("#hire-script-doctor")
	.addEventListener("click", function () {
		hireWorker("ScriptDoctor");
	});

document.querySelector("#hire-intern").addEventListener("click", function () {
	hireWorker("Intern");
});

document.querySelector("#hire-junior").addEventListener("click", function () {
	hireWorker("Junior");
});

document
	.querySelector("#hire-screenwriter")
	.addEventListener("click", function () {
		hireWorker("Screenwriter");
	});

document
	.querySelector("#hire-cowriters")
	.addEventListener("click", function () {
		hireWorker("Cowriters");
	});

document
	.querySelector("#writers-room-upgrade-button")
	.addEventListener("click", function () {
		upgradeWritersRoomCapacity();
	});

document.querySelectorAll(".toggle-header").forEach((header) => {
	header.addEventListener("click", toggleNextSiblingVisibility);
});

function toggleNextSiblingVisibility(event) {
	const infoSection = event.currentTarget.nextElementSibling;
	// Toggle the 'hidden' class which controls the visibility
	infoSection.classList.toggle("hidden");
}

// UTILITY FUNCTIONS
function toggleElementVisibility(elementId) {
	const element = document.getElementById(elementId);
	const computedDisplay = window.getComputedStyle(element).display;

	if (
		computedDisplay === "block" ||
		computedDisplay === "flex" ||
		computedDisplay === ""
	) {
		element.style.display = "none";
	} else {
		element.style.display = "flex";
	}
}

function commas(n) {
	return n.toLocaleString("en-US");
}

function formatDuration(duration) {
	// Convert milliseconds to seconds for display
	var seconds = duration / 1000;
	if (seconds >= 60) {
		return Math.round(seconds / 60) + " mins";
	} else {
		return seconds + " seconds";
	}
}

function adjustTitleFontSize() {
	var container = document.getElementById("game-title");
	var titleSpan = document.getElementById("title-span");
	var maxFontSize = 50; // Set a maximum font size
	var minFontSize = 5; // Set a minimum font size
	var currentFontSize = maxFontSize;

	titleSpan.style.fontSize = currentFontSize + "px";

	// Decrease font size until the title fits
	while (
		titleSpan.offsetWidth > container.offsetWidth &&
		currentFontSize > minFontSize
	) {
		currentFontSize--;
		titleSpan.style.fontSize = currentFontSize + "px";
	}
}

// Call this function when the page loads and whenever the title changes
window.onload = adjustTitleFontSize;

//TEXT UPDATES
function updateWordsText() {
	var wordsShown = Math.ceil(numWords);
	elements.txtWords.textContent = commas(wordsShown);
}

function updateDollarsText() {
	elements.txtDollars.textContent = commas(numDollars);
}

function updateActiveGenreText() {
	elements.prgrssActiveGenreBar.textContent =
		genreTypes[activeGenre].emoji + " " + activeGenre;
	elements.txtLevelCounter.textContent =
		"Level " + genreTypes[activeGenre].level;
}

function upgradeWritersRoomCapacity() {
	if (
		writersRoomCurrentCapacity ==
		writersRoomUpgradeCost[writersRoomUpgradeCost.length - 1]
	) {
		toggleElementVisibility(pnlWritersRoomUpgrade);
	}
	writersRoomCurrentCapacity =
		writersRoomNextCapacity[writersRoomCurrentCapacity];
	updateWritersRoomUpgradeText();
}

function updateWritersRoomUpgradeText() {
	updateWritersRoomText();
	if (writersRoomCurrentCapacity === 0) {
		// When the current capacity is 0, set a specific text to unlock the Writers Room
		elements.txtWritersRoomUpgrade.textContent = "Unlock Writers Room";
		elements.btnWritersRoom.textContent =
			"$" + writersRoomUpgradeCost[writersRoomCurrentCapacity];
	} else if (writersRoomCurrentCapacity < 24) {
		// For other cases, display the capacity upgrade information
		elements.txtWritersRoomUpgrade.textContent =
			"Capacity " +
			writersRoomCurrentCapacity +
			" → " +
			writersRoomNextCapacity[writersRoomCurrentCapacity];
		elements.btnWritersRoom.textContent =
			"$" + writersRoomUpgradeCost[writersRoomCurrentCapacity];
	}
}

function updateTypewriterText() {
	switch (toolLevel) {
		case 0:
			var newWriteIcon = "✍️";
			var nextTool = "Typewriter";
			var nextIcon = "📃";
			break;
		case 1:
			var newWriteIcon = "📃";
			var nextTool = "Word Processor";
			var nextIcon = "⌨️";
			//toggleElementVisibility("synopsis-panel");
			break;
		case 2:
			var newWriteIcon = "⌨️";
			var nextTool = "AI Model";
			var nextIcon = "🤖";
			break;
		case 3:
			var newWriteIcon = "🤖";
			var nextTool = "Supercomputer";
			var nextIcon = "🌐";
			break;
		case 4:
			var newWriteIcon = "🤖";
			var nextTool = "";
			var nextIcon = "";
		default:
			console.log("Unknown tool level");
	}
	elements.btnWrite.textContent = newWriteIcon;
	elements.hdngTool.textContent = nextTool;
	elements.emjTool.textContent = nextIcon;
	if (clickMultiplier == 1) {
		elements.txtManual.textContent =
			commas(clickMultiplier) + " word per click";
	} else {
		elements.txtManual.textContent =
			commas(clickMultiplier) + " words per click";
	}

	elements.btntxtTypewriter.textContent = "$" + commas(typewriters.cost);
	elements.effectTool.textContent =
		"Manual Writing Speed x" + commas(typewriters.multiplier);
	/*toggleElementVisibility("typewriter");*/
}

function updateProductText(productType) {
	// Access the product object from the products variable
	var product = products[productType];
	// Assuming you have a naming convention where the element IDs are prefixed with the product type
	// e.g., elements.txtLogline is for 'Logline', elements.txtSynopsis is for 'Synopsis', etc.
	elements["txt" + productType].textContent = commas(product.count);
	//console.log("txt" + productType + " text updated!");
	elements["btntxt" + productType].textContent =
		"Use " + commas(product.cost) + " words";
	//console.log("btntxt" + productType + " text updated!");
	elements["pay" + productType].textContent =
		"Get paid: $" + commas(product.pay);
	//console.log("pay" + productType + " text updated!");

	// Call a function to update the state of all buttons
	updateButtonStates();
}

function updateWorkerText(workerType) {
	// Access the worker object from the workerTypes variable
	var worker = workerTypes[workerType];

	// Update the UI with the new worker count
	elements[workerType.toLowerCase()].textContent = commas(worker.count);

	// Special handling for 'ScriptDoctor' - update only the hire button text
	if (workerType === "ScriptDoctor") {
		elements["hire-" + workerType.toLowerCase() + "-text"].textContent =
			"Hire for $" + commas(worker.cost);
	} else {
		// Update words per minute and duration text for other worker types
		var durationText = formatDuration(worker.duration);
		var wordsPerSecondText =
			worker.words + " words per second for " + durationText + " 🕓";
		elements[workerType.toLowerCase() + "-wpm"].textContent =
			wordsPerSecondText;

		// Update the button text for hiring
		elements["hire-" + workerType.toLowerCase() + "-text"].textContent =
			"Hire for $" + commas(worker.cost);
	}

	// Call a function to update the state of all buttons
	updateButtonStates();
}

function hireWorker(workerType) {
	var worker = workerTypes[workerType];

	// Check if there are enough dollars to hire this worker
	if (numDollars < worker.cost) return;

	// Check if the writers room is at capacity
	if (writersRoomHeadcount >= writersRoomCurrentCapacity) return;

	// Perform the hiring transaction
	worker.count += 1; // Increment the worker count
	numDollars -= worker.cost; // Deduct the cost from numDollars
	worker.cost = Math.ceil(worker.cost * 1.01); // Increase the cost for the next hire

	// Add the worker emoji to the UI
	addEmoji(workerType);
	writersRoomHeadcount += 1;
	updateWritersRoomText();

	// Update the UI to reflect the changes
	updateDollarsText();
	updateWorkerText(workerType);
}

function updateWorkerText(workerType) {
	// Access the worker object from the workerTypes variable
	var worker = workerTypes[workerType];

	// Update the UI with the new worker count and cost
	elements["txt" + workerType].textContent = commas(worker.count);
	console.log("txt" + workerType + " text updated!");
	elements["btntxt" + workerType].textContent =
		"Hire for $" + commas(worker.cost);
	console.log("btntxt" + workerType + " text updated!");

	// Call a function to update the state of all buttons
	updateButtonStates();
}

function updateWritersRoomText() {
	elements.txtWritersRoom.textContent =
		writersRoomHeadcount + "/" + writersRoomCurrentCapacity;
}

function addEmoji(workerType) {
	uniqueId++; // Increment the identifier for each new emoji
	const currentId = uniqueId; // Capture the current unique ID

	if (!workerTypes[workerType]) {
		console.error("Invalid worker type");
		return; // Early exit if the workerType is not defined
	}

	let emojiSpan = document.createElement("span");
	emojiSpan.innerHTML = workerTypes[workerType].emoji;
	emojiSpan.dataset.id = currentId; // Set a data attribute with the unique identifier
	document.getElementById("emoji-line").appendChild(emojiSpan);

	if (workerType === "ScriptDoctor") {
		return;
	}

	let timerDuration = workerTypes[workerType].duration;
	let timer = setTimeout(() => {
		// Query for the specific emoji with the captured currentId
		let emoji = document.querySelector(
			`#emoji-line > span[data-id='${currentId}']`
		);
		if (emoji) {
			emoji.remove(); // Remove the specific emoji with the matching identifier
			workerTypes[workerType].count -= 1; // Decrement the worker's count
			writersRoomHeadcount -= 1;
			updateWritersRoomText();
			updateWorkerText(workerType);
		}
	}, timerDuration);

	workerTimers[workerType].push(timer); // Track the timer for cleanup or management
}

function updateWPMText(wordsPerLoop) {
	var WPMText = Math.round(wordsPerLoop * 100) / 100;

	elements.txtWPM.textContent = "+" + commas(WPMText) + " words per second";
}

function updateButtonStates() {
	function setButtonState(buttonElement, cost, type, currency) {
		if (currency === "dollars") {
			buttonElement.disabled = numDollars < cost;
		}
		if (type === "worker" || type === "scriptdoctor") {
			if (writersRoomCurrentCapacity === writersRoomHeadcount) {
				buttonElement.disabled = true;
			}
		}
		if (currency === "words") {
			buttonElement.disabled = numWords < cost;
		}
	}

	// Assuming 'elements' is an object containing all your button elements
	// and 'numDollars' and 'numWords' are your available currencies
	const buttons = [
		{
			element: elements.btnTypewriter,
			cost: typewriters.cost,
			type: "tool",
			currency: typewriters.currency,
		},
		{
			element: elements.btnLogline,
			cost: products.Logline.cost,
			type: "product",
			currency: products.Logline.currency,
		},
		{
			element: elements.btnSynopsis,
			cost: products.Synopsis.cost,
			type: "product",
			currency: products.Synopsis.currency,
		},
		{
			element: elements.btnOutline,
			cost: products.Outline.cost,
			type: "product",
			currency: products.Outline.currency,
		},
		{
			element: elements.btnTreatment,
			cost: products.Treatment.cost,
			type: "product",
			currency: products.Treatment.currency,
		},
		{
			element: elements.btnScript,
			cost: products.Script.cost,
			type: "product",
			currency: products.Script.currency,
		},

		{
			element: elements.btnIntern,
			cost: workerTypes.Intern.cost,
			type: "worker",
			currency: "dollars",
		},
		{
			element: elements.btnJunior,
			cost: workerTypes.Junior.cost,
			type: "worker",
			currency: "dollars",
		},
		{
			element: elements.btnScreenwriter,
			cost: workerTypes.Screenwriter.cost,
			type: "worker",
			currency: "dollars",
		},
		{
			element: elements.btnCowriters,
			cost: workerTypes.Cowriters.cost,
			type: "worker",
			currency: "dollars",
		},

		{
			element: elements.btnWritersRoom,
			cost: writersRoomUpgradeCost[writersRoomCurrentCapacity],
			type: "capacity",
			currency: "dollars",
		},

		{
			element: elements.btnScriptDoctor,
			cost: workerTypes.ScriptDoctor.cost,
			type: "scriptdoctor",
			currency: "dollars",
		},
		// Add more button configurations here as needed
	];

	// Iterate over each button configuration and update the button state
	buttons.forEach((buttonConfig) => {
		setButtonState(
			buttonConfig.element,
			buttonConfig.cost,
			buttonConfig.type,
			buttonConfig.currency
		);
	});
}

/* Prevent activation of button from keyboard*/

document.addEventListener(
	"keydown",
	function (event) {
		if (event.code === "Space" || event.code === "Enter") {
			// Check if the focus is on the 'btnWrite' button
			if (document.activeElement === elements.btnWrite) {
				event.preventDefault();
			}
		}
		if (event.code === "KeyM") {
			numDollars += 1000;
			updateDollarsText();
		}
	},
	false
);

function showCustomAlert(heading, body) {
	document.getElementById("alertHeading").innerText = heading;
	document.getElementById("alertBody").innerText = body;
	document.getElementById("customAlert").style.display = "block";

	document.getElementById("alertOkButton").onclick = function () {
		document.getElementById("customAlert").style.display = "none";
	};
}

function showCustomPrompt(heading, body, defaultValue, callback) {
	var promptElement = document.getElementById("customPrompt");
	var inputElement = document.getElementById("promptInput");

	// Set the content for the prompt
	document.getElementById("promptHeading").innerText = heading;
	document.getElementById("promptBody").innerText = body;
	inputElement.value = defaultValue;

	document.getElementById("promptOkButton").onclick = function () {
		callback(inputElement.value);
		promptElement.style.display = "none";
	};

	document.getElementById("promptCancelButton").onclick = function () {
		promptElement.style.display = "none";
		callback(null);
	};

	// Show the prompt
	promptElement.style.display = "block";
}

class EventManager {
	constructor() {
		this.events = [];
		this.initializeEvents();
	}

	initializeEvents() {
		// Example event registrations with an additional 'triggered' property
		this.events.push({
			threshold: () => wordsToDate >= 200,
			// When player has types 200 words total
			action: () => {
				toggleElementVisibility("divD2"),
					showCustomAlert(
						"If You Build It...",
						"This is a lot of work for one person! \n Create a Writers' Room so you can hire some temps to help you churn out more words!"
					);
			},
			// The Writers Room Unlock Button appears
			triggered: false,
		});

		this.events.push({
			threshold: () => genreTypes[activeGenre].level >= 2,
			// When player has leveled up genre to level 2
			action: () =>
				showCustomAlert(
					"Funny how? Funny like a clown?!",
					"You've gotten to Level 2 in Comedy writing! \n Continue to write projects in this genre to level up further, which will make the quality of your Comedy scripts in the future even better!"
				),
			// The Writers Room Unlock Button appears
			triggered: false,
		});

		this.events.push({
			threshold: () => writersRoomCurrentCapacity === 6,
			// When player has hired three interns
			action: () => {
				toggleElementVisibility("script-doctor-panel"),
					showCustomAlert(
						"Expert Hires: Script Doctors",
						"Sometimes you need to call in an expert. \n Unlike other workers, Script Doctors are permanent hires. They do not write words themselves, but instead work with your other writers to boost their output."
					);
			},
			// The Script Doctor Panel appears
			triggered: false,
		});

		this.events.push({
			threshold: () => workerTypes.Intern.count >= 1,
			// When player has hired four interns
			action: () => toggleElementVisibility("automated-words"),
			// The Script Doctor Panel appears
			triggered: false,
		});

		this.events.push({
			threshold: () => workerTypes.Intern.count >= 4,
			// When player has hired four interns
			action: () => {
				toggleElementVisibility("junior-panel"),
					showCustomAlert(
						"Writer Upgrade: Junior Writer",
						"Pay a bit more and hire Junior Writers \n They have a bit more experience and can work for longer!"
					);
			},
			// The Script Doctor Panel appears
			triggered: false,
		});

		this.events.push({
			threshold: () => workerTypes.Junior.count >= 3,
			// When player has hired three Junior writers
			action: () => {
				toggleElementVisibility("screenwriter-panel"),
					showCustomAlert(
						"Writer Upgrade: Screenwriter",
						"Professional screenwriters write longer, and faster! \n Just think of how much they can write with some Script Doctors!"
					);
			},
			// The Screenwriter Panel appears
			triggered: false,
		});

		this.events.push({
			threshold: () => workerTypes.Screenwriter.count >= 3,
			// When player has hired three Junior writers
			action: () => toggleElementVisibility("cowriters-panel"),
			action: () => {
				toggleElementVisibility("cowriters-panel"),
					showCustomAlert(
						"Writer Upgrade: Co-writers",
						"Double the fun! \n Hire a two-person writing team for the synergy of symmetrical synchronicity!"
					);
			},

			// The Screenwriter Panel appears
			triggered: false,
		});

		this.events.push({
			threshold: () => workerTypes.ScriptDoctor.count >= 6,
			// When player has hired six script doctors
			action: () => toggleElementVisibility("script-doctor-panel"),
			// The Script Doctor Panel disappears
			triggered: false,
		});

		this.events.push({
			threshold: () => toolLevel >= 4,
			// When player has fully upgraded tool
			action: () => toggleElementVisibility("tool-box"),
			// The tool box disappears
			triggered: false,
		});

		this.events.push({
			threshold: () => writersRoomCurrentCapacity === 3,
			// When writers room capacity is 3
			action: () => {
				toggleElementVisibility("writers-room-container");
				toggleElementVisibility("hire-people-header");
				toggleElementVisibility("intern-panel");
			},
			// The writers room container appears
			// and the intern panel appears
			triggered: false,
		});

		this.events.push({
			threshold: () => writersRoomCurrentCapacity === 12,
			// When writers room capacity is 12
			action: () =>
				(document.getElementById("writers-room").style.height = "12em"),
			// The room heightens to 12 em
			triggered: false,
		});

		this.events.push({
			threshold: () => writersRoomCurrentCapacity === 18,
			// When writers room capacity is 18
			action: () =>
				(document.getElementById("writers-room").style.height = "18em"),
			// The room heightens to 18 em
			triggered: false,
		});

		this.events.push({
			threshold: () => writersRoomCurrentCapacity > 18,
			// When writers room capacity is over 18
			action: () => {
				document.getElementById("writers-room").style.height = "24em";
			},
			// The room heightens to 24 em
			// the upgrade capcity button is hidden
			triggered: false,
		});

		this.events.push({
			threshold: () => products.Logline.count >= 1,
			// When player has sold 1 Logline
			action: () =>
				showCustomAlert(
					"Cha-ching",
					"You've made your first sale to another studio. \n Your current genre is Comedy, so you've gained some experience from selling a Comedy logline. Writing more Comedy projects increases your level and improves the quality of Comedy scripts."
				),
			// The Prompt Box appears
			triggered: false,
		});

		this.events.push({
			threshold: () => products.Logline.count >= 3,
			// When player has sold 2 Loglines
			action: () => {
				toggleElementVisibility("tool-panel"),
					showCustomAlert(
						"Is The Pen Mightier?",
						"Your hand is starting to cramp... there must be a faster way. \n Now you can upgrade your tools and get more words per click. Try buying a Typewriter and see how much faster you go!"
					);
			},
			// The Tool Box appears
			triggered: false,
		});

		this.events.push({
			threshold: () => products.Logline.count >= 15,
			// When player has sold fifteen Loglines
			action: () => {
				toggleElementVisibility("synopsis-panel"),
					showCustomAlert(
						"Project Upgrade: Synopses",
						"You're writing fast enough to put more than twenty words together. \n Write some synopses with more plot detail to make more money per word!"
					);
			},
			// The Synopsis Panel appears
			triggered: false,
		});

		this.events.push({
			threshold: () => products.Synopsis.count >= 15,
			// When player has sold fifteen Synopses
			action: () => {
				toggleElementVisibility("outline-panel"),
					showCustomAlert(
						"Project Upgrade: Outlines",
						"Think beginning, middle, end; think hero's journey; think structure! \n Make more per word by selling outlines!"
					);
			},
			// The Outline Panel appears
			triggered: false,
		});

		this.events.push({
			threshold: () => products.Outline.count >= 10,
			// When player has sold ten Outlines
			action: () => {
				toggleElementVisibility("treatment-panel"),
					showCustomAlert(
						"Project Upgrade: Script Treatments",
						"A Script Treatment walks the reader through the story and presentation of the movie. \n It may contain snippets of dialogue or character descriptions."
					);
			},
			// The Treatment Panel appears
			triggered: false,
		});

		this.events.push({
			threshold: () => products.Treatment.count >= 10,
			// When player has sold ten Treatments
			action: () => {
				toggleElementVisibility("script-panel"),
					showCustomAlert(
						"Project Upgrade: Feature Length Scripts",
						"You can finally work on full length scripts! \n Draft one good enough to greelight and you can advance to the preproduction phase!"
					);
			},
			// The Script Panel appears
			triggered: false,
		});

		this.events.push({
			threshold: () => products.Script.count >= 1,
			// When player has sold a Script
			action: () =>
				showCustomAlert(
					"Script Completed!",
					"You've done it! You wrote a feature length script (with a little help, of course). \n This is the end of the writing phase, stay tuned for updates with the next phase: Preproduction!"
				),
			// Script Complete
			triggered: false,
		});

		this.events.push({
			threshold: () => writersRoomCurrentCapacity === 24,
			// When writers room capacity reaches the max
			action: () => toggleElementVisibility("writers-room-upgrade-panel"),
			// The upgrade capacity panel disappears
			triggered: false,
		});
		// Add other events here in a similar fashion
	}

	checkThresholds() {
		this.events.forEach((event) => {
			if (!event.triggered && event.threshold()) {
				event.action();
				event.triggered = true; // Mark the event as triggered
			}
		});
	}
}

// Usage remains the same
const eventManager = new EventManager();

function gameLoop() {
	wordsPerLoop = 0;
	//console.log("game looped!");
	for (const [key, worker] of Object.entries(workerTypes)) {
		wordsPerLoop += worker.count * worker.words;
	}
	if (workerTypes.ScriptDoctor.count > 0) {
		wordsPerLoop =
			wordsPerLoop *
			(workerTypes.ScriptDoctor.count * workerTypes.ScriptDoctor.effect);
	}
	wordsToDate += wordsPerLoop / 4;
	updateWPMText(wordsPerLoop);
	numWords += wordsPerLoop / 4; // DIVIDING BY FOUR GIVEN GAMELOOP TIMER OF 250

	updateWordsText();
	updateButtonStates();
	eventManager.checkThresholds();
	console.log(wordsToDate + " words to date!");
	window.setTimeout(gameLoop, 250);
}
