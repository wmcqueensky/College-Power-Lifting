import {Box, Heading, VStack, HStack, Text} from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import {smoothVariant} from '../../common/animations/smooth-slide-in-animation.jsx'
import {GENDERS_PATH, GENDER_COMPETITION_CUSTOM_PATH} from '../../router/paths.js'

import backgroundImage from '../../common/assets/statistics-background.png'
import ChoiceButton from '../../common/components/choice-button.jsx'

import fetchCompetitions from '../../common/hooks/competitions/use-competitions.jsx'

const CompetitionsPage = () => {
  const [competitions, setCompetitions] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCompetitionsData = async () => {
      const data = await fetchCompetitions()

      if (data) {
        setCompetitions(data)
      }
    }

    fetchCompetitionsData()
  }, [])

  return (
    <motion.div variants={smoothVariant} initial="hidden" animate="visible">
      <Box
        bgImage={`url(${backgroundImage})`}
        backgroundSize="cover"
        backgroundPosition="center"
        h="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <VStack>
          <HStack h={{base: '20%', md: '10%'}} mb="2">
            <Box w={{base: '70px', md: '150px'}} mx={2} fontSize={{base: '12px', md: '16px'}}>
              <Text textAlign="center">Zawody</Text>
            </Box>
            <Box w={{base: '70px', md: '150px'}} mx={2} fontSize={{base: '12px', md: '16px'}}>
              <Text textAlign="center">Płeć</Text>
            </Box>
            <Box w={{base: '70px', md: '150px'}} mx={2} fontSize={{base: '12px', md: '16px'}}>
              <Text textAlign="center">Konkurencja</Text>
            </Box>
            <Box w={{base: '70px', md: '150px'}} mx={2} fontSize={{base: '12px', md: '16px'}}>
              <Text textAlign="center">Kategoria</Text>
            </Box>
          </HStack>

          <HStack h="20%">
            <Box
              borderBottom="10px solid"
              borderColor="red"
              borderRadius="4"
              w={{base: '70px', md: '150px'}}
              mx={2}
            />
            <Box
              borderBottom="10px solid"
              borderColor="white"
              borderRadius="4"
              w={{base: '70px', md: '150px'}}
              mx={2}
            />
            <Box
              borderBottom="10px solid"
              borderColor="white"
              borderRadius="4"
              w={{base: '70px', md: '150px'}}
              mx={2}
            />
            <Box
              borderBottom="10px solid"
              borderColor="white"
              borderRadius="4"
              w={{base: '70px', md: '150px'}}
              mx={2}
            />
          </HStack>
        </VStack>

        <Heading
          fa="h1"
          fontSize={{base: '2rem', lg: '3rem', xl: '3.5rem', '2xl': '4rem'}}
          mb={4}
          textAlign="center"
        >
          Wybierz zawody:
        </Heading>
        <VStack maxH="70vh" overflowY="auto">
          <ChoiceButton onClick={() => navigate(`${GENDERS_PATH}`)}>Wszystkie</ChoiceButton>

          {competitions.map((competition) => (
            <ChoiceButton
              onClick={() => navigate(`${GENDER_COMPETITION_CUSTOM_PATH}${competition.competition_id}`)}
              key={competition.name}
            >
              {competition.name}
            </ChoiceButton>
          ))}
        </VStack>
      </Box>
    </motion.div>
  )
}

export default CompetitionsPage
