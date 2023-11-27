import React from 'react';
import { Heading, Stack, VStack, Text, Button, Image, Box, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import vg from "../../assets/images/bgr.png";
import facebook from "../../assets/images/facebook.png";
import amazon from "../../assets/images/amazon.png";
import apple from "../../assets/images/apple.png";
import netflix from "../../assets/images/netflix.png";
import google from "../../assets/images/google.png";
import intro from "../../assets/videos/intro.mp4";
import "./home.css";

const Home = () => {
  return (
    <section className="home">
      <div className="container">
        <Stack
          direction={["column", "row"]}
          height="100%"
          justifyContent={["center", "space-between"]}
          alignItems="center"
          spacing={['16', '56']}
          padding={['4', '8']}
        >

          <VStack width={"full"} alignItems={['center', 'flex-start']} spacing={'6'}>
            <Heading size={['xl', '2xl', '3xl']} fontWeight="bold" textAlign="center">
              Learn From Top Teachers of FAANG
            </Heading>
            <Text fontSize={['md', 'lg']} textAlign="center">
              Find valuable content and desired courses designed by top teachers specially for you.
            </Text>
            <Link to={"/courses"}>
              <Button size={['md', 'lg']} colorScheme='purple'>Courses</Button>
            </Link>
          </VStack>

          <Image className="vector" boxSize={['md', 'lg']} src={vg} objectFit="contain" margin={['4', '0']} />

        </Stack>
      </div>

      <Box>
        <Heading color={'purple.600'} textAlign={"center"} fontFamily="body">Our Partners</Heading>
        <HStack alignItems={"center"} justifyContent={['center', 'space-evenly']} marginTop={['4', '8']}>
          <Image
            cursor="pointer"
            boxSize={['40px' , '100px']}
            objectFit="contain"
            src={facebook}
            _hover={{ transform: "translateY(-10px)" }}
            transition="transform 0.3s ease"
          />
          <Image
            cursor="pointer"
            boxSize={['40px' , '100px']}
            objectFit="contain"
            src={apple}
            _hover={{ transform: "translateY(-10px)" }}
            transition="transform 0.3s ease"
          />
          <Image
            cursor="pointer"
            boxSize={['40px' , '100px']}
            objectFit="contain"
            src={amazon}
            _hover={{ transform: "translateY(-10px)" }}
            transition="transform 0.3s ease"
          />
          <Image
            cursor="pointer"
            boxSize={['40px' , '100px']}
            objectFit="contain"
            src={netflix}
            _hover={{ transform: "translateY(-10px)" }}
            transition="transform 0.3s ease"
          />
          <Image
            cursor="pointer"
            boxSize={['40px' , '100px']}
            objectFit="contain"
            src={google}
            _hover={{ transform: "translateY(-10px)" }}
            transition="transform 0.3s ease"
          />
        </HStack>
      </Box>

      <div className="container2">
        <video autoPlay controls controlsList='nodownload nofullscreen noremoteplayback' src={intro} />
        <Text textAlign="center" mt="4">
          Explore our courses and start your learning journey today!
        </Text>
      </div>
    </section>
  );
}

export default Home;
