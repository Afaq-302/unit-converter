export const categories = [
  {
    id: 'length',
    name: 'Length',
    icon: 'Ruler',
    units: [
      { id: 'meter', name: 'Meter', abbr: 'm', toBase: 1, fromBase: 1 },
      { id: 'kilometer', name: 'Kilometer', abbr: 'km', toBase: 1000, fromBase: 0.001 },
      { id: 'centimeter', name: 'Centimeter', abbr: 'cm', toBase: 0.01, fromBase: 100 },
      { id: 'millimeter', name: 'Millimeter', abbr: 'mm', toBase: 0.001, fromBase: 1000 },
      { id: 'mile', name: 'Mile', abbr: 'mi', toBase: 1609.344, fromBase: 1 / 1609.344 },
      { id: 'yard', name: 'Yard', abbr: 'yd', toBase: 0.9144, fromBase: 1 / 0.9144 },
      { id: 'foot', name: 'Foot', abbr: 'ft', toBase: 0.3048, fromBase: 1 / 0.3048 },
      { id: 'inch', name: 'Inch', abbr: 'in', toBase: 0.0254, fromBase: 1 / 0.0254 },
    ],
  },
  {
    id: 'weight',
    name: 'Weight',
    icon: 'Scale',
    units: [
      { id: 'kilogram', name: 'Kilogram', abbr: 'kg', toBase: 1, fromBase: 1 },
      { id: 'gram', name: 'Gram', abbr: 'g', toBase: 0.001, fromBase: 1000 },
      { id: 'milligram', name: 'Milligram', abbr: 'mg', toBase: 0.000001, fromBase: 1000000 },
      { id: 'pound', name: 'Pound', abbr: 'lb', toBase: 0.453592, fromBase: 1 / 0.453592 },
      { id: 'ounce', name: 'Ounce', abbr: 'oz', toBase: 0.0283495, fromBase: 1 / 0.0283495 },
      { id: 'ton', name: 'Metric Ton', abbr: 't', toBase: 1000, fromBase: 0.001 },
      { id: 'stone', name: 'Stone', abbr: 'st', toBase: 6.35029, fromBase: 1 / 6.35029 },
    ],
  },
  {
    id: 'temperature',
    name: 'Temperature',
    icon: 'Thermometer',
    units: [
      { 
        id: 'celsius', 
        name: 'Celsius', 
        abbr: '°C', 
        toBase: (v) => v, 
        fromBase: (v) => v 
      },
      { 
        id: 'fahrenheit', 
        name: 'Fahrenheit', 
        abbr: '°F', 
        toBase: (v) => (v - 32) * 5 / 9, 
        fromBase: (v) => v * 9 / 5 + 32 
      },
      { 
        id: 'kelvin', 
        name: 'Kelvin', 
        abbr: 'K', 
        toBase: (v) => v - 273.15, 
        fromBase: (v) => v + 273.15 
      },
    ],
  },
  {
    id: 'area',
    name: 'Area',
    icon: 'Square',
    units: [
      { id: 'sqmeter', name: 'Square Meter', abbr: 'm²', toBase: 1, fromBase: 1 },
      { id: 'sqkilometer', name: 'Square Kilometer', abbr: 'km²', toBase: 1000000, fromBase: 0.000001 },
      { id: 'sqcentimeter', name: 'Square Centimeter', abbr: 'cm²', toBase: 0.0001, fromBase: 10000 },
      { id: 'hectare', name: 'Hectare', abbr: 'ha', toBase: 10000, fromBase: 0.0001 },
      { id: 'acre', name: 'Acre', abbr: 'ac', toBase: 4046.86, fromBase: 1 / 4046.86 },
      { id: 'sqmile', name: 'Square Mile', abbr: 'mi²', toBase: 2589988.11, fromBase: 1 / 2589988.11 },
      { id: 'sqfoot', name: 'Square Foot', abbr: 'ft²', toBase: 0.092903, fromBase: 1 / 0.092903 },
    ],
  },
  {
    id: 'volume',
    name: 'Volume',
    icon: 'Box',
    units: [
      { id: 'liter', name: 'Liter', abbr: 'L', toBase: 1, fromBase: 1 },
      { id: 'milliliter', name: 'Milliliter', abbr: 'mL', toBase: 0.001, fromBase: 1000 },
      { id: 'cubicmeter', name: 'Cubic Meter', abbr: 'm³', toBase: 1000, fromBase: 0.001 },
      { id: 'gallon', name: 'Gallon (US)', abbr: 'gal', toBase: 3.78541, fromBase: 1 / 3.78541 },
      { id: 'quart', name: 'Quart (US)', abbr: 'qt', toBase: 0.946353, fromBase: 1 / 0.946353 },
      { id: 'pint', name: 'Pint (US)', abbr: 'pt', toBase: 0.473176, fromBase: 1 / 0.473176 },
      { id: 'cup', name: 'Cup (US)', abbr: 'cup', toBase: 0.236588, fromBase: 1 / 0.236588 },
      { id: 'floz', name: 'Fluid Ounce (US)', abbr: 'fl oz', toBase: 0.0295735, fromBase: 1 / 0.0295735 },
    ],
  },
  {
    id: 'speed',
    name: 'Speed',
    icon: 'Gauge',
    units: [
      { id: 'mps', name: 'Meters per Second', abbr: 'm/s', toBase: 1, fromBase: 1 },
      { id: 'kmh', name: 'Kilometers per Hour', abbr: 'km/h', toBase: 1 / 3.6, fromBase: 3.6 },
      { id: 'mph', name: 'Miles per Hour', abbr: 'mph', toBase: 0.44704, fromBase: 1 / 0.44704 },
      { id: 'knot', name: 'Knot', abbr: 'kn', toBase: 0.514444, fromBase: 1 / 0.514444 },
      { id: 'fps', name: 'Feet per Second', abbr: 'ft/s', toBase: 0.3048, fromBase: 1 / 0.3048 },
    ],
  },
  {
    id: 'time',
    name: 'Time',
    icon: 'Clock',
    units: [
      { id: 'second', name: 'Second', abbr: 's', toBase: 1, fromBase: 1 },
      { id: 'millisecond', name: 'Millisecond', abbr: 'ms', toBase: 0.001, fromBase: 1000 },
      { id: 'minute', name: 'Minute', abbr: 'min', toBase: 60, fromBase: 1 / 60 },
      { id: 'hour', name: 'Hour', abbr: 'h', toBase: 3600, fromBase: 1 / 3600 },
      { id: 'day', name: 'Day', abbr: 'd', toBase: 86400, fromBase: 1 / 86400 },
      { id: 'week', name: 'Week', abbr: 'wk', toBase: 604800, fromBase: 1 / 604800 },
      { id: 'month', name: 'Month (30 days)', abbr: 'mo', toBase: 2592000, fromBase: 1 / 2592000 },
      { id: 'year', name: 'Year (365 days)', abbr: 'yr', toBase: 31536000, fromBase: 1 / 31536000 },
    ],
  },
  {
    id: 'data',
    name: 'Data',
    icon: 'HardDrive',
    units: [
      { id: 'byte', name: 'Byte', abbr: 'B', toBase: 1, fromBase: 1 },
      { id: 'kilobyte', name: 'Kilobyte', abbr: 'KB', toBase: 1024, fromBase: 1 / 1024 },
      { id: 'megabyte', name: 'Megabyte', abbr: 'MB', toBase: 1048576, fromBase: 1 / 1048576 },
      { id: 'gigabyte', name: 'Gigabyte', abbr: 'GB', toBase: 1073741824, fromBase: 1 / 1073741824 },
      { id: 'terabyte', name: 'Terabyte', abbr: 'TB', toBase: 1099511627776, fromBase: 1 / 1099511627776 },
      { id: 'bit', name: 'Bit', abbr: 'bit', toBase: 0.125, fromBase: 8 },
      { id: 'kilobit', name: 'Kilobit', abbr: 'Kbit', toBase: 128, fromBase: 1 / 128 },
      { id: 'megabit', name: 'Megabit', abbr: 'Mbit', toBase: 131072, fromBase: 1 / 131072 },
    ],
  },
  {
    id: 'pressure',
    name: 'Pressure',
    icon: 'Activity',
    units: [
      { id: 'pascal', name: 'Pascal', abbr: 'Pa', toBase: 1, fromBase: 1 },
      { id: 'kilopascal', name: 'Kilopascal', abbr: 'kPa', toBase: 1000, fromBase: 0.001 },
      { id: 'bar', name: 'Bar', abbr: 'bar', toBase: 100000, fromBase: 0.00001 },
      { id: 'psi', name: 'PSI', abbr: 'psi', toBase: 6894.76, fromBase: 1 / 6894.76 },
      { id: 'atm', name: 'Atmosphere', abbr: 'atm', toBase: 101325, fromBase: 1 / 101325 },
      { id: 'mmhg', name: 'mmHg', abbr: 'mmHg', toBase: 133.322, fromBase: 1 / 133.322 },
    ],
  },
  {
    id: 'energy',
    name: 'Energy',
    icon: 'Zap',
    units: [
      { id: 'joule', name: 'Joule', abbr: 'J', toBase: 1, fromBase: 1 },
      { id: 'kilojoule', name: 'Kilojoule', abbr: 'kJ', toBase: 1000, fromBase: 0.001 },
      { id: 'calorie', name: 'Calorie', abbr: 'cal', toBase: 4.184, fromBase: 1 / 4.184 },
      { id: 'kilocalorie', name: 'Kilocalorie', abbr: 'kcal', toBase: 4184, fromBase: 1 / 4184 },
      { id: 'watthour', name: 'Watt Hour', abbr: 'Wh', toBase: 3600, fromBase: 1 / 3600 },
      { id: 'kilowatthour', name: 'Kilowatt Hour', abbr: 'kWh', toBase: 3600000, fromBase: 1 / 3600000 },
      { id: 'electronvolt', name: 'Electron Volt', abbr: 'eV', toBase: 1.60218e-19, fromBase: 1 / 1.60218e-19 },
      { id: 'btu', name: 'BTU', abbr: 'BTU', toBase: 1055.06, fromBase: 1 / 1055.06 },
    ],
  },
];

