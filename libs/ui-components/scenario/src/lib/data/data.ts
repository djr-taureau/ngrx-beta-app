const initialIcons = {
	house: {
		label: 'House'
	},
	child: {
		label: 'Child'
	},
	vehicle: {
		label: 'Vehicle'
	},
	vacation: {
		label: 'Vacation'
	},
	toys: {
		label: 'Toys'
	},
	remodelrepair: {
		label: 'Remodel/Repair'
	},
	event: {
		label: 'Event'
	},
	other: {
		label: 'Other'
	},
	debt: {
		label: 'Debt'
	},
	college: {
		label: 'College'
	},
	retirement: {
		label: 'Retirement'
	},
	spending: {
		label: 'Spending'
	},
	giving: {
		label: 'Giving'
	},
	cashinflow: {
		label: 'Cash Inflow'
	},
	sellasset: {
		label: 'Sell Asset'
	},
	nonfinancial: {
		label: 'Non-financial'
	}
};

function hydrateData() {
	Object.keys(initialIcons).forEach(function(key) {
		const dragImage = new Image();
		dragImage.src = `/assets/scenario/icons/${key}-drag.png`;

		initialIcons[key].image = `/assets/scenario/icons/${key}.png`;
		initialIcons[
			key
		].selectedImage = `/assets/scenario/icons/${key}-selected.png`;
		initialIcons[key].dragImage = dragImage;
	});
	return initialIcons;
}
// tslint:disable-next-line:no-unused-expression

export const icons = hydrateData();
