export type BackgroundType = "solid" | "linear" | "radial" | "image";

export interface BackgroundOption {
	id: number;
	name: string;
	type: BackgroundType;
	value: string; // CSS background property
}

// Converts Python/Solidity hex (0xRRGGBBAA) to CSS hex (#RRGGBBAA)
const toHex = (color: string | number): string => {
	if (typeof color === "string") return color;
	return `#${color.toString(16).padStart(8, "0")}`;
};

// Maps Python coordinates to CSS directions
const getDirection = (id: number): string => {
	const directions: Record<number, string> = {
		3: "to bottom",
		4: "to bottom", // Vertical
		5: "to top",
		6: "to top", // Vertical Inverse
		7: "to right",
		8: "to right", // Horizontal
		9: "to left",
		10: "to left", // Horizontal Inverse
		11: "to bottom right",
		12: "to bottom right", // Diagonal
		13: "to top left",
		14: "to top left", // Diagonal Inverse
		15: "to bottom left",
		16: "to bottom left", // Reverse Diagonal
		17: "to top right",
		18: "to top right", // Reverse Diagonal Inverse
	};
	return directions[id] || "to bottom";
};

const createGradient = (id: number, palette: (string | number)[], pixelated: boolean): string => {
	const colors = palette.map(toHex);
	const dir = getDirection(id);

	if (!pixelated) return `linear-gradient(${dir}, ${colors.join(", ")})`;

	// Hard-stop logic: each color takes an equal % slice to look pixelated
	const step = 100 / colors.length;
	const stops = colors.map((c, i) => `${c} ${i * step}%, ${c} ${(i + 1) * step}%`);
	return `linear-gradient(${dir}, ${stops.join(", ")})`;
};

// The 24-color grayscale palette from your Python script
const grayscalePalette = [0xffffffff, 0xfefefeff, 0xfafafaff, 0xf3f3f3ff, 0xeaeaeaff, 0xdfdfdfff, 0xd2d2d2ff, 0xc3c3c3ff, 0xb3b3b3ff, 0xa2a2a2ff, 0x919191ff, 0x808080ff, 0x6e6e6eff, 0x5e5e5eff, 0x4e4e4eff, 0x404040ff, 0x333333ff, 0x272727ff, 0x1e1e1eff, 0x161616ff, 0x0f0f0fff, 0x070707ff, 0x020202ff, 0x000000ff];

export const BACKGROUND_OPTIONS: BackgroundOption[] = [
	{ id: 1, name: "Rainbow", type: "image", value: "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)" },
	{ id: 2, name: "Solid", type: "solid", value: "#b5b5b5" },

	// Vertical
	{ id: 3, name: "Smooth Vertical", type: "linear", value: createGradient(3, ["#000000", "#ffffff"], false) },
	{ id: 4, name: "Pixelated Vertical", type: "linear", value: createGradient(4, grayscalePalette, true) },
	{ id: 5, name: "Smooth Vertical Inverse", type: "linear", value: createGradient(5, grayscalePalette, false) },
	{ id: 6, name: "Pixelated Vertical Inverse", type: "linear", value: createGradient(6, grayscalePalette, true) },

	// Horizontal
	{ id: 7, name: "Smooth Horizontal", type: "linear", value: createGradient(7, ["#333333", "#cccccc"], false) },
	{ id: 8, name: "Pixelated Horizontal", type: "linear", value: createGradient(8, grayscalePalette, true) },
	{ id: 9, name: "Smooth Horizontal Inverse", type: "linear", value: createGradient(9, ["#333333", "#cccccc"], false) },
	{ id: 10, name: "Pixelated Horizontal Inverse", type: "linear", value: createGradient(10, grayscalePalette, true) },

	// Diagonal
	{ id: 11, name: "Smooth Diagonal", type: "linear", value: createGradient(11, grayscalePalette, false) },
	{ id: 12, name: "Pixel Diagonal", type: "linear", value: createGradient(12, grayscalePalette, true) },
	{ id: 13, name: "Smooth Diagonal Inverse", type: "linear", value: createGradient(13, grayscalePalette, false) },
	{ id: 14, name: "Pixel Diagonal Inverse", type: "linear", value: createGradient(14, grayscalePalette, true) },

	// Reverse Diagonal
	{ id: 15, name: "Smooth Reverse Diagonal", type: "linear", value: createGradient(15, grayscalePalette, false) },
	{ id: 16, name: "Pixel Reverse Diagonal", type: "linear", value: createGradient(16, grayscalePalette, true) },
	{ id: 17, name: "Smooth Reverse Diagonal Inverse", type: "linear", value: createGradient(17, grayscalePalette, false) },
	{ id: 18, name: "Pixel Reverse Diagonal Inverse", type: "linear", value: createGradient(18, grayscalePalette, true) },

	// Radial
	{ id: 19, name: "Radial", type: "radial", value: "radial-gradient(circle, #ffffff, #000000)" },
];
