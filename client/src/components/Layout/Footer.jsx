import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import {TiSocialYoutubeCircular , TiSocialInstagramCircular} from "react-icons/ti"
import {DiGithub} from "react-icons/di"

const Footer = () => {
  return (
    <Box padding={'4'} bg={"blackAlpha.300"} minHh={'10vh'}>
        <Stack direction={['column' , 'row']} >
            <VStack alignItems={['center' , 'flex-start']} width={'full'}>
            <Heading >All Rights Reserved</Heading>
            <Heading size={'sm'}color={'purple.600'}>@I Learn</Heading>

            </VStack>

            <HStack spacing={['2' , '10'] } justifyContent={'center'} fontSize={'40'}>
                <a href='#'>
                    <TiSocialInstagramCircular/>
                </a>
                <a href='#'>
                    <TiSocialYoutubeCircular/>
                </a>
                <a href='#'>
                    <DiGithub/>
                </a>
            </HStack>
        </Stack>
    </Box>
  )
}

export default Footer