import { Box, Container } from '@chakra-ui/react';

import { ActionComponent, ListComponent } from './components';
import { ItemsContextProvider, useItemsContext } from './context';

const MyContainer = () => {
  const { leftItems, rightItems } = useItemsContext();
  return (
    <>
      <ListComponent whichSide="left" items={leftItems} />
      <ActionComponent />
      <ListComponent whichSide="right" items={rightItems} />
    </>
  );
};

function App() {
  return (
    <>
      <Container mt="16" maxW="container.xl">
        <ItemsContextProvider>
          <Box
            h="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="1rem"
          >
            <MyContainer />
          </Box>
        </ItemsContextProvider>
      </Container>
    </>
  );
}

export default App;
