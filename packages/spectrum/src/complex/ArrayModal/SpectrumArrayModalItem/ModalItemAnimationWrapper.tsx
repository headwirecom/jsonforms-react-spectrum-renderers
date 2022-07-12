import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated, easings } from 'react-spring';

interface AnimationWrapperProps {
  expanded: boolean;
  enableDetailedView: boolean;
  children: React.ReactNode;
}

export default function ModalItemAnimationWrapper({
  expanded,
  enableDetailedView,
  children,
}: AnimationWrapperProps) {
  // initial values for animation
  const refForPosition = useRef<HTMLDivElement>();

  const [baseHeight, setBaseHeight] = useState('66px');
  const [baseWidth, setBaseWidth] = useState('100%');
  const [baseTop, setBaseTop] = useState(0);
  const [baseLeft, setBaseLeft] = useState(0);

  useEffect(() => {
    // saving initial position of array item, for reference when animating back.
    if (refForPosition.current) {
      setBaseHeight(refForPosition.current.clientHeight + 'px');
      setBaseWidth(refForPosition.current.clientWidth + 'px');
      setBaseTop(refForPosition.current.offsetTop);
      setBaseLeft(refForPosition.current.offsetLeft);
    }
  }, []);

  const jsonFormWrapper = document.getElementById('json-form-wrapper');
  const animateToWidth = jsonFormWrapper?.clientWidth || window.innerWidth;
  const animateToHeight = jsonFormWrapper?.clientHeight || window.innerHeight;

  const springAnim = useSpring({
    config: { duration: 700, easing: easings.easeInOutQuart },
    top: expanded ? 0 : baseTop,
    left: expanded ? 0 : baseLeft,
    width: expanded ? animateToWidth + 'px' : baseWidth,
    height: expanded ? animateToHeight + 'px' : baseHeight,
    position: expanded ? 1 : 0,
  });

  return (
    <animated.div
      className={'animatedModalItemDiv'}
      style={
        enableDetailedView
          ? {
              top: springAnim.top,
              left: springAnim.left,
              height: springAnim.height,
              width: springAnim.width,
              position: springAnim.position.to((e) => {
                return e > 0 ? 'absolute' : 'static';
              }),
            }
          : {}
      }
    >
      <div ref={refForPosition} className={'refDivForPosition'}>
        {children}
      </div>
    </animated.div>
  );
}
