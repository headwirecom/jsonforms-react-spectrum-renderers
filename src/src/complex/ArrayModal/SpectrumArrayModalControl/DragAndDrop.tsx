import React from 'react';
import { Flex } from '@adobe/react-spectrum';
import DragHandle from '@spectrum-icons/workflow/DragHandle';
import SpectrumArrayModalItem from '../SpectrumArrayModalItem';
import { swap, clamp } from '../utils';
import { useSprings, useSpringRef, config, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

interface ArrayModalControlDragAndDropProps {
  data: any;
  handleRemoveItem: any;
  indexOfFittingSchemaArray: any[];
  path: string;
  removeItems: any;
  renderers: any;
  schema: any;
  uischema: any;
  uischemas: any;
}

// Drag and Drop
export default function DragAndDrop({
  path,
  data,
  renderers,
  schema,
  uischema,
  uischemas,
  removeItems,
  indexOfFittingSchemaArray,
  handleRemoveItem,
}: ArrayModalControlDragAndDropProps) {
  const stringified = (arr: any) => {
    return arr.map((item: any) => {
      return JSON.stringify(item);
    });
  };
  const order = React.useRef(
    Array.from(Array(data)).map((data: any, _: any) => data)
  );
  const HEIGHT_OF_COMPONENT = 88;
  const fn =
    (
      order: any[],
      active: boolean = false,
      originalIndex: number = 0,
      curIndex: number = 0,
      y: number = 0
    ) =>
    (index: number) =>
      active && index === originalIndex
        ? {
            y: curIndex * HEIGHT_OF_COMPONENT + y,
            scale: 1.03,
            zIndex: 50,
            shadow: 15,
            immediate: (key: string) => key === 'zIndex',
            config: (key: string) =>
              key === 'y' ? config.stiff : config.default,
          }
        : {
            y:
              stringified(order).indexOf(JSON.stringify(data[index])) *
              HEIGHT_OF_COMPONENT,
            scale: 1,
            zIndex: 20,
            shadow: 1,
            immediate: false,
          };
  const [springs, api] = useSprings(data?.length ?? 0, fn(order.current[0]));
  const DragHandleRef: any = useSpringRef();

  const [grabbedIndex, setGrabbedIndex]: any = React.useState(undefined);
  const bind: any = useDrag(
    ({ args: [originalIndex], active, movement: [, y] }) => {
      console.log(y);
      if (grabbedIndex !== null) {
        const curRow = clamp(
          Math.round(
            (grabbedIndex * HEIGHT_OF_COMPONENT + y) / HEIGHT_OF_COMPONENT
          ),
          0,
          data?.length - 1
        );
        console.log(curRow);
        const newOrder = swap(
          order.current[0],
          stringified(order.current[0]).indexOf(
            JSON.stringify(order.current[0][grabbedIndex])
          ),
          stringified(order.current[0]).indexOf(
            JSON.stringify(order.current[0][curRow])
          )
        );
        api.start(fn(newOrder, active, originalIndex, curRow, y)); // Feed springs new style data, they'll animate the view without causing a single render

        if (
          stringified(order.current[0]).indexOf(
            JSON.stringify(order.current[0][grabbedIndex])
          ) ===
          stringified(order.current[0]).indexOf(
            JSON.stringify(order.current[0][curRow])
          )
        ) {
          return;
        } else {
          if (data === newOrder) {
            return;
          }
          data.splice(0, data?.length);
          data.push(...newOrder);
        }

        if (!active) {
          order.current[0] = newOrder;
          setGrabbedIndex(null);
          removeItems(path, [999999999])();
          api.start(fn(newOrder, active, originalIndex, curRow, y));
        }
      }
    }
  );

  const duplicateContent = (index: number) => {
    data.push(data[index]);
    removeItems(path, [999999999])();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: data?.length ? HEIGHT_OF_COMPONENT * data?.length : 0,
        touchAction: 'none',
        transformOrigin: '50% 50% 0px',
        position: 'relative',
      }}
    >
      {springs.map(({ zIndex, shadow, y, scale }, index: number) => (
        <animated.div
          {...bind(index)}
          key={`${index}`}
          style={{
            zIndex,
            boxShadow: shadow.to(
              (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
            ),
            y,
            scale,
            width: '100%',
            touchAction: 'none',
            transformOrigin: '50% 50% 0px',
            position: 'absolute',
          }}
          height={HEIGHT_OF_COMPONENT + 'px'}
        >
          <Flex direction='row' alignItems='stretch' flex='auto inherit'>
            <SpectrumArrayModalItem
              index={index}
              indexOfFittingSchema={indexOfFittingSchemaArray[index]}
              path={path}
              removeItem={handleRemoveItem}
              duplicateItem={duplicateContent}
              renderers={renderers}
              schema={schema}
              uischema={uischema}
              uischemas={uischemas}
            ></SpectrumArrayModalItem>
            <div
              ref={DragHandleRef}
              className='grabbable'
              onMouseDown={() => setGrabbedIndex(index)}
            >
              <DragHandle
                aria-label='Drag and Drop Handle'
                size='L'
                alignSelf='center'
                width={'100%'}
              />
            </div>
            <p onClick={() => duplicateContent(index)}>{JSON.stringify(y)}</p>
          </Flex>
        </animated.div>
      ))}
    </div>
  );
}
