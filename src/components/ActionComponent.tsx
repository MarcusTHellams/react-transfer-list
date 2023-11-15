import { Box, Button, Stack } from '@chakra-ui/react';

import { useItemsContext } from '../context';

export const ActionComponent = () => {
  const {
    leftItemsToMove,
    moveItemsToLeft,
    moveItemsToRight,
    rightItemsToMove,
  } = useItemsContext();

  return (
    <Box>
      <Stack>
        <Button
          onClick={() => {
            if (rightItemsToMove.length) {
              moveItemsToLeft();
            }
          }}
        >
          {'<'}
        </Button>
        <Button
          onClick={() => {
            if (leftItemsToMove.length) {
              moveItemsToRight();
            }
          }}
        >
          {'>'}
        </Button>
      </Stack>
    </Box>
  );
};