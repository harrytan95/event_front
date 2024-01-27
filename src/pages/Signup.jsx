import { useFormik, Form , FormikProvider } from 'formik';
import { Button,  FormLabel,  Heading, Divider, Card, 
  Center, CardBody, CardHeader, Stack, Box, useToast, Input } from '@chakra-ui/react';
import axios from '../api/axios'
import '../css/ErrorMessage.css';
import { Link } from 'react-router-dom';
import TextInputLiveFeedback from '../components/TextInputLiveFeedback';
import * as Yup from 'yup';
import { useRef, useEffect } from 'react';
import { EditIcon, InfoIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  // const [success, setSuccess] = useState(false);
  const nameRef = useRef();
  const toast = useToast()
  const navigate = useNavigate(); 

  useEffect(() => {    
     nameRef.current.focus();
  },[])

  const showToast = () => {    
    toast({
      title: 'Sign Up',
      description: 'Successfully signed up',
      duration: 5000,
      isClosable: true,
      status: 'success',
      position: 'top', 
      icon: <InfoIcon/>
    })
  }


  const formik = useFormik({
    initialValues: {
      siteurl: '',
      name: '',
      email: '',
      password: '',
      confirm_password: ''
    },    
    // validate,
    onSubmit: async values => {
      await axios.post('api/auth/signup',{   
        siteurl: values.siteurl,
        name: values.name,
        email: values.email,
        password: values.password,
        lang: 'TC'
        })
        .then(function (response) {            
            console.log(response);          
            if (response.data.code=='203' || response.data.code=='201') {                        

              if (response.data.code=='201') {
                // setSuccess(true);    
                showToast();            
                navigate('/signin');       
              }
            };
        })
        .catch(function (error) {
            console.log(error);            
        });     
    },    
    validationSchema: Yup.object({
      siteurl: Yup.string()
        .min(1, 'Must be at least 1 characters')
        .max(50, 'Must be less than 50 characters')
        .required('Login is required')
        .matches(
          /^[a-zA-Z0-9]+$/,
          'Cannot contain special characters or spaces'),
      name: Yup.string()        
        .max(100, 'Must be less than 100 characters')
        .required('Name is required'),    
      email: Yup.string()
        .max(100, 'Must be less than 100 characters')      
        .required('Email is required')
        .matches(
          /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          'Invalid email address'),    
      password: Yup.string()
        .required('Password is required')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,'Invalid Password'),
      confirm_password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,'Invalid Password')   
      .oneOf([Yup.ref('password'), null], 'Passwords must match')   
    }),
  });
  return (
      <>
      {/* {success ? (
            <section>
                <Heading>Success!</Heading>               
            </section>
        ) : ( */}
          <FormikProvider value={formik}>
          <Center>
          <Card variant="outline" borderTop="8px" borderColor="purple.400" maxW='md'>
            <Stack spacing='0'>
              <CardHeader>
                    <Box height="1px">
                      <Heading size='md' textAlign={'center'}>Sign Up</Heading> 
                    </Box>
              </CardHeader>       

              <CardBody>
                  <Form onSubmit={formik.handleSubmit}>  
                  <TextInputLiveFeedback
                    label="Name"
                    id="name"
                    name="name"
                    helpText="Name must be 100 characters or less."
                    type="text"     
                    innerRef={nameRef}     
                    component={Input}
                  />     
                <TextInputLiveFeedback
                    label="Login"
                    id="siteurl"
                    name="siteurl"
                    helpText="Must be 5-50 characters and cannot contain special characters."
                    type="text"
                    component={Input}
                  />      
                <TextInputLiveFeedback
                    label="Email"
                    id="email"
                    name="email"
                    helpText="Must be less than 100 characters"
                    type="text"
                    component={Input}
                  />      
                  <TextInputLiveFeedback
                    label="Password"
                    id="password"
                    name="password"
                    helpText="Must contain at least one lowercase letter, one uppercase letter, one digit, and one special character, length between 8 and 24 characters."
                    type="password"
                    component={Input}
                  />          
                  <TextInputLiveFeedback
                    label="Confirm Password"
                    id="confirm_password"
                    name="confirm_password"
                    helpText="Must contain at least one lowercase letter, one uppercase letter, one digit, and one special character, length between 8 and 24 characters."
                    type="password"
                    component={Input}
                  />          
                  <Button type="submit" colorScheme="purple" w="full" leftIcon={<EditIcon/>}>Sign Up</Button>                  
                </Form>   
                <Divider borderColor="gray.200" mt="4" mb="4"/>                
          </CardBody>
          <Box height="100px">                    
                <FormLabel pl="5">Already registered?</FormLabel>
                <Link to="/login">
                    <Button mt="0" variant="ghost" colorScheme="purple" p="5">Sign In</Button>
                </Link>           
          </Box>
       
          {/* <CardFooter  justify='space-between'>     
            <Box height="100px">                    
                <FormLabel mt="0">Already registered?</FormLabel>
                <Link to="/login">
                    <Button mt="0" variant="ghost" colorScheme="purple" p="0">Sign In</Button>
                </Link>           
            </Box>
          </CardFooter>  */}
          </Stack>
        </Card> 
        </Center>
        </FormikProvider> 
        {/* )} */}
       </>    
    
  );
};

export default Signup;