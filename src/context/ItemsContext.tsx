import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

import { data } from '../data';

type ItemsContextType = {
  leftItems: number[];
  rightItems: number[];
  leftItemsToMove: number[];
  rightItemsToMove: number[];
  setLeftItems: React.Dispatch<React.SetStateAction<number[]>>;
  setRightItems: React.Dispatch<React.SetStateAction<number[]>>;
  setLeftItemsToMove: React.Dispatch<React.SetStateAction<number[]>>;
  setRightItemsToMove: React.Dispatch<React.SetStateAction<number[]>>;
  moveItemsToLeft: () => void;
  moveItemsToRight: () => void;
};

export const ItemsContext = createContext<ItemsContextType | undefined>(
  undefined
);
export const useItemsContext = () => {
  const context = useContext(ItemsContext);

  if (!context) {
    throw new Error(
      'useItemsContext must be used as a child of ItemsContextProvider'
    );
  }

  return context;
};

export const ItemsContextProvider = ({ children }: PropsWithChildren) => {
  const [leftItems, setLeftItems] = useState(data);
  const [rightItems, setRightItems] = useState<typeof data>([]);
  const [leftItemsToMove, setLeftItemsToMove] = useState<typeof data>([]);
  const [rightItemsToMove, setRightItemsToMove] = useState<typeof data>([]);

  const leftItemsToMoveRef = useRef(leftItemsToMove);
  leftItemsToMoveRef.current = leftItemsToMove;

  const rightItemsToMoveRef = useRef(rightItemsToMove);
  rightItemsToMoveRef.current = rightItemsToMove;

  const moveItemsToLeft = useCallback(() => {
    setLeftItems((prev) => {
      return [...new Set(prev.concat(rightItemsToMoveRef.current))].sort();
    });
    setRightItems((prev) => {
      return prev.filter((val) => !rightItemsToMoveRef.current.includes(val));
    });
    setTimeout(() => {
      setRightItemsToMove([]);
    });
  }, []);

  const moveItemsToRight = useCallback(() => {
    setRightItems((prev) => {
      return [...new Set(prev.concat(leftItemsToMoveRef.current))].sort();
    });
    setLeftItems((prev) => {
      return prev.filter((val) => !leftItemsToMoveRef.current.includes(val));
    });
    setTimeout(() => {
      setLeftItemsToMove([]);
    });
  }, []);

  return (
    <ItemsContext.Provider
      value={{
        leftItems,
        leftItemsToMove,
        moveItemsToLeft,
        moveItemsToRight,
        rightItems,
        rightItemsToMove,
        setLeftItems,
        setLeftItemsToMove,
        setRightItems,
        setRightItemsToMove,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
