import { Tab, TabList, TabPanels, Tabs, TabPanel, Input, Textarea } from "@chakra-ui/react";
import { useFormik, Form , FormikProvider } from 'formik';
import * as Yup from 'yup';
import { Button,  FormLabel,  Heading, Divider, Card, 
  Center, CardBody, CardHeader, Stack, Box, useToast } from '@chakra-ui/react';
import TextInputLiveFeedback from '../components/TextInputLiveFeedback';
import { ArrowUpIcon, EditIcon, InfoIcon } from '@chakra-ui/icons';
// import { Link } from 'react-router-dom';
import FileUpload from "./FileUpload";
import { useState } from 'react';
// import ReactPlayer from 'react-player';
import DrawerApp from "./Drawer";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import axios from "../api/axios";

const upload =()=> {
   const [video, setVideo] = useState(null);
   const [uploadFile, setUploadFile] = useState(null);
   const maxSize = 50 * 1024 * 1024; // 50MB in bytes
   const acceptedFileTypes = ['video/mp4', 'video/quicktime']
   const [isDragging, setIsDragging] = useState(false);
   const { auth } = useAuth();
   const axiosPrivate = useAxiosPrivate();



   const handleDrop = (e) => {
    e.preventDefault();
    // setIsDragging(false);

    const file = e.dataTransfer.files[0];
    // Perform any necessary validation or processing on the file
    console.log(file.type);

    if (file.size > maxSize) {
      showToast('Error','File over 50 MB');
      return;
    }

    if (file && acceptedFileTypes.includes(file.type)) {  
        console.log(URL.createObjectURL(file)); 
        setVideo(URL.createObjectURL(file));   
        setUploadFile(file);
    }; 

    
  }

  const handleUpload = (e) => {
    const file = e.target.files[0];
    // Perform any necessary validation or processing on the file
    if (file.size > maxSize) {
      showToast('Error','File over 50 MB');
      return;
    }

    if (file && acceptedFileTypes.includes(file.type)) {        
      setVideo(URL.createObjectURL(file));   
      setUploadFile(file);
    }; 

  };

  const formik = useFormik({
    initialValues: {
      subject: '',
      desc: ''
    },    
    // validate,
    onSubmit: async values => {
      const formData = new FormData();
      formData.append('video', uploadFile);
      formData.append('siteurl', auth?.login);
      formData.append('subject', values.subject);
      formData.append('desc', values.desc);
      for (const entry of formData.entries()) {
        console.log(entry);
      }
      //console.log(auth?.login, values.subject, values.desc);            
      await axiosPrivate({
        method: "post",
        url: "api/event_join/upload",
        data: formData,        
        config: {headers: { "Content-Type": "multipart/form-data"},
        withCredentials: true}
      }).then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
      // await axios.post('api/event_join/upload',{   
      //   body: formData,
      //   headers: { "Content-Type": "multipart/form-data" }
      //   //withCredentials: true        
      //   })
      //   .then(function (response) {            
      //       console.log(response);                      
      //   })
      //   .catch(function (error) {
      //       console.log(error);            
      //   });     
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
                        // placeholder="Enter your description"
                        component={Textarea}                       
                      />    
                   
                      <FileUpload handleDrop={handleDrop} handleUpload={handleUpload} isDragging={isDragging} setIsDragging={setIsDragging} video={video}/>      
                      {video && (
                        <Box mt={4}>
                          {/* <Text fontWeight="bold">Uploaded Video:</Text> */}
                          {/* <ReactPlayer url={video} controls width="100%" playing={true}/> */}
                          <Button type="submit" colorScheme="purple" w="full" leftIcon={<ArrowUpIcon/>}>Upload</Button> 
                        </Box>
                      )}        
                                    
                </Form>   
                <Divider borderColor="gray.200" mt="4" mb="4"/>                
          {/* </CardBody>           */}
          </Stack>
        </Card> 
        {/* </Center> */}
        </FormikProvider> 
        </TabPanel>
        <TabPanel>
          <TabPanel pl='1'>
            <Card variant="outline" maxW={"800px"} p='5'>
              <DrawerApp/>
            </Card> 
          </TabPanel>  
        </TabPanel>
      </TabPanels>
    </Tabs>
  )  
}

export default upload;
