import React from 'react';
import { useSpring, animated, easings } from 'react-spring';

interface AnimationWrapperProps {
  expanded: boolean;
  enableDetailedView: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
  children: React.ReactNode;
}

export default function ModalItemAnimationWrapper({
  expanded,
  enableDetailedView,
  setIsAnimating,
  children,
}: AnimationWrapperProps) {
  // initial values for animation
  const refForPosition: any = React.useRef<HTMLDivElement>();

  const [baseHeight, setBaseHeight] = React.useState('66px');
  const [baseWidth, setBaseWidth] = React.useState('100%');
  const [baseTop, setBaseTop] = React.useState(0);
  const [baseLeft, setBaseLeft] = React.useState(0);

  React.useEffect(() => {
    // saving initial position of array item, for reference when animating back.
    if (refForPosition.current) {
      setBaseHeight(refForPosition.current.clientHeight + 'px');
      setBaseWidth(refForPosition.current.clientWidth + 'px');
      setBaseTop(refForPosition.current.offsetTop);
      setBaseLeft(refForPosition.current.offsetLeft);
    }
  }, []);

  const jsonFormWrapper = document.getElementById('json-form-wrapper');
  const animateToWidth =
    (jsonFormWrapper?.clientWidth || window.innerWidth - 15) + 'px';
  const animateToHeight =
    (jsonFormWrapper?.clientHeight || window.innerHeight - 15) + 'px';

  const springAnim = useSpring({
    config: { duration: 700, easing: easings.easeInOutQuart },
    top: expanded ? 0 : baseTop,
    left: expanded ? 0 : baseLeft,
    width: expanded ? animateToWidth : baseWidth,
    height: expanded ? animateToHeight : baseHeight,
    position: expanded ? 1 : 0,
    onRest: () => setIsAnimating(false),
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
