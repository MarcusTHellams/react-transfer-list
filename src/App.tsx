import { Box, Container } from '@chakra-ui/react';

import { ActionComponent, ListComponent } from './components';
import { ItemsContextProvider } from './context';

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
            <ListComponent whichSide="left" />
            <ActionComponent />
            <ListComponent whichSide="right" />
          </Box>
        </ItemsContextProvider>
      </Container>
    </>
  );
}

export default App;
