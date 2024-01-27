import { Flex, Box, Heading, Text, Button, Spacer, HStack, useToast } from '@chakra-ui/react'
import useAuth from "../hooks/useAuth"
import { useNavigate, Link } from 'react-router-dom';
import { UnlockIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const toast = useToast()

  const showToast = () => {
    setAuth({});
    navigate('/');
    toast({
      title: 'Logged out',
      description: 'Successfully logged out',
      duration: 5000,
      isClosable: true,
      status: 'success',
      position: 'top', 
      icon: <UnlockIcon/>
    })
  }

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {   
    setAuth({});
    navigate('/');
  }

  return (
    
    <Flex as="nav" p="10px" alignItems="center" gap="10px">
        <Heading as="h1">JEUNESSE</Heading>
        <Spacer/>
        <HStack spacing="20px">
            {/* <Box bg="gray.200" p="10px">M</Box>           */}
            { auth?.login ? ( 
            <>
              <Text mb="0">Hello, {auth?.login}</Text>            
              <Button colorScheme="purple" onClick={showToast} leftIcon={<UnlockIcon/>}>Logout</Button>
            </>
            ) : (             
             <>
              <Link to="/signup">
                  <Button variant="ghost" colorScheme="purple">Sign Up</Button>
              </Link>
              <Link to="/signin">
                  <Button variant="ghost" colorScheme="purple">Sign In</Button>
              </Link>
             </>
            )}
        </HStack>
    </Flex>
  )
}

export default Navbar