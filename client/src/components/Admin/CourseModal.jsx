import { Box, Button, Grid, Heading, Input, Modal , ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiDeleteBin5Fill } from 'react-icons/ri';

const CourseModal = ({isOpen , onClose , onOpen , id , deleteHandler , courseTitle , lectures=[] , addLectureHandler , loading}) => {


    const[title , setTitle]=useState("")
    const[description , setdescription]=useState("")
    const[video , setvideo]=useState("")
    const[videoprev , setvideoPrev]=useState("");

    const changeVideoHandler = (e)=> {
        const file=e.target.files[0];
        const reader=new FileReader();
      
        reader.readAsDataURL(file);
      
        reader.onloadend =() =>{
            setvideoPrev(reader.result);
            setvideo(file);
        }
      }
   
      const handleClose=()=>{
        setTitle('');
        setdescription('');
        setvideo('');
        setvideoPrev('');
        onClose();
      }

      

    
  return (
   <Modal isOpen={isOpen} onClose={handleClose} size="full" scrollBehavior='outside'>
    <ModalOverlay/>
    <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>
        <ModalCloseButton/>
        <ModalBody p={"16"}>
            <Grid templateColumns={["1fr" , "3fr 1fr" ]}>
                <Box px={["0" , "16"]}>
                    <Box my="5">
                        <Heading>{courseTitle}</Heading>
                        <Heading size={"sm"} opacity={"0.4"}>{`#${id}`} </Heading>
                    </Box>
                    <Heading size="lg">Lectures</Heading>
                    {
                        lectures.map((item , i) =>(

                            <VideoCard key={i} title={item.title} description={item.description} num={i+1}  lectureId={item._id} courseId={id}
                      deleteHandler={deleteHandler} loading={loading}
                    />

                        ) )
                    }
                    
                </Box>

                <Box>
                    <form onSubmit={e=>addLectureHandler(e , id ,title , description , video)}>

                    <VStack spacing={"4"}>
                        <Heading size={"md"}>Add Lecture</Heading>
                        <Input focusBorderColor='purple.600' placeholder='Title' onChange={(e)=>setTitle(e.target.value)}/>
                        <Input focusBorderColor='purple.600' placeholder='Description' onChange={(e)=>setdescription(e.target.value)}/>
                        <Input  required
                        accept='video/mp4'
                        
                        type='file'
                        focusBorderColor='purple.600'
                        onChange={changeVideoHandler}
                        css={{
                            "&::file-selector-button":{
                                cursor:"pointer",
                                marginLeft:"-5%",
                                width:"110%",
                                border:"none",
                                height:"100%",
                                color:"#805AD5",
                                background:"transparent",
                            }
                        }}
                        />
                    {
                        videoprev && <video controlsList='nodownload' controls src={videoprev}></video>
                    }
                    <Button w={"full"} colorScheme={"purple"} type="submit" isLoading={loading}>
                        Upload
                    </Button>
                    </VStack>


                    </form>
                </Box>
            </Grid>
        </ModalBody>

        
    </ModalContent>
   </Modal>
  )
}

export default CourseModal


function VideoCard({title , description , num , lectureId , courseId , deleteHandler , loading}){
    return(
    <Stack direction={["column" , "row"]} my="8" borderRadius={"lg"} boxShadow={'0 0 10px rgba(107 , 70 ,193 ,0.5)'} justifyContent={["flex-start" , "space-between"]} p={["4","8"]}>
        <Box><Heading size={"sm"}>{`#${num} ${title}`}</Heading>
        <Text>{description}</Text></Box>
        <Button color={'purple.600'} onClick={()=> deleteHandler(courseId , lectureId)} isLoading={loading}>
            <RiDeleteBin5Fill/>
        </Button>
    </Stack>
    )
}
