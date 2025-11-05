interface MediaProps {
	images: any;
}

export default function MediaCarousel(props: MediaProps) {
	return <aside>{props.images}</aside>;
}
