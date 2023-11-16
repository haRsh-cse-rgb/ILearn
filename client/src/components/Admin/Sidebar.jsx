import { Button, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiAddCircleFill, RiDashboardFill, RiEyeFill, RiUser3Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const Sidebar = () => {


  return (
    <VStack spacing={'8'} p={"16"} boxShadow={'xl'} >
        <LinkButton Icon={RiDashboardFill} text="Dashboard" url={'dashboard'}/>
        <LinkButton Icon={RiEyeFill} text="Courses" url={'courses'}/>
        <LinkButton Icon={RiUser3Fill} text="Users" url={'users'}/>
        <LinkButton Icon={RiAddCircleFill} text="Create Courses" url={'createcourse'}/>
      
    </VStack>
  )
}

export default Sidebar

function LinkButton ({url , Icon , text}){

    return (
        
            <Link to={`/admin/${url}`} >
                <Button fontSize={'larger'} variant="ghost"><Icon style={{margin:'4px'}}/>
                {text}</Button>
            </Link>
      
      )

}