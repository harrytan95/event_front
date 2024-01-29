import { useState } from 'react';
import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

const BoxComponent = ({ title, details }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box 
        borderWidth="1px" 
        borderRadius="md" 
        p={4} 
        mb={4}
        transition="box-shadow 0.3s"
        _hover={{
            bg: "#fafafa",
            boxShadow: "lg",
          }}    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold">{title}</Text>
        <IconButton
          icon={isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          onClick={handleToggle}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
          variant="ghost"
        />
      </Flex>
      {isExpanded && <Text mt={2}>{details}</Text>}
    </Box>
  );
};

const DrawerApp = () => {
  return (
    <Flex direction="column">
      <BoxComponent
        title="Video 1"
        details="Details for Video 1"
      />
      <BoxComponent
        title="Video 2"
        details="Details for Video 2"
      />
      <BoxComponent
        title="Video 3"
        details="Details for Video 3"
      />
    </Flex>
  );
};

export default DrawerApp;
