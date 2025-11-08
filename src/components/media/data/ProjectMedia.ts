import type { InferEntrySchema } from 'astro:content';
import { Media, MediaImage, MediaVideo } from '@components/media/data/Media.ts';
import type { integer } from 'vscode-languageserver-types';

export class ProjectMedia {
	private Data: InferEntrySchema<'media'>;
	private Lookup: Map<string, Media> = new Map();
	private VisibleImages: Array<Media> = new Array<Media>();
	private VisibleVideos: Array<Media> = new Array<Media>();

	constructor(data: InferEntrySchema<'media'>) {
		this.Data = data;
		this.GenerateImageMeta();
		this.GenerateVideoMeta();
	}

	public get Images(): Array<Media> {
		return this.VisibleImages;
	}

	public get Videos(): Array<Media> {
		return this.VisibleVideos;
	}

	public FindMediaByCount(videoCount: integer, imageCount: integer, overflow = true): Media[] {
		const result = new Array<Media>();

		if (videoCount > this.VisibleVideos.length && overflow) {
			imageCount = imageCount + (videoCount - this.VisibleVideos.length);
		}

		this.VisibleVideos.forEach((video) => {
			result.push(video);
			if (result.length >= videoCount) {
				return;
			}
		});

		this.VisibleImages.forEach((image) => {
			result.push(image);
			if (result.length >= imageCount) {
				return;
			}
		});

		return result;
	}

	public FindMediaAfterCount(videoCount: integer, imageCount: integer): Media[] {
		const result = new Array<Media>();

		for (let i = videoCount; i < this.VisibleVideos.length; i++) {
			const video = this.VisibleVideos[i];
			result.push(video);
		}

		for (let i = imageCount; i < this.VisibleImages.length; i++) {
			const image = this.VisibleImages[i];
			result.push(image);
		}

		return result;
	}
	public FindMedia(name: string): Media | undefined {
		return this.Lookup.get(name);
	}

	public Find(name: string[]): Media[] {
		const result = new Array<Media>();
		name.forEach((mediaName) => {
			const media = this.FindMedia(mediaName);
			if (media) {
				result.push(media);
			}
		});

		return result;
	}

	public async GetHtml(name: string): Promise<string> {
		const media = this.FindMedia(name);
		if (!media) {
			throw new Error(`Media ${name} not found`);
		}

		return await media.GetHtml();
	}

	private GenerateImageMeta() {
		this.Data.images.forEach((image) => {
			const lastSlash = image.src.src.lastIndexOf('/');
			const lastDot = image.src.src.lastIndexOf('.');
			const lastQuery = image.src.src.lastIndexOf('?');
			const filename = image.src.src.substring(lastSlash + 1, lastDot);
			const extension = image.src.src.substring(lastDot + 1, lastQuery);

			const newImage = new MediaImage(image);
			this.Lookup.set(`${filename}.${extension}`, newImage);

			if (!newImage.IsHidden) {
				this.VisibleImages.push(newImage);
			}
		});
	}

	private GenerateVideoMeta() {
		this.Data.videos.forEach((video) => {
			const newVideo = new MediaVideo(video);
			this.Lookup.set(video.src, newVideo);
			if (!newVideo.IsHidden) {
				this.VisibleVideos.push(newVideo);
			}
		});
	}
}
