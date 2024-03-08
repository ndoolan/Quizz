interface Props {
    selectedVideo: any;
}

const VideoPlayer = ({ selectedVideo }: Props) => {
    if (!selectedVideo) {
        return <div>Please select a video to play.</div>
    }

    return (
        <div>
            <video controls src={selectedVideo.src} />
            <h1>{selectedVideo.title}</h1>
            <p>{selectedVideo.description}</p>
        </div>
    )
}

export default VideoPlayer; 