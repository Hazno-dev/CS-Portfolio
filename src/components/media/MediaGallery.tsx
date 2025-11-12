import { LightGallery } from '@components/../../node_modules/astro-lightgallery/src/index.ts';
import type { HTMLAttributes } from 'astro/types';

interface Props extends HTMLAttributes<'image'> {
	counter?: boolean;
}

export default function MediaGallery(props: Props) {
	return (
		<>
			<LightGallery
				options={{
					thumbnail: true,
					animateThumb: false,
					zoomFromOrigin: false,
					allowMediaOverlap: false,
					toggleThumb: true,
					autoplayFirstVideo: false,
					showThumbnailWithPlayButton: true,
					selector: '.project-media-element',
					counter: props.counter ?? true
				}}
				addPlugins={['video']}
				class={'flex ' + (props.class ?? '')}>
				{props.children}
			</LightGallery>
		</>
	);
}