export const getCategory = (id) => {
  return categories.find(c => c.id === id);
};

export const getUnit = (categoryId, unitId) => {
  const category = getCategory(categoryId);
  return category?.units.find(u => u.id === unitId);
};

export const convert = (
  value,
  categoryId,
  fromUnitId,
  toUnitId
) => {
  const fromUnit = getUnit(categoryId, fromUnitId);
  const toUnit = getUnit(categoryId, toUnitId);
  
  if (!fromUnit || !toUnit) return 0;
  
  // Convert to base unit
  let baseValue;
  if (typeof fromUnit.toBase === 'function') {
    baseValue = fromUnit.toBase(value);
  } else {
    baseValue = value * fromUnit.toBase;
  }
  
  // Convert from base unit to target
  if (typeof toUnit.fromBase === 'function') {
    return toUnit.fromBase(baseValue);
  } else {
    return baseValue * toUnit.fromBase;
  }
};

export const defaultPresets = [
  { id: '1', label: 'km ↔ mi', category: 'length', fromUnit: 'kilometer', toUnit: 'mile' },
  { id: '2', label: 'kg ↔ lb', category: 'weight', fromUnit: 'kilogram', toUnit: 'pound' },
  { id: '3', label: '°C ↔ °F', category: 'temperature', fromUnit: 'celsius', toUnit: 'fahrenheit' },
  { id: '4', label: 'MB ↔ GB', category: 'data', fromUnit: 'megabyte', toUnit: 'gigabyte' },
  { id: '5', label: 'L ↔ gal', category: 'volume', fromUnit: 'liter', toUnit: 'gallon' },
  { id: '6', label: 'm ↔ ft', category: 'length', fromUnit: 'meter', toUnit: 'foot' },
  { id: '7', label: 'km/h ↔ mph', category: 'speed', fromUnit: 'kmh', toUnit: 'mph' },
  { id: '8', label: 'kcal ↔ kJ', category: 'energy', fromUnit: 'kilocalorie', toUnit: 'kilojoule' },
];
