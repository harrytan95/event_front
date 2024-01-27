import { useState } from 'react';
import { Box, Text, Flex, useToast } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

const FileUpload = () => {
  const [video, setVideo] = useState(null);
  const acceptedFileTypes = ['video/mp4', 'video/quicktime']
  const [isDragging, setIsDragging] = useState(false);
  const toast = useToast()
  const maxSize = 50 * 1024 * 1024; // 50MB in bytes

  const showToast = (title, msg) => {    
    toast({
      title: title,
      description: msg,
      duration: 5000,
      isClosable: true,
      status: 'success',
      position: 'top', 
      icon: <InfoIcon/>
    })
  }

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    // Perform any necessary validation or processing on the file
    console.log(file.type);

    if (file.size > maxSize) {
      showToast('Error','File over 50 MB');
      return;
    }

    if (file && acceptedFileTypes.includes(file.type)) {        
        setVideo(file);
        // showToast('Successfully uploaded video:', file.name);
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
      setVideo(file);
  }; 

  };

  return (
    <Box
      mt={4}
      p={4}
      border="2px dashed"
      borderColor={isDragging ? 'red.500' : 'gray.300'}
      borderRadius="md"
      onDrop={handleDrop}
      onDragOver={(e) => { 
          e.preventDefault();
          setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
    >
      <Text mb={2}>Drag and drop a video file here or</Text>
      <Flex align="center">
        <label htmlFor="upload" style={{ cursor: 'pointer' }}>
          <Text color="blue.500" mr={1}>
            click to upload
          </Text>
          <input
            id="upload"
            type="file"
            accept="video/*"
            onChange={handleUpload}
            style={{ display: 'none' }}
          />
        </label>
        <Text>your video</Text>
      </Flex>
      {video && (
        <Box mt={4}>
          <Text fontWeight="bold">Uploaded Video:</Text>
          <Text>{video.name}</Text>
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;
