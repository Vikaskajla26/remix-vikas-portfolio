import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Play, Pause, RefreshCw, AlertCircle } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  videoSources: string[];
}

const FEATURED_VIDEOS: VideoItem[] = [
  {
    id: '1',
    title: 'UGC & EdTech Reel',
    subtitle: 'UGC & EdTech — 9:16',
    videoSources: [
      '/reel1.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      'https://assets.mixkit.co/videos/39767/39767-720.mp4',
    ],
  },
  {
    id: '2',
    title: 'Cinematic Reel Edit',
    subtitle: 'Reel / Short — 9:16',
    videoSources: [
      '/reel2.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      'https://assets.mixkit.co/videos/41530/41530-720.mp4',
    ],
  },
];

interface VideoCardProps {
  video: VideoItem;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [sourceIndex, setSourceIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSource = video.videoSources[sourceIndex] || video.videoSources[0];

  const handleVideoError = useCallback(() => {
    if (sourceIndex < video.videoSources.length - 1) {
      setSourceIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  }, [sourceIndex, video.videoSources]);

  const attemptPlay = useCallback(async () => {
    const el = videoRef.current;
    if (!el || hasError) return;

    el.muted = isMuted;
    try {
      await el.play();
      setIsPlaying(true);
    } catch (err) {
      setIsPlaying(false);
      if (
        err instanceof Error &&
        (err.name === 'NotSupportedError' || err.message.includes('supported sources'))
      ) {
        handleVideoError();
      }
    }
  }, [hasError, isMuted, handleVideoError]);

  useEffect(() => {
    attemptPlay();
  }, [currentSource, attemptPlay]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current || hasError) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      attemptPlay();
    }
  };

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasError(false);
    setSourceIndex(0);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px]">
      <div
        onClick={togglePlay}
        className="relative w-full aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#141414] border border-[#222] shadow-2xl group hover:border-[#646973] transition-all duration-500 hover:scale-[1.02] cursor-pointer"
      >
        {!hasError ? (
          <video
            ref={videoRef}
            key={`${video.id}-${sourceIndex}`}
            src={currentSource}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            onError={handleVideoError}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#181818] text-[#D7E2EA] gap-3">
            <AlertCircle className="w-8 h-8 text-amber-400" />
            <p className="text-xs font-mono uppercase text-[#D7E2EA]/70">
              Video preview unavailable
            </p>
            <button
              onClick={handleRetry}
              className="mt-2 px-3 py-1.5 rounded-full bg-[#222] hover:bg-[#333] text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

        {/* Top Controls Bar */}
        <div className="absolute top-4 right-4 z-20">
          {!hasError && (
            <button
              onClick={toggleMute}
              className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 shadow-lg cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Play/Pause Overlay Button when paused */}
        {!isPlaying && !hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-15 bg-black/40 backdrop-blur-[2px] transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
              <Play className="w-8 h-8 ml-1 fill-white text-white" />
            </div>
            <span className="text-xs text-white/80 font-mono mt-3 uppercase tracking-wider">
              Click to Play
            </span>
          </div>
        )}

        {/* Pause hint on hover when playing */}
        {isPlaying && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center z-15 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
              <Pause className="w-5 h-5 fill-white" />
            </div>
          </div>
        )}

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between z-10 pointer-events-none">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#646973] font-mono block">
              {video.subtitle}
            </span>
            <h4 className="text-lg font-semibold text-[#D7E2EA] mt-0.5 truncate max-w-[240px]">
              {video.title}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MarqueeSection: React.FC = () => {
  return (
    <section className="bg-[#0C0C0C] py-16 sm:py-24 md:py-32 px-4 w-full select-none">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-xs uppercase tracking-widest text-[#646973] font-mono">
            Featured Reel Edits
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#D7E2EA] mt-2">
            Vertical Cinema — 9:16
          </h3>
        </div>

        {/* 2 Vertical Videos 9:16 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 md:gap-14 w-full">
          {FEATURED_VIDEOS.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
};
