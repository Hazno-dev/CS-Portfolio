import type { CollectionEntry, InferEntrySchema } from 'astro:content';
import { ProjectMedia } from '@components/media/data/ProjectMedia.ts';

declare global {
	export type Project = CollectionEntry<'project'> & ProjectMethods;
}

type ProjectMethods = {
	Media: ProjectMedia;

	getTeamText(): 'Studio' | 'Team';
	getProjectLink(): string | null | undefined;
	getProjectInternalLink(): string | null | undefined;
	isExternal(): boolean;
	isProfessional(): boolean;

	getTeamData(): { name: string; logo?: any; link?: string; start?: Date; end?: Date | null };

	getCover(): any;
	getLogo(): any | undefined;
	getVideos(): { src: string; alt: string; thumbnail?: any }[];
	getImages(): Array<{ src: any; alt: string }>;

	getMedia(filename: string): any;
};

export function asProject(project: CollectionEntry<'project'>, media: CollectionEntry<'media'>): Project {
	const mediaMap = new Map<string, any>([]);
	const visibleImages = new Array<{ src: any; alt: string }>();
	media.data.images.forEach((image) => {
		const lastSlash = image.src.src.lastIndexOf('/');
		const lastDot = image.src.src.lastIndexOf('.');
		const lastQuery = image.src.src.lastIndexOf('?');
		const filename = image.src.src.substring(lastSlash + 1, lastDot);
		const extension = image.src.src.substring(lastDot + 1, lastQuery);
		mediaMap.set(`${filename}.${extension}`, image);

		if (!image.hidden) {
			visibleImages.push(image);
		}
	});
	media.data.videos.forEach((video) => mediaMap.set(video.src, video));

	return {
		...project,
		Media: new ProjectMedia(media.data),

		getTeamText() {
			if (project.data.meta.professional) {
				return 'Studio';
			}

			return 'Team';
		},
		getTeamData() {
			if (project.data.studio) {
				return {
					name: project.data.studio.name,
					logo: project.data.studio.logo,
					link: project.data.studio.link,
					start: project.data.studio.dateStart ?? project.data.dateStart!,
					end: project.data.studio.dateEnd ?? project.data.dateEnd
				};
			}

			return { name: project.data.team! };
		},
		getProjectLink() {
			if (this.isExternal()) {
				return project.data.meta.externalReferral;
			}

			return this.getProjectInternalLink();
		},
		getProjectInternalLink() {
			if (this.isExternal()) {
				return null;
			}

			if (project.data.meta.hasPage ?? true) {
				return `/${project.id}`;
			}

			return null;
		},
		isExternal() {
			return !!project.data.meta.externalReferral;
		},
		isProfessional() {
			return project.data.meta.professional ?? false;
		},
		getCover() {
			return media.data.cover;
		},
		getLogo() {
			return media.data.logo;
		},
		getVideos() {
			return media.data.videos;
		},
		getImages() {
			return visibleImages;
		},
		getMedia(filename: string) {
			return mediaMap.get(filename);
		}
	};
}
