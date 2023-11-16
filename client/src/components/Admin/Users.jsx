import { Box, Button, Grid, HStack, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { RiDeleteBin3Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUsers, getAllUsers, updateUsersRole } from '../../redux/actions/admin'
import Loader from '../Layout/Loader'
import toast from 'react-hot-toast'

const Users = () => {

  
  const {users , loading , error , message}=useSelector((state) =>state.admin)


  const dispatch=useDispatch();

  const updateHandler= (userId)=>{
    console.log(userId)
    dispatch(updateUsersRole(userId));
    
  }
  const deleteHandler= (userId)=>{
    console.log(userId)
    dispatch(deleteUsers(userId))
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if(message){
      toast.success(message);
      dispatch({type:'clearMessage'})
    }
    
      
      dispatch(getAllUsers());
    
  }, [dispatch, error ,message]);

  return (
    <Grid minH={'100vh'} templateColumns={['1fr' , '5fr 1fr']}>
    

    

        <Box padding={["0" , "16"]}>
      <Heading textAlign={["center" , "left"]} my={"16"}>
      All Users
        
      </Heading>
      <TableContainer w={["100vw" , "full"]}>
        <Table variant={"simple"} size={"lg"}>
          <TableCaption>All available users in the database</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Subscription</Th>
              <Th isNumeric>Action</Th>
            </Tr>
          </Thead>

          <Tbody>
          {
          users &&  users.map(item =>(

          <Row key={item._id} item={item} updateHandler={updateHandler} deleteHandler={deleteHandler} loading={loading}></Row>
            ))
          }

          </Tbody>

        </Table>
      </TableContainer>
    </Box>
       
    
      
    
    <Sidebar></Sidebar>
  </Grid>
  )
}

export default Users

function Row({item , updateHandler , deleteHandler , loading}){
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td style={{color:item.subscription&& item.subscription.status === 'active' ? 'green' : 'red'}}>
  {item.subscription && item.subscription.status === 'active' ? 'Active' : 'Not Active'}
</Td>

      <Td isNumeric>
      <HStack justifyContent={'flex-end'}>
        <Button variant={'outline'} color="purple.600" onClick={()=> updateHandler(item._id)} isLoading={loading}>Change Role</Button>
        <Button onClick={()=> deleteHandler(item._id)} isLoading={loading}>
          <RiDeleteBin3Line/>
        </Button>
      </HStack>

      </Td>
      
    </Tr>
  )
}