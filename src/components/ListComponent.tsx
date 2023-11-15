import { Box, Checkbox, CheckboxGroup } from '@chakra-ui/react';

import { useItemsContext } from '../context';

export type ListComponentProps = {
  whichSide: 'left' | 'right';
};

export const ListComponent = ({ whichSide }: ListComponentProps) => {
  const {
    leftItems,
    leftItemsToMove,
    rightItems,
    rightItemsToMove,
    setLeftItemsToMove,
    setRightItemsToMove,
  } = useItemsContext();

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
        value={isLeft ? leftItemsToMove : rightItemsToMove}
        onChange={(values) => {
          const numberValues = values.map((value) => +value);
          isLeft
            ? setLeftItemsToMove(numberValues)
            : setRightItemsToMove(numberValues);
        }}
      >
        <Box display="flex" flexDir="column">
          {(isLeft ? leftItems : rightItems).map((item) => {
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
