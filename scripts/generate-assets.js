import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { optimize } from 'svgo';

const projectRoot = process.cwd();
const assetsDir = path.join(projectRoot, 'src', 'assets');

// Source SVG filenames to process
const sources = ['logo.svg', 'shield-logo.svg'];

const pngSizes = [32, 64, 180, 192, 512];

async function ensureDir(dir) {
	try {
		await fs.mkdir(dir, { recursive: true });
	} catch (err) {
		// ignore
	}
}

async function optimizeSvg(content) {
	const result = optimize(content, {
		multipass: true,
		floatPrecision: 2,
	});
	if (result.error) throw new Error(result.error);
	return result.data;
}

async function processFile(filename) {
	const srcPath = path.join(assetsDir, filename);
	const base = path.parse(filename).name; // e.g., logo
	const outPrefix = path.join(assetsDir, 'optimized');
	await ensureDir(outPrefix);

	console.log(`Processing ${filename}...`);

	const svgContent = await fs.readFile(srcPath, 'utf8');
	const optimizedSvg = await optimizeSvg(svgContent);

	// Write optimized SVG (overwrite original optimized copy)
	const optimizedSvgPath = path.join(outPrefix, `${base}.svg`);
	await fs.writeFile(optimizedSvgPath, optimizedSvg, 'utf8');
	console.log(
		`  - optimized svg -> ${path.relative(projectRoot, optimizedSvgPath)}`
	);

	// Use sharp to render PNG/WebP while preserving aspect ratio (fixed width)
	const svgBuffer = Buffer.from(optimizedSvg);

	const widthSizes = [64, 180, 192, 512];
	const squareFavSizes = [32, 180]; // generate square favicons for shield/logo icon

	for (const size of widthSizes) {
		const pngPath = path.join(outPrefix, `${base}-${size}.png`);
		const webpPath = path.join(outPrefix, `${base}-${size}.webp`);

		await sharp(svgBuffer)
			.resize({ width: size, withoutEnlargement: true })
			.png({ quality: 90 })
			.toFile(pngPath);

		await sharp(svgBuffer)
			.resize({ width: size, withoutEnlargement: true })
			.webp({ quality: 90 })
			.toFile(webpPath);

		console.log(
			`  - ${size}px (width) -> ${path.relative(
				projectRoot,
				pngPath
			)}, ${path.relative(projectRoot, webpPath)}`
		);
	}

	// For icons (favicons / apple-touch) generate square images for shield/logo specifically
	if (base.includes('shield') || base.includes('logo')) {
		for (const s of squareFavSizes) {
			const squarePng = path.join(outPrefix, `${base}-${s}.png`);
			const squareWebp = path.join(outPrefix, `${base}-${s}.webp`);

			await sharp(svgBuffer)
				.resize(s, s, {
					fit: 'contain',
					background: { r: 0, g: 0, b: 0, alpha: 0 },
				})
				.png({ quality: 90 })
				.toFile(squarePng);

			await sharp(svgBuffer)
				.resize(s, s, {
					fit: 'contain',
					background: { r: 0, g: 0, b: 0, alpha: 0 },
				})
				.webp({ quality: 90 })
				.toFile(squareWebp);

			console.log(
				`  - ${s}px (square) -> ${path.relative(
					projectRoot,
					squarePng
				)}, ${path.relative(projectRoot, squareWebp)}`
			);
		}
	}
}

(async () => {
	try {
		console.log('Generating optimized assets...');
		for (const file of sources) {
			const filePath = path.join(assetsDir, file);
			try {
				await fs.access(filePath);
				await processFile(file);
			} catch (err) {
				console.warn(`Skipping ${file} (not found in ${assetsDir}).`);
			}
		}
		console.log('Done. Optimized assets are in src/assets/optimized/');
	} catch (err) {
		console.error('Error generating assets:', err);
		process.exit(1);
	}
})();
