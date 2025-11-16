import { getImage, Picture } from 'astro:assets';
import type { GetImageResult } from 'astro';
import { experimental_AstroContainer } from 'astro/container';
import { Icon } from 'astro-icon/components';
import type { HTMLAttributes } from 'astro/types';

enum MediaType {
	Image,
	Youtube
}

const Container = await experimental_AstroContainer.create();

export abstract class Media {
	protected Source: any;
	protected Thumbnail: any;
	protected Alt: string;
	protected Hidden: boolean;

	protected static Tags = `flex w-fit project-media-element border-secondary-1000/10 bg-primary-300 focus:border-secondary-1000/80
		translate-z-0 transform-none
		cursor-pointer overflow-hidden border-1 transition-[opacity, scale, width, height, color, background-color, border-color, outline-color, fill, stroke, transform, translate] duration-500 ease-out
		backface-hidden motion-reduce:transition-none rounded-md
		hover:border-secondary-1000/80 hover:opacity-100 hover:transform-[scale(1.03)]
		motion-reduce:hover:transform-none focus:opacity-100 focus:transform-[scale(1.03)]
		focus:border-secondary-1000/80 motion-reduce:focus:transform-none peer/media-element aspect-video`;

	protected static ATags = `peer  img-responsive scale-110 object-cover transition duration-500 ease-out backface-hidden hover:scale-[1.0]
									hover:brightness-100 md:brightness-90 aspect-video`;

	public abstract GetType(): MediaType;

	public abstract GetHtml(Params?: HTMLAttributes<'image'>): Promise<any>;

	protected constructor(media: any) {
		this.Source = media.src;
		this.Alt = media.alt;
		this.Hidden = media.hidden ?? false;
		this.Thumbnail = media.thumbnail ?? undefined;
	}

	public get IsHidden(): boolean {
		return this.Hidden;
	}
}

export class MediaImage extends Media {
	private ImageData: GetImageResult | undefined = undefined;

	constructor(media: any) {
		super(media);
	}

	GetType(): MediaType {
		return MediaType.Image;
	}

	async GetHtml(Params?: HTMLAttributes<'image'>): Promise<any> {
		if (this.ImageData == undefined) {
			this.ImageData = await getImage({
				src: this.Source,
				layout: 'constrained'
			});

			if (this.ImageData == undefined) {
				console.error(`Failed to get optimized image: ${this.Source}`);
				return null;
			}
		}

		return `<a 	href=${this.ImageData.src} 
								class='${Media.Tags} ${Params?.class ?? ''}'
								${Params ? Params : ''}> 
			${await Container.renderToString(Picture, {
				props: {
					src: this.Source,
					alt: this.Alt,
					layout: 'constrained',
					class: Media.ATags,
					width: Params?.width ?? 1280,
					height: Params?.height ?? 720
				}
			})}
		</a>`;
	}
}

export class MediaVideo extends Media {
	private ImageData: GetImageResult | undefined = undefined;
	private Extension: string = '';

	protected static IconTags = `opacity-60 md:opacity-50 md:group-hover/project:opacity-60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
					transition-opacity duration-200 ease-in-out pointer-events-none peer-hover:opacity-80!`;

	constructor(media: any, extension: string) {
		super(media);
		this.Extension = extension;
	}

	GetType(): MediaType {
		return MediaType.Youtube;
	}

	async GetHtml(Params?: HTMLAttributes<'image'>): Promise<any> {
		let targetThumbnail: string;
		if (this.Thumbnail == undefined) {
			throw new Error(`Thumbnail is undefined for video: ${this.Source}`);
		}

		targetThumbnail = await Container.renderToString(Picture, {
			props: {
				src: this.Thumbnail,
				alt: this.Alt,
				class: Media.ATags,
				width: Params?.width ?? 1280,
				height: Params?.height ?? 720
			}
		});

		return `<a	data-lg-size="1280-720"
								data-video='{"source": [{"src":"/${this.Source}", "type":"video/${this.Extension}"}], "attributes": {"preload": false, "playsinline": true, "controls": true}}'
								data-poster='${this.Thumbnail.src}'
								data-sub-html="${this.Alt}"
								class='${Media.Tags} ${Params?.class ?? ''}'
								${Params ? Params : ''}> 
			${targetThumbnail}
			${await Container.renderToString(Icon, { props: { name: 'play', title: 'Play', size: '30', class: MediaVideo.IconTags } })}
		</a>`;
	}
}

export class MediaYoutube extends Media {
	private ImageData: GetImageResult | undefined = undefined;

	protected static IconTags = `opacity-60 md:opacity-50 md:group-hover/project:opacity-60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
					transition-opacity duration-200 ease-in-out pointer-events-none peer-hover:opacity-80!`;

	constructor(media: any) {
		super(media);
	}

	GetType(): MediaType {
		return MediaType.Youtube;
	}

	async GetHtml(Params?: HTMLAttributes<'image'>): Promise<any> {
		let targetThumbnail: string;
		if (this.Thumbnail != undefined) {
			targetThumbnail = await Container.renderToString(Picture, {
				props: {
					src: this.Thumbnail,
					alt: this.Alt,
					class: Media.ATags,
					width: Params?.width ?? 1280,
					height: Params?.height ?? 720
				}
			});
		} else {
			targetThumbnail = `<img
				width='${Params?.width ?? '1280'}'
				height='${Params?.height ?? '720'}'
				class='${Media.ATags}'
				src='https://img.youtube.com/vi/${this.Source}/maxresdefault.jpg'
				alt="${this.Alt}"
			/>`;
		}

		return `<a	data-lg-size="1280-720"
								data-src='https://www.youtube.com/embed/${this.Source}?rel=0&autoplay=0\'
								data-poster='https://img.youtube.com/vi/${this.Source}/maxresdefault.jpg\'
								data-sub-html="${this.Alt}"
								class='${Media.Tags} ${Params?.class ?? ''}'
								${Params ? Params : ''}> 
			${targetThumbnail}
			${await Container.renderToString(Icon, { props: { name: 'play', title: 'Play', size: '30', class: MediaYoutube.IconTags } })}
		</a>`;
	}
}
