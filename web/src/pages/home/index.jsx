import {useState, useEffect, useRef} from 'react'
import {VStack, Heading, Box, Button, Image} from '@chakra-ui/react'
import {motion} from 'framer-motion'
import {useNavigate} from 'react-router-dom'
import {smoothVariant} from '../../common/animations/smooth-slide-in-animation.jsx'
import {REGISTRATION_PATH} from '../../router/paths.js'
import backgroundImage from './images/background.png'
import championshipImage from './images/double-lift.png'
import CookiePopup from '../../common/components/cookie-popup.jsx'

const HomePage = () => {
  const navigate = useNavigate()
  const boxRef1 = useRef(null)
  const boxRef2 = useRef(null)
  const [isVisible1, setIsVisible1] = useState(true)
  const [isVisible2, setIsVisible2] = useState(false)
  const [cookieAccepted, setCookieAccepted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (boxRef1.current && window.scrollY > boxRef1.current.offsetTop - window.innerHeight) {
        setIsVisible1(true)
      }
      if (boxRef2.current && window.scrollY > boxRef2.current.offsetTop - window.innerHeight) {
        setIsVisible2(true)
      }
    }
    window.scrollTo(0, 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const storedCookieChoice = localStorage.getItem('cookieAccepted')
    if (storedCookieChoice === 'true') {
      setCookieAccepted(true)
    }
  }, [])

  const handleAcceptCookie = () => {
    setCookieAccepted(true)
    localStorage.setItem('cookieAccepted', 'true')
  }

  const handleDeclineCookie = () => {
    setCookieAccepted(true)
    localStorage.setItem('cookieAccepted', 'true')
  }

  return (
    <>
      {!cookieAccepted && <CookiePopup onAccept={handleAcceptCookie} onDecline={handleDeclineCookie} />}
      <Box bgImage={`url(${backgroundImage})`} backgroundSize="cover" backgroundPosition="center" h="100vh">
        <motion.div
          variants={smoothVariant}
          initial="hidden"
          animate={isVisible1 ? 'visible' : 'hidden'}
          ref={boxRef1}
        >
          <VStack>
            <VStack
              mt="10px"
              mr={{base: '0', sm: '50px', md: '100px', lg: '200px', xl: '310px', '2xl': '350px'}}
              bgColor="rgba(0, 0, 0, 0.5)"
              borderRadius="20"
              p="10"
              alignItems="left"
            >
              <Heading
                fontSize={{base: '1.5rem', sm: '2rem', md: '3rem', '2xl': '3.5rem'}}
                fontWeight="100"
                lineHeight="108%"
              >
                THE CLASSIC
              </Heading>
              <Heading
                fontSize={{base: '3rem', sm: '4.5rem', md: '5rem', lg: '5.5rem', xl: '6rem', '2xl': '6.5rem'}}
                lineHeight="108%"
              >
                POWERLIFTING <br /> GAMES
              </Heading>
            </VStack>
            <Button
              size={{base: 'xl', lg: 'xxl'}}
              colorScheme="black"
              variant="outline"
              borderRadius="3xl"
              mt="8"
              p="8"
              fontSize={{base: '2rem', sm: '2.5rem', lg: '3rem', '2xl': '3.5rem'}}
              bgColor="rgba(0, 0, 0, 0.5)"
              _hover={{
                bg: 'rgba(255, 0, 0, 0.4)',
                color: 'white',
              }}
              onClick={() => {
                navigate(REGISTRATION_PATH)
              }}
            >
              Zapisz się teraz!
            </Button>
          </VStack>
        </motion.div>
      </Box>
      <Box backgroundPosition="center" h="100vh" color="white" ref={boxRef2}>
        <motion.div
          variants={smoothVariant}
          initial="hidden"
          animate={isVisible2 ? 'visible' : 'hidden'}
          transition={{delay: 0.5}}
          ref={boxRef2}
        >
          <VStack textAlign="center">
            <Image src={championshipImage} maxWidth="90%" mt="120px"></Image>
            <Heading
              fontSize={{base: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem', xl: '3.5rem', '2xl': '4rem'}}
            >
              20-21 April 2024
            </Heading>
            <Heading
              fontSize={{base: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem', xl: '3.5rem', '2xl': '4rem'}}
              mt="10px"
            >
              <span style={{color: 'red'}}>THE CLASSIC</span> POWERLIFTING GAMES
            </Heading>
          </VStack>
        </motion.div>
      </Box>
    </>
  )
}

export default HomePage
