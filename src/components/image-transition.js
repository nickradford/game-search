import React, { useState, useEffect, useRef } from "react";
import { Transition } from "react-transition-group";

const absolute = {
  position: "absolute",
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

export default function ImageTransition(props) {
  const [currentImage, setCurrentImage] = useState();
  const [loading, setLoading] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (props.src === currentImage) {
      return;
    }
    setLoading(true);
    const img = new Image();
    img.src = props.src;
    img.onload = () => {
      setTimeout(() => {
        setCurrentImage(img.src);
        setLoading(false);
      }, 750);
    };
  }, [currentImage, props.src]);
  return (
    <div style={{ position: "relative", height: "100%" }}>
      {/* Overlay */}
      <Transition in={loading} timeout={0} nodeRef={ref}>
        {(state) => (
          <div
            ref={ref}
            style={{
              ...absolute,
              background: props.loadingColor || "black",
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
          ...absolute.style,
          backgroundImage: `url(${currentImage})`,
          backgroundPosition: "top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100%",
        }}
      />
    </div>
  );
}
