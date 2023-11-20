import { Box, Checkbox, CheckboxGroup } from '@chakra-ui/react';

import { useItemsStore } from '../stores/itemsStore';

export type ListComponentProps = {
  whichSide: 'left' | 'right';
};

export const ListComponent = ({ whichSide }: ListComponentProps) => {
  const leftSideItemsToMoveToTheRight = useItemsStore(
    (state) => state.leftSideItemsToMoveToTheRight
  );
  const rightSideItemsToMoveToTheLeft = useItemsStore(
    (state) => state.rightSideItemsToMoveToTheLeft
  );
  const setLeftItemsToMoveToTheRight = useItemsStore(
    (state) => state.setLeftItemsToMoveToTheRight
  );
  const setRightItemsToMoveToTheLeft = useItemsStore(
    (state) => state.setRightItemsToMoveToTheLeft
  );
  const rightSideItems = useItemsStore((state) => state.rightSideItems);
  const leftSideItems = useItemsStore((state) => state.leftSideItems);

  const isLeft = whichSide === 'left';
  return (
    <Box
      alignItems="center"
      justifyContent="center"
      display="flex"
      h="150px"
      w="100px"
      border="1px solid"
      borderRadius="base"
    >
      <CheckboxGroup
        value={
          isLeft ? leftSideItemsToMoveToTheRight : rightSideItemsToMoveToTheLeft
        }
        onChange={(values) => {
          const numberValues = values.map((value) => +value);
          isLeft
            ? setLeftItemsToMoveToTheRight(numberValues)
            : setRightItemsToMoveToTheLeft(numberValues);
        }}
      >
        <Box display="flex" flexDir="column">
          {(isLeft ? leftSideItems : rightSideItems).map((item) => {
            return (
              <Checkbox value={item} key={item}>
                {item}
              </Checkbox>
            );
          })}
        </Box>
      </CheckboxGroup>
    </Box>
  );
};
