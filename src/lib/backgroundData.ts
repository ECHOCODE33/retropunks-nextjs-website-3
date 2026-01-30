// src/lib/backgroundData.ts
// Background definitions matching RetroPunks smart contract and Python generation script

export enum BG_TYPES {
	None = 0,
	Image = 1,
	Solid = 2,
	S_Vertical = 3,
	P_Vertical = 4,
	S_Horizontal = 5,
	P_Horizontal = 6,
	S_Down = 7,
	P_Down = 8,
	S_Up = 9,
	P_Up = 10,
	Radial = 11,
}

export interface BackgroundEntry {
	name: string;
	layerType: BG_TYPES;
	palette: string[];
}

// Gradient coordinates helper
export function getGradientCoords(layerType: BG_TYPES): {
	x1: string;
	y1: string;
	x2: string;
	y2: string;
} {
	switch (layerType) {
		case BG_TYPES.S_Vertical:
		case BG_TYPES.P_Vertical:
			return { x1: "0", y1: "0", x2: "0", y2: "1" }; // Top to bottom
		case BG_TYPES.S_Horizontal:
		case BG_TYPES.P_Horizontal:
			return { x1: "0", y1: "0", x2: "1", y2: "0" }; // Left to right
		case BG_TYPES.S_Down:
		case BG_TYPES.P_Down:
			return { x1: "0", y1: "0", x2: "1", y2: "1" }; // Diagonal (top-left to bottom-right)
		case BG_TYPES.S_Up:
		case BG_TYPES.P_Up:
			return { x1: "0", y1: "1", x2: "1", y2: "0" }; // Reverse diagonal (bottom-left to top-right)
		default:
			return { x1: "0", y1: "0", x2: "0", y2: "1" };
	}
}

