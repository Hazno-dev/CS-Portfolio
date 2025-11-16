import { type CollectionEntry, getCollection } from 'astro:content';

const cdnImages = await getCollection('cdnImages');
const cdnVideos = await getCollection('cdnVideos');
const cdnRaw = await getCollection('cdnRaw');

const cdnData = [...cdnImages, ...cdnVideos, ...cdnRaw];

const cdnAssets = new Map<string, CollectionEntry<'cdnImages' | 'cdnVideos' | 'cdnRaw'>>();
for (const asset of cdnData) {
	cdnAssets.set(asset.data.display_name ?? asset.id, asset);
	if (!asset.data.display_name) {
		console.warn(`Asset ${asset.id} has no display name`);
	}
}

export default cdnAssets;
