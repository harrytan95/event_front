import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth"
import { Heading, Box, Button, FormControl, FormLabel, Input, Flex,
  Spacer,
  HStack,
  Text
    // AlertDialog,
    // AlertDialogOverlay,
    // AlertDialogContent,
    // AlertDialogHeader,
    // AlertDialogBody,
    // AlertDialogFooter 
  } from "@chakra-ui/react";
import  axios   from '../api/axios'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AtSignIcon, EditIcon } from "@chakra-ui/icons";
// import { axiosPrivate } from "../api/axios";
//import useSignIn from 'react-auth-kit/hooks/useSignIn'

function SignInForm() {
  const { setAuth, auth } = useAuth();
  //console.log(auth.login);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  // const signIn = useSignIn();

  useEffect(() => {
    console.log(auth.login);
    // navigate(from, {replace: true});       
  }, [auth.login]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Perform login logic here
    // console.log("Login:", login);
    // console.log("Password:", password);

    // if (login === "" || password === "") {
    //     setIsOpen(true);
    //   } else {

         try {
              const response = await axios.post('api/auth/jwt_login',
              JSON.stringify({
                 siteurl: login, password: password
              }), {
                headers : {'Content-Type': 'application/json'},
                withCredentials: true
              })
               // console.log(response?.data); 
                console.log(JSON.stringify(response?.headers)); 
                //const access_token = response?.data?.token?.access;
                const accessToken = ""; 
                console.log(accessToken);
                setAuth({ login, password, accessToken});    
                setLogin('');
                setPassword('');
                // console.log(response?.data?.headers); 
                //console.log(from);      
                //console.log(auth.login);
                navigate(from, {replace: true});       
         }  catch(error) {
            console.log(error);
            alert(error);
        };       
      }
  // };

  return (
    <Box maxW="md" mx="auto" mt="8">     
        <form onSubmit={handleSubmit}>
        <FormControl id="login" mb="4">
          <FormLabel>Login</FormLabel>
          <Input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            placeholder="Login"
            autoComplete="off"
          />
        </FormControl>
        <FormControl id="password" mb="4">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            autoComplete="off"
          />
        </FormControl>
        <Flex align="center" justify="space-between" flexWrap="wrap">
          <Button  type="submit" colorScheme="purple" w="full" mb={4} leftIcon={<EditIcon/>}>
            Sign In
          </Button>
        </Flex>
        <Flex justify="space-between" alignItems="center" mt={2}>
         
          <Link color="purple.500" to="/signup">
            <Text>Don't have an account yet?</Text>
          </Link>
          
          <Link color="purple.500" to="/forgot-password">
          <Text>Forgot Password</Text>
          </Link> 
            
        </Flex>
      </form>   
      
      {/* <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
        <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Warning
            </AlertDialogHeader>

            <AlertDialogBody>
            Please fill in both the login and password fields.
            </AlertDialogBody>

            <AlertDialogFooter>
            <Button onClick={onClose}>OK</Button>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialogOverlay>
    </AlertDialog> */}
    </Box>    
  );
}

export default SignInForm;
