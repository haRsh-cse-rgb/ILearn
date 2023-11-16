import { Box, Grid, HStack, Heading, Progress, Stack, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri'
import { DoughnutChart, LineChart } from './Chart'
import { useDispatch, useSelector } from 'react-redux'
import { getDashboardStats } from '../../redux/actions/admin'
import Loader from '../Layout/Loader'

const Data =({title , qty , qtyPercentage , profit}) =>(

    <Box w={['full' , '20%']} p="8" borderRadius={'lg'} boxShadow={'lg'}>
        <Text>{title}</Text>

        <HStack spacing={'6'}>

            <Text fontSize={'2xl'} fontWeight="bold">{qty}</Text>

            <HStack>
                <Text>{`${qtyPercentage}`}</Text>
                {
                    profit ? (
                        <RiArrowUpLine color='green'/>
                    ) : (
                        <RiArrowDownLine color='red'/>
                    )
                }
            </HStack>
        </HStack>

        <Text opacity={0.6}>Since Last Month</Text>
    </Box>


)

const Bar=({title , value , profit})=>(
    <Box py="4" px={["0" , "20"]}>

    <Heading size={"sm"} mb="2">{title}</Heading>

    <HStack w="full" alignItems={"center"}>
        <Text>{profit ? '0%' : `-${value}%`}</Text>
        <Progress w="full" value={profit? value : 0} colorScheme="purple"></Progress>
        <Text>{`${value>100 ? value:100}%`}</Text>
    </HStack>

    </Box>
)

const Dashboard = () => {

    const {loading ,  stats,
        usersCount,
        subscriptionCount,
        viewsCount,
        userProfit,
        subscriptionProfit,
        viewsProfit,} = useSelector(state => state.admin)




    const dispatch= useDispatch();

    useEffect(()=>{
        dispatch(getDashboardStats())
    } , [dispatch])


  return (
  <Grid minH={'100vh'} templateColumns={['1fr' , '5fr 1fr']}>
  

    {loading || !stats ?  <Loader/> : (
        <Box boxSizing={'border-box'} py={"16"} px={['4' , '0']}>
        <Text textAlign={'center'} opacity={0.5} >Last Updated On {String(new Date(stats[11].createdAt)).split('G')[0]}</Text>

        <Heading ml={['0' , '16']} mb="16" textAlign={['center' , 'left']}>Dashboard</Heading>

        <Stack direction={['column' , 'row']} minH='24' justifyContent={'space-evenly'}>
            <Data title="Views" qty={viewsCount} qtyPercentage={3} profit={viewsProfit}></Data>
            <Data title="Users" qty={usersCount} qtyPercentage={30} profit={userProfit}></Data>
            <Data title="Subscription" qty={subscriptionCount} qtyPercentage={2} profit={subscriptionProfit}></Data>
        </Stack>

        <Box m={["0" , '16']}
        borderRadius="lg"
        p={['0' , '16']}
        mt={['4' , '16']}
        boxShadow={'lg'}>
            <Heading textAlign={['center' , 'left']} size={'md'} children="Views graph" pt={['8' , '0']} ml={['0' , '16']}/>
            <LineChart dataArray={stats.map(i => i.views)}/>

    </Box>

            <Grid templateColumns={["1fr" , "2fr 1fr"]}>
                <Box p="4">
                    <Heading textAlign={['center' , 'left']} size="md" my="8" ml={['0' , '16']}>Progress Bar</Heading>

                    <Box>

                    <Bar title="Views" value={30} profit={viewsProfit}/>
                    <Bar title="Users" value={78} profit={userProfit}/>
                    <Bar title="Subscription" value={20} profit={subscriptionProfit}/>

                    </Box>
                </Box>

                <Box p={["0" , "16"]} boxSizing='border-box' py="4">
                    <Heading textAlign={"center"} size="md" mb="4" children="Users">

                    </Heading>

                    <DoughnutChart users={[subscriptionCount , usersCount-subscriptionCount]}/>
                </Box>
            </Grid>
        </Box>
    )}

    <Sidebar></Sidebar>
  
  </Grid>
  )
    
  
}

export default Dashboard