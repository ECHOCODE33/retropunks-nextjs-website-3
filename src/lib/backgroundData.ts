// Background data matching Python _BackgroundAssetUltimate.py and Solidity E_Background enum

export const BG_TYPES = {
	None: 0,
	Image: 1,
	Solid: 2,
	S_Vertical: 3,
	P_Vertical: 4,
	S_Horizontal: 5,
	P_Horizontal: 6,
	S_Down: 7, // Smooth Diagonal
	P_Down: 8, // Pixelated Diagonal
	S_Up: 9, // Smooth Reverse Diagonal
	P_Up: 10, // Pixelated Reverse Diagonal
	Radial: 11,
} as const;

export interface BackgroundEntry {
	name: string;
	layerType: number;
	palette: string[];
}

export const BACKGROUNDS: BackgroundEntry[] = [
	{
		name: "Rainbow",
		layerType: BG_TYPES.Image,
		palette: [],
	},
	{
		name: "Standard",
		layerType: BG_TYPES.Solid,
		palette: ["#b5b5b5ff"],
	},
	{
		name: "Smooth_Vertical",
		layerType: BG_TYPES.S_Vertical,
		palette: ["#000000ff", "#ffffffff"],
	},
	{
		name: "Pixelated_Vertical",
		layerType: BG_TYPES.P_Vertical,
		palette: ["#000000ff", "#020202ff", "#070707ff", "#0f0f0fff", "#161616ff", "#1e1e1eff", "#272727ff", "#333333ff", "#404040ff", "#4e4e4eff", "#5e5e5eff", "#6e6e6eff", "#808080ff", "#919191ff", "#a2a2a2ff", "#b3b3b3ff", "#c3c3c3ff", "#d2d2d2ff", "#dfdfdfff", "#eaeaeaff", "#f3f3f3ff", "#fafafaff", "#fefefeff", "#ffffffff"],
	},
	{
		name: "Smooth_Vertical_Inverse",
		layerType: BG_TYPES.S_Vertical,
		palette: ["#ffffffff", "#000000ff"],
	},
	{
		name: "Pixelated_Vertical_Inverse",
		layerType: BG_TYPES.P_Vertical,
		palette: ["#ffffffff", "#fefefeff", "#fafafaff", "#f3f3f3ff", "#eaeaeaff", "#dfdfdfff", "#d2d2d2ff", "#c3c3c3ff", "#b3b3b3ff", "#a2a2a2ff", "#919191ff", "#808080ff", "#6e6e6eff", "#5e5e5eff", "#4e4e4eff", "#404040ff", "#333333ff", "#272727ff", "#1e1e1eff", "#161616ff", "#0f0f0fff", "#070707ff", "#020202ff", "#000000ff"],
	},
	{
		name: "Smooth_Horizontal",
		layerType: BG_TYPES.S_Horizontal,
		palette: ["#000000ff", "#ffffffff"],
	},
	{
		name: "Pixelated_Horizontal",
		layerType: BG_TYPES.P_Horizontal,
		palette: ["#000000ff", "#020202ff", "#070707ff", "#0f0f0fff", "#161616ff", "#1e1e1eff", "#272727ff", "#333333ff", "#404040ff", "#4e4e4eff", "#5e5e5eff", "#6e6e6eff", "#808080ff", "#919191ff", "#a2a2a2ff", "#b3b3b3ff", "#c3c3c3ff", "#d2d2d2ff", "#dfdfdfff", "#eaeaeaff", "#f3f3f3ff", "#fafafaff", "#fefefeff", "#ffffffff"],
	},
	{
		name: "Smooth_Horizontal_Inverse",
		layerType: BG_TYPES.S_Horizontal,
		palette: ["#ffffffff", "#000000ff"],
	},
	{
		name: "Pixelated_Horizontal_Inverse",
		layerType: BG_TYPES.P_Horizontal,
		palette: ["#ffffffff", "#fefefeff", "#fafafaff", "#f3f3f3ff", "#eaeaeaff", "#dfdfdfff", "#d2d2d2ff", "#c3c3c3ff", "#b3b3b3ff", "#a2a2a2ff", "#919191ff", "#808080ff", "#6e6e6eff", "#5e5e5eff", "#4e4e4eff", "#404040ff", "#333333ff", "#272727ff", "#1e1e1eff", "#161616ff", "#0f0f0fff", "#070707ff", "#020202ff", "#000000ff"],
	},
	{
		name: "Smooth_Diagonal",
		layerType: BG_TYPES.S_Down,
		palette: ["#000000ff", "#ffffffff"],
	},
	{
		name: "Pixelated_Diagonal",
		layerType: BG_TYPES.P_Down,
		palette: ["#000000ff", "#020202ff", "#070707ff", "#0f0f0fff", "#161616ff", "#1e1e1eff", "#272727ff", "#333333ff", "#404040ff", "#4e4e4eff", "#5e5e5eff", "#6e6e6eff", "#808080ff", "#919191ff", "#a2a2a2ff", "#b3b3b3ff", "#c3c3c3ff", "#d2d2d2ff", "#dfdfdfff", "#eaeaeaff", "#f3f3f3ff", "#fafafaff", "#fefefeff", "#ffffffff"],
	},
	{
		name: "Smooth_Diagonal_Inverse",
		layerType: BG_TYPES.S_Down,
		palette: ["#ffffffff", "#000000ff"],
	},
	{
		name: "Pixelated_Diagonal_Inverse",
		layerType: BG_TYPES.P_Down,
		palette: ["#ffffffff", "#fefefeff", "#fafafaff", "#f3f3f3ff", "#eaeaeaff", "#dfdfdfff", "#d2d2d2ff", "#c3c3c3ff", "#b3b3b3ff", "#a2a2a2ff", "#919191ff", "#808080ff", "#6e6e6eff", "#5e5e5eff", "#4e4e4eff", "#404040ff", "#333333ff", "#272727ff", "#1e1e1eff", "#161616ff", "#0f0f0fff", "#070707ff", "#020202ff", "#000000ff"],
	},
	{
		name: "Smooth_Reverse_Diagonal",
		layerType: BG_TYPES.S_Up,
		palette: ["#000000ff", "#ffffffff"],
	},
	{
		name: "Pixelated_Reverse_Diagonal",
		layerType: BG_TYPES.P_Up,
		palette: ["#000000ff", "#020202ff", "#070707ff", "#0f0f0fff", "#161616ff", "#1e1e1eff", "#272727ff", "#333333ff", "#404040ff", "#4e4e4eff", "#5e5e5eff", "#6e6e6eff", "#808080ff", "#919191ff", "#a2a2a2ff", "#b3b3b3ff", "#c3c3c3ff", "#d2d2d2ff", "#dfdfdfff", "#eaeaeaff", "#f3f3f3ff", "#fafafaff", "#fefefeff", "#ffffffff"],
	},
	{
		name: "Smooth_Reverse_Diagonal_Inverse",
		layerType: BG_TYPES.S_Up,
		palette: ["#ffffffff", "#000000ff"],
	},
	{
		name: "Pixelated_Reverse_Diagonal_Inverse",
		layerType: BG_TYPES.P_Up,
		palette: ["#ffffffff", "#fefefeff", "#fafafaff", "#f3f3f3ff", "#eaeaeaff", "#dfdfdfff", "#d2d2d2ff", "#c3c3c3ff", "#b3b3b3ff", "#a2a2a2ff", "#919191ff", "#808080ff", "#6e6e6eff", "#5e5e5eff", "#4e4e4eff", "#404040ff", "#333333ff", "#272727ff", "#1e1e1eff", "#161616ff", "#0f0f0fff", "#070707ff", "#020202ff", "#000000ff"],
	},
	{
		name: "Radial",
		layerType: BG_TYPES.Radial,
		palette: ["#000000ff", "#020202ff", "#070707ff", "#0f0f0fff", "#161616ff", "#1e1e1eff", "#272727ff", "#333333ff", "#404040ff", "#4e4e4eff", "#5e5e5eff", "#6e6e6eff", "#808080ff", "#919191ff", "#a2a2a2ff", "#b3b3b3ff", "#c3c3c3ff", "#d2d2d2ff", "#dfdfdfff", "#eaeaeaff", "#f3f3f3ff", "#fafafaff", "#fefefeff", "#ffffffff"],
	},
];

export function getGradientCoords(layerType: number): { x1: string; y1: string; x2: string; y2: string } {
	switch (layerType) {
		// Vertical
		case BG_TYPES.S_Vertical:
		case BG_TYPES.P_Vertical:
			return { x1: "0", y1: "0", x2: "0", y2: "1" };

		// Horizontal
		case BG_TYPES.S_Horizontal:
		case BG_TYPES.P_Horizontal:
			return { x1: "0", y1: "0", x2: "1", y2: "0" };

		// Diagonal down-right (top-left → bottom-right)
		case BG_TYPES.S_Down:
		case BG_TYPES.P_Down:
			return { x1: "0", y1: "0", x2: "1", y2: "1" };

		// Reverse diagonal = up-right (bottom-left → top-right)
		case BG_TYPES.S_Up:
		case BG_TYPES.P_Up:
			return { x1: "0", y1: "1", x2: "1", y2: "0" };

		default:
			return { x1: "0", y1: "0", x2: "0", y2: "1" };
	}
}

export function normalizeColor(col: string | number): string {
	if (typeof col === "number") {
		const hex = (col >>> 0).toString(16).padStart(8, "0");
		return "#" + hex.toLowerCase();
	}
	if (typeof col === "string") {
		let s = col.trim();
		if (!s.startsWith("#")) s = "#" + s;
		let body = s.slice(1);
		if (body.length === 6) body = body + "ff";
		if (body.length === 8) return "#" + body.toLowerCase();
		return s.toLowerCase();
	}
	return "#000000ff";
}
