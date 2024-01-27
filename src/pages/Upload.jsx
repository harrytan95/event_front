import { Tab, TabList, TabPanels, Tabs, TabPanel, Input, Textarea } from "@chakra-ui/react";
import { useFormik, Form , FormikProvider } from 'formik';
import * as Yup from 'yup';
import { Button,  FormLabel,  Heading, Divider, Card, 
  Center, CardBody, CardHeader, Stack, Box, useToast } from '@chakra-ui/react';
import TextInputLiveFeedback from '../components/TextInputLiveFeedback';
import { ArrowUpIcon, EditIcon, InfoIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import FileUpload from "./FileUpload";

const upload =()=> {
  
  const formik = useFormik({
    initialValues: {
      subject: '',
      desc: ''
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
      subject: Yup.string()
        .min(1, 'Must be at least 1 characters')
        .max(50, 'Must be less than 50 characters')
        .required('Subject is required'),
      desc: Yup.string()
      .min(5, 'Must be at least 5 characters')
      .max(200, 'Must be less than 200 characters')
      .required('Description is required')                 
      })
  });

  return (
    <Tabs mt="40px" p="20px" colorScheme="purple" variant="enclosed">     
      <TabList>
        <Tab _selected={{ cololr: 'white', bg: 'purple.400 '}}>Upload Video</Tab>
        <Tab _selected={{ cololr: 'white', bg: 'purple.400 '}}>History</Tab>
      </TabList>

      <TabPanels>
        <TabPanel pl='0'>
        <FormikProvider value={formik}>
          {/* <Center> */}
          <Card variant="outline" maxW={"800px"} p='5'>
            <Stack>              
              {/* <CardBody> */}
                  <Form onSubmit={formik.handleSubmit}>  
                      <TextInputLiveFeedback
                        label="Subject"
                        id="subject"
                        name="subject"
                        helpText="Subject must be 50 characters or less."
                        type="text"                         
                        component={Input}
                      />     
                    <TextInputLiveFeedback
                        label="Description"
                        id="desc"
                        name="desc"
                        helpText="Description must be 5-200 characters."
                        type="text"
                        rows={4}
                        placeholder="Enter your description"
                        component={Textarea}                       
                      />    
                   
                      <FileUpload />               
                    <Button type="submit" colorScheme="purple" w="full" leftIcon={<ArrowUpIcon/>}>Upload</Button>                  
                </Form>   
                <Divider borderColor="gray.200" mt="4" mb="4"/>                
          {/* </CardBody>           */}
          </Stack>
        </Card> 
        {/* </Center> */}
        </FormikProvider> 
        </TabPanel>
      </TabPanels>
    </Tabs>
  )  
}

export default upload;
