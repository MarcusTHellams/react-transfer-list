import { create } from 'zustand';

import { data } from '../data';

type ItemState = {
  leftSideItems: typeof data;
  rightSideItems: typeof data;
  rightSideItemsToMoveToTheLeft: typeof data;
  leftSideItemsToMoveToTheRight: typeof data;
};

type ItemActions = {
  moveItemsToTheLeft: () => void;
  moveItemsToTheRight: () => void;
  setLeftItemsToMoveToTheRight: (items: typeof data) => void;
  setRightItemsToMoveToTheLeft: (items: typeof data) => void;
};

export const useItemsStore = create<ItemState & ItemActions>((set) => ({
  leftSideItems: data,
  rightSideItems: [],
  rightSideItemsToMoveToTheLeft: [],
  leftSideItemsToMoveToTheRight: [],
  setLeftItemsToMoveToTheRight(items: typeof data) {
    set(() => ({
      leftSideItemsToMoveToTheRight: items,
    }));
  },
  setRightItemsToMoveToTheLeft(items: typeof data) {
    set(() => ({
      rightSideItemsToMoveToTheLeft: items,
    }));
  },
  moveItemsToTheRight() {
    set((state) => ({
      rightSideItems: [
        ...new Set(
          state.rightSideItems.concat(state.leftSideItemsToMoveToTheRight)
        ),
      ].sort(),
      leftSideItems: state.leftSideItems.filter((left) => {
        return !state.leftSideItemsToMoveToTheRight.includes(left);
      }),
      leftSideItemsToMoveToTheRight: [],
    }));
  },
  moveItemsToTheLeft() {
    set((state) => ({
      leftSideItems: [
        ...new Set(
          state.leftSideItems.concat(state.rightSideItemsToMoveToTheLeft)
        ),
      ].sort(),
      rightSideItems: state.rightSideItems.filter((right) => {
        return !state.rightSideItemsToMoveToTheLeft.includes(right);
      }),
      rightSideItemsToMoveToTheLeft: [],
    }));
  },
}));
