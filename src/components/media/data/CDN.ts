import type { CollectionEntry } from 'astro:content';

export type MediaProps = {
	Inlined?: boolean;
};

export function GetDimensions(Target: CollectionEntry<'cdnImages' | 'cdnVideos' | 'cdnRaw'>): {
	Width: number;
	Height: number;
} {
	// @ts-ignore
	const dimensions = Target.data.metadata?.dimensions;
	if (!dimensions) {
		return { Width: Target.data.width, Height: Target.data.height };
	}

	switch (dimensions) {
		case 'auto':
			return { Width: Target.data.width, Height: Target.data.height };
		case '16/9':
			return { Width: 1920, Height: 1080 };
		default:
			console.error('Unknown dimension: ' + dimensions);
			return { Width: Target.data.width, Height: Target.data.height };
	}
}
