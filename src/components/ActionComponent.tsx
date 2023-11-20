import { Box, Button, Stack } from '@chakra-ui/react';

import { useItemsStore } from '../stores/itemsStore';

export const ActionComponent = () => {
  const rightSideItemsToMoveToTheLeft = useItemsStore(
    (state) => state.rightSideItemsToMoveToTheLeft
  );
  const leftSideItemsToMoveToTheRight = useItemsStore(
    (state) => state.leftSideItemsToMoveToTheRight
  );
  const moveItemsToTheLeft = useItemsStore((state) => state.moveItemsToTheLeft);
  const moveItemsToTheRight = useItemsStore(
    (state) => state.moveItemsToTheRight
  );

  return (
    <Box>
      <Stack>
        <Button
          isDisabled={!rightSideItemsToMoveToTheLeft.length}
          onClick={() => {
            if (rightSideItemsToMoveToTheLeft.length) {
              moveItemsToTheLeft();
            }
          }}
        >
          {'<'}
        </Button>
        <Button
          isDisabled={!leftSideItemsToMoveToTheRight.length}
          onClick={() => {
            if (leftSideItemsToMoveToTheRight.length) {
              moveItemsToTheRight();
            }
          }}
        >
          {'>'}
        </Button>
      </Stack>
    </Box>
  );
};
