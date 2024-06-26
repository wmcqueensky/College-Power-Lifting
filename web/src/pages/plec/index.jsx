import {Box, Heading, HStack, VStack, Text} from '@chakra-ui/react'
import {useNavigate, useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import {smoothVariant} from '../../common/animations/smooth-slide-in-animation.jsx'
import {
  DISCIPLINES_PATH,
  DISCIPLINE_COMPETITION_CUSTOM_PATH,
  DISCIPLINE_GENDER_CUSTOM_PATH,
  GENDERS_PATH,
} from '../../router/paths.js'

import backgroundImage from '../../common/assets/statistics-background.png'
import ChoiceButton from '../../common/components/choice-button.jsx'

import fetchCompetitionInfo from '../../common/hooks/competitions/use-competition-for-ranking-info.jsx'

const GenderPage = () => {
  const {zawody: competitionId} = useParams()
  const [competitionInfo, setCompetitionInfo] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (competitionId) {
          const competitionData = await fetchCompetitionInfo(competitionId)
          setCompetitionInfo(competitionData)
        }
      } catch (error) {
        console.error('Error fetching data:', error.message)
      }
    }

    fetchData()
  }, [competitionId])

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
              <Text textAlign="center">{competitionId ? competitionInfo.name : 'Wszystkie Zawody'}</Text>
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
          </HStack>
        </VStack>

        <Heading fontSize={{base: '2rem', lg: '3rem', xl: '3.5rem', '2xl': '4rem'}} mb={4} textAlign="center">
          Wybierz płeć:
        </Heading>

        <ChoiceButton
          onClick={() =>
            navigate(
              competitionId ? `${DISCIPLINE_COMPETITION_CUSTOM_PATH}${competitionId}` : DISCIPLINES_PATH
            )
          }
        >
          Wszystkie
        </ChoiceButton>

        <ChoiceButton
          onClick={() =>
            navigate(
              competitionId
                ? `${DISCIPLINE_COMPETITION_CUSTOM_PATH}${competitionId}${GENDERS_PATH}M`
                : `${DISCIPLINE_GENDER_CUSTOM_PATH}M`
            )
          }
        >
          Mężczyźni
        </ChoiceButton>

        <ChoiceButton
          onClick={() =>
            navigate(
              competitionId
                ? `${DISCIPLINE_COMPETITION_CUSTOM_PATH}${competitionId}${GENDERS_PATH}K`
                : `${DISCIPLINE_GENDER_CUSTOM_PATH}K`
            )
          }
        >
          Kobiety
        </ChoiceButton>
      </Box>
    </motion.div>
  )
}

export default GenderPage
