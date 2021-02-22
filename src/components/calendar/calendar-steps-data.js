export const steps = [
	{ 
		section: true, 
		label: 'year', 
		prompt: 'Last two digits of year', 
		expected: '{targetYear} % 100', 
		hint: 'You want the last two digits of {targetYear}' 
	},
	{ 
		label: 'leaps', 
		prompt: 'Last two digits of year, divided by 4 (integer part)', 
		expected: 'parseInt({year}/ 4, 10)', 
		hint: '{parseInt({year}/4,10)*4} divided by 4' 
	},
	{ 
		label: 'base', 
		prompt: 'Base number (sum of above)', 
		primary: true,
		expected: '({year} + {leaps}) % 7', 
		reduce: true, 
		hint: '' 
	},
	{ 
		section: true, 
		label: 'month-offset', 
		prompt: 'Month offset number (From 0 3 3 6 1 4 6 2 5 0 3 5)', 
		expected: 'monthOffsets[{targetMonth} - 1]', 
		reduce: true, 
		hint: 'Use the table for month {targetMonth}.' 
	},
	{ 
		label: 'month-number', 
		prompt: 'Month number (Base number + Month offset)', 
		primary: true,
		expected: '({base} + {month-offset}) % 7', 
		reduce: true,
		hint: 'Base ({base}) + month offset ({month-offset})' 
	},
	{ 
		section: true,
		label: 'date', 
		prompt: 'Date', 
		expected: '{targetDate}', 	
		compare: 'val === expected', 
		hint: 'The date shown up at the top. That would be {targetDate}.' 
	},
	{ 
		label: 'weekday-raw', 
		prompt: 'Sum of Date and Month number', 
		expected: '({month-number} + {date}) % 7', 
		reduce: true, 
		hint: 'Month number ({month-number}) + date ({date}).' 
	},
	{ 
		label: 'weekday', 
		prompt: 'Weekday number', 
		expected: '({month-number} + {date}) % 7', 
		reduce: true, 
		hint: 'Month number ({month-number}) + date ({date}), mod 7.' 
	},
];

