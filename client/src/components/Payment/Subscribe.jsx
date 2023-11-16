import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { server } from '../../redux/store';
import axios from 'axios';
import { buySubscription } from '../../redux/actions/user';
import toast from 'react-hot-toast';
import logo from "../../assets/images/bgr.png";

const Subscribe = ({user}) => {


    const dispatch=useDispatch();
    const [key , setKey]=useState("");

    const{loading , error , subscriptionId} = useSelector(state =>state.subscription)
    const{error : courseError} = useSelector(state =>state.course)
    // console.log(subscriptionId)


    const submitHandler= async () =>{
   const {data}= await axios.get(`${server}/razorpaykey`);

   setKey(data.key);


   dispatch(buySubscription())
    }

    useEffect(() =>{

        if(error){

            toast.error(error);
            dispatch({type: 'clearError'})
        }
        if(courseError){

            toast.error(courseError);
            dispatch({type: 'clearError'})
        }
        
        if(subscriptionId){
         
            const openPopUp =() =>{

                const options={
                    key,
                    name:"ILearn",
                    description:"Get access To all Premium contents by worls class educator across the globe.",
                    image:logo,
                    subscription_id:subscriptionId,
                    callback_url:`${server}/paymentverification`,
                    prefill:{
                        name:user.name,
                        email:user.email,
                        contact:"9572301358"

                    },
                    theme:{
                        color:"805AD5"
                    }
                };


                const razor=new window.Razorpay(options);
      
                razor.open();
            };

            openPopUp();
          
        }



    } , [dispatch , error , user.name , user.email , key , subscriptionId , courseError])


  return (
    <Container h={'100vh'} p={'16'}>
        <Heading textAlign={'center'} my={'8'}>Subscribe</Heading>


        <VStack boxShadow={'lg'} alignItems={'stretch'} borderRadius={"lg"} spacing={'0'}>

            <Box bg='purple.600' color={'white'} p={'4'} borderRadius={'10'} css={{borderRadius:'8px 8px 0 0'}}>
                <Text align={'center'}color={'white'} fontSize={'18px'} fontWeight={'bold'}>Pro Pack - Rs 1.00</Text>
            </Box>

            <Box p={'4'}>
                <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
                    <Text>Subscribe and get all premium contents for free.</Text>
                    <Heading size={'md'}>Rs 1.00 Only</Heading>
                </VStack>

                <Button w={'full'} my={'8'} colorScheme='purple' onClick={submitHandler} isLoading={loading}>Buy Now</Button>
            </Box>

            <Box bg={'blackAlpha.600'} p={'4'} css={{borderRadius:'0 0 8px 8px'}}>
            <Heading color={'white'} size={'sm'}>100% refund on cancellation</Heading>
            

            <Text fontSize={'xs'} color={'white'}> Terms and condition apply.</Text>
            </Box>
        </VStack>
    </Container>
  )
}

export default Subscribe