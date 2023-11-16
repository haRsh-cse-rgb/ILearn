import React from 'react'
import { ColorModeSwitcher } from '../../ColorModeSwitcher'
import { Button, VStack, useDisclosure } from '@chakra-ui/react'
import {RiMenu2Line} from 'react-icons/ri';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
import { Link, redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/user';



const LinkComponent = ({url="/" , title="Home" , onClick}) => (
    <Link to={url}>
       <Button variant={"ghost"} onClick={onClick}>{title}</Button>
    </Link>
   )

   


const Header = ({isAuthenticated=false , user}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

const dispatch = useDispatch()

    const logOutHandler=() =>{
    
      dispatch(logout())
      redirect("/login");
     }
    

    
  return (
    <>
    <ColorModeSwitcher/>

    <Button colorScheme='purple' width={'12'} height={'12'} rounded={'full'} top={'4'} left={'4'} onClick={onOpen}>
        <RiMenu2Line />
    </Button>

    <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay backdropFilter={"blur(3px)"}/>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader  borderBottomWidth={'1px'} fontWeight={'bold'} color={'purple.600'}>I Learn</DrawerHeader>

          <DrawerBody>
          <VStack spacing={'4'} alignItems={'flex-start'}>
          <LinkComponent url="/" title="Home" onClick={onClose}/>
          <LinkComponent url="/courses" title="All Courses" onClick={onClose}/>
          <LinkComponent url="/request" title="Request Course" onClick={onClose}/>
          <LinkComponent url="/contact" title="Contact Us" onClick={onClose}/>
          <LinkComponent url="/about" title="About Us" onClick={onClose}/>
          <LinkComponent url="/subscribe" title="Subscribe" onClick={onClose}/>
          
          </VStack>
            
          </DrawerBody>

          {isAuthenticated ? (
            <>
            <DrawerFooter>
            {
                user && user.role==='admin' && (
                    <Button variant='outline' mr={3} onClick={onClose}>
            <Link to={"admin/dashboard"}>
              DashBoard
              </Link>
              </Button>
                )
            }
            <Button variant='outline' mr={3} onClick={onClose}>
            <Link to={"/profile"}>
              Profile
              </Link>
            </Button>
            <Button colorScheme='purple' onClick={logOutHandler}>LogOut</Button>
            
          </DrawerFooter>
            </>

          ) : (
<>
            <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
            <Link to={"/login"}>
              Login
              </Link>
            </Button>
            <Button colorScheme='purple' onClick={onClose}><Link to={'/register'}>SignUp</Link></Button>
          </DrawerFooter>
          </>

          )}

         
        </DrawerContent>
      </Drawer>

    </>
  )
}




export default Header
