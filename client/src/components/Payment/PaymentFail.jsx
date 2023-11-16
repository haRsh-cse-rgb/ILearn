import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';

const PaymentFail = () => {
  return (
    <Container h={'100vh'} p={'12'}>
      <Heading textAlign={'center'} my={'8'}>
        Payment Failed
      </Heading>

      <VStack boxShadow={'lg'} pb={'16'} alignItems={'stretch'} borderRadius={'lg'}>
        <Box bg="red.600" color={'white'} p={'4'} borderRadius={'10'} css={{ borderRadius: '8px 8px 0 0' }}>
          <Text align={'center'} color={'white'} fontSize={'18px'} fontWeight={'bold'}>
            Payment Failed
          </Text>
        </Box>

        <Box p={'4'}>
          <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
            <Text>Some error occurred while processing your payment. Please try again after some time.</Text>
            <Heading size={'4xl'} color={'red.600'}>
              <RiErrorWarningFill />
            </Heading>
          </VStack>

          <Link to="/subscribe">
            <Button as="a" variant={'link'} w={'full'}>
              Try Again
            </Button>
          </Link>
        </Box>
      </VStack>
    </Container>
  );
};

export default PaymentFail;
