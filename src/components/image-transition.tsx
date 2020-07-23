import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import { Transition } from 'react-transition-group';

const absolute: CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const duration = 750;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

interface ImageTransitionProps {
  src: string | undefined;
  style?: React.CSSProperties;
  className?: string;
  loadingColor?: string;
}

type TransitionStates = 'entering' | 'entered' | 'exiting' | 'exited';

export default function ImageTransition(props: ImageTransitionProps) {
  const [currentImage, setCurrentImage] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.src === currentImage) {
      return;
    }
    setLoading(true);
    const img = new Image();
    img.src = props.src!;
    img.onload = () => {
      setTimeout(() => {
        setCurrentImage(img.src);
        setLoading(false);
      }, 750);
    };
  }, [currentImage, props.src]);
  return (
    <div className={props.className} style={{ position: 'relative', height: '100%', ...props.style }}>
      {/* Overlay */}
      <Transition in={loading} timeout={0} nodeRef={ref}>
        {(state: TransitionStates) => (
          <div
            ref={ref}
            style={{
              ...absolute,
              background: props.loadingColor || 'black',
              zIndex: 10,
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          />
        )}
      </Transition>
      {/* BG Image */}
      <div
        style={{
          ...absolute,
          background: props.loadingColor || 'black',
          backgroundImage: `url(${currentImage})`,
          backgroundPosition: 'top',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          height: '100%',
        }}
      />
    </div>
  );
}