// All 19 backgrounds matching E_Background enum in smart contract
// Colors extracted from _BackgroundAssetUltimate.py
export const BACKGROUNDS: BackgroundEntry[] = [
	// 0: Rainbow
	{
		name: "Rainbow",
		layerType: BG_TYPES.S_Down,
		palette: [
			"#ff0000ff", // Red
			"#ff7f00ff", // Orange
			"#ffff00ff", // Yellow
			"#00ff00ff", // Green
			"#0000ffff", // Blue
			"#4b0082ff", // Indigo
			"#9400d3ff", // Violet
		],
	},
	// 1: Standard
	{
		name: "Standard",
		layerType: BG_TYPES.Solid,
		palette: ["#638596ff"],
	},
	// 2: Smooth_Vertical
	{
		name: "Smooth_Vertical",
		layerType: BG_TYPES.S_Vertical,
		palette: ["#7a324cff", "#c1839fff"],
	},
	// 3: Pixelated_Vertical
	{
		name: "Pixelated_Vertical",
		layerType: BG_TYPES.P_Vertical,
		palette: ["#7a324cff", "#803851ff", "#883f5aff", "#904561ff", "#9a4e6aff", "#a35673ff", "#ad5f7dff", "#b56685ff", "#b96e8cff", "#bb7491ff", "#be7d99ff", "#c1839fff", "#c489a5ff", "#c58facff", "#c796b3ff", "#c99cbaff", "#cba2c0ff", "#cda8c7ff", "#cfaecdff", "#d0b4d3ff", "#d2b9d9ff", "#d3bfdfff", "#d5c5e5ff", "#d6cbebff"],
	},
	// 4: Smooth_Vertical_Inverse
	{
		name: "Smooth_Vertical_Inverse",
		layerType: BG_TYPES.S_Vertical,
		palette: ["#c1839fff", "#7a324cff"],
	},
	// 5: Pixelated_Vertical_Inverse
	{
		name: "Pixelated_Vertical_Inverse",
		layerType: BG_TYPES.P_Vertical,
		palette: ["#d6cbebff", "#d5c5e5ff", "#d3bfdfff", "#d2b9d9ff", "#d0b4d3ff", "#cfaecdff", "#cda8c7ff", "#cba2c0ff", "#c99cbaff", "#c796b3ff", "#c58facff", "#c489a5ff", "#c1839fff", "#be7d99ff", "#bb7491ff", "#b96e8cff", "#b56685ff", "#ad5f7dff", "#a35673ff", "#9a4e6aff", "#904561ff", "#883f5aff", "#803851ff", "#7a324cff"],
	},
	// 6: Smooth_Horizontal
	{
		name: "Smooth_Horizontal",
		layerType: BG_TYPES.S_Horizontal,
		palette: ["#7a324cff", "#c1839fff"],
	},
	// 7: Pixelated_Horizontal
	{
		name: "Pixelated_Horizontal",
		layerType: BG_TYPES.P_Horizontal,
		palette: ["#7a324cff", "#803851ff", "#883f5aff", "#904561ff", "#9a4e6aff", "#a35673ff", "#ad5f7dff", "#b56685ff", "#b96e8cff", "#bb7491ff", "#be7d99ff", "#c1839fff", "#c489a5ff", "#c58facff", "#c796b3ff", "#c99cbaff", "#cba2c0ff", "#cda8c7ff", "#cfaecdff", "#d0b4d3ff", "#d2b9d9ff", "#d3bfdfff", "#d5c5e5ff", "#d6cbebff"],
	},
	// 8: Smooth_Horizontal_Inverse
	{
		name: "Smooth_Horizontal_Inverse",
		layerType: BG_TYPES.S_Horizontal,
		palette: ["#c1839fff", "#7a324cff"],
	},
	// 9: Pixelated_Horizontal_Inverse
	{
		name: "Pixelated_Horizontal_Inverse",
		layerType: BG_TYPES.P_Horizontal,
		palette: ["#d6cbebff", "#d5c5e5ff", "#d3bfdfff", "#d2b9d9ff", "#d0b4d3ff", "#cfaecdff", "#cda8c7ff", "#cba2c0ff", "#c99cbaff", "#c796b3ff", "#c58facff", "#c489a5ff", "#c1839fff", "#be7d99ff", "#bb7491ff", "#b96e8cff", "#b56685ff", "#ad5f7dff", "#a35673ff", "#9a4e6aff", "#904561ff", "#883f5aff", "#803851ff", "#7a324cff"],
	},
	// 10: Smooth_Diagonal
	{
		name: "Smooth_Diagonal",
		layerType: BG_TYPES.S_Down,
		palette: ["#7a324cff", "#c1839fff"],
	},
	// 11: Pixelated_Diagonal
	{
		name: "Pixelated_Diagonal",
		layerType: BG_TYPES.P_Down,
		palette: ["#7a324cff", "#803851ff", "#883f5aff", "#904561ff", "#9a4e6aff", "#a35673ff", "#ad5f7dff", "#b56685ff", "#b96e8cff", "#bb7491ff", "#be7d99ff", "#c1839fff", "#c489a5ff", "#c58facff", "#c796b3ff", "#c99cbaff", "#cba2c0ff", "#cda8c7ff", "#cfaecdff", "#d0b4d3ff", "#d2b9d9ff", "#d3bfdfff", "#d5c5e5ff", "#d6cbebff"],
	},
	// 12: Smooth_Diagonal_Inverse
	{
		name: "Smooth_Diagonal_Inverse",
		layerType: BG_TYPES.S_Down,
		palette: ["#c1839fff", "#7a324cff"],
	},
	// 13: Pixelated_Diagonal_Inverse
	{
		name: "Pixelated_Diagonal_Inverse",
		layerType: BG_TYPES.P_Down,
		palette: ["#d6cbebff", "#d5c5e5ff", "#d3bfdfff", "#d2b9d9ff", "#d0b4d3ff", "#cfaecdff", "#cda8c7ff", "#cba2c0ff", "#c99cbaff", "#c796b3ff", "#c58facff", "#c489a5ff", "#c1839fff", "#be7d99ff", "#bb7491ff", "#b96e8cff", "#b56685ff", "#ad5f7dff", "#a35673ff", "#9a4e6aff", "#904561ff", "#883f5aff", "#803851ff", "#7a324cff"],
	},
	// 14: Smooth_Reverse_Diagonal
	{
		name: "Smooth_Reverse_Diagonal",
		layerType: BG_TYPES.S_Up,
		palette: ["#7a324cff", "#c1839fff"],
	},
	// 15: Pixelated_Reverse_Diagonal
	{
		name: "Pixelated_Reverse_Diagonal",
		layerType: BG_TYPES.P_Up,
		palette: ["#7a324cff", "#803851ff", "#883f5aff", "#904561ff", "#9a4e6aff", "#a35673ff", "#ad5f7dff", "#b56685ff", "#b96e8cff", "#bb7491ff", "#be7d99ff", "#c1839fff", "#c489a5ff", "#c58facff", "#c796b3ff", "#c99cbaff", "#cba2c0ff", "#cda8c7ff", "#cfaecdff", "#d0b4d3ff", "#d2b9d9ff", "#d3bfdfff", "#d5c5e5ff", "#d6cbebff"],
	},
	// 16: Smooth_Reverse_Diagonal_Inverse
	{
		name: "Smooth_Reverse_Diagonal_Inverse",
		layerType: BG_TYPES.S_Up,
		palette: ["#c1839fff", "#7a324cff"],
	},
	// 17: Pixelated_Reverse_Diagonal_Inverse
	{
		name: "Pixelated_Reverse_Diagonal_Inverse",
		layerType: BG_TYPES.P_Up,
		palette: ["#d6cbebff", "#d5c5e5ff", "#d3bfdfff", "#d2b9d9ff", "#d0b4d3ff", "#cfaecdff", "#cda8c7ff", "#cba2c0ff", "#c99cbaff", "#c796b3ff", "#c58facff", "#c489a5ff", "#c1839fff", "#be7d99ff", "#bb7491ff", "#b96e8cff", "#b56685ff", "#ad5f7dff", "#a35673ff", "#9a4e6aff", "#904561ff", "#883f5aff", "#803851ff", "#7a324cff"],
	},
	// 18: Radial
	{
		name: "Radial",
		layerType: BG_TYPES.Radial,
		palette: ["#7a324cff", "#803851ff", "#883f5aff", "#904561ff", "#9a4e6aff", "#a35673ff", "#ad5f7dff", "#b56685ff", "#b96e8cff", "#bb7491ff", "#be7d99ff", "#c1839fff", "#c489a5ff", "#c58facff", "#c796b3ff", "#c99cbaff", "#cba2c0ff", "#cda8c7ff", "#cfaecdff", "#d0b4d3ff", "#d2b9d9ff", "#d3bfdfff", "#d5c5e5ff", "#d6cbebff"],
	},
];

// Total number of backgrounds
export const TOTAL_BACKGROUNDS = BACKGROUNDS.length;

// Get background by index
export function getBackground(index: number): BackgroundEntry | null {
	if (index < 0 || index >= BACKGROUNDS.length) return null;
	return BACKGROUNDS[index];
}

// Normalize color format (add alpha if missing)
export function normalizeColor(color: string): string {
	if (color.length === 7) {
		return color + "ff"; // Add full opacity
	}
	return color;
}
