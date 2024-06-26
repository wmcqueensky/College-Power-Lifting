import {Box, Heading, VStack, HStack, Text} from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {motion} from 'framer-motion'
import {smoothVariant} from '../../common/animations/smooth-slide-in-animation.jsx'
import {
  RANKING_COMPETITION_CUSTOM_PATH,
  CATEGORIES_PATH,
  RANKING_CATEGORY_CUSTOM_PATH,
  RANKING_GENDER_CUSTOM_PATH,
  RANKING_DISCIPLINE_CUSTOM_PATH,
  RANKING_PATH,
  GENDERS_PATH,
  DISCIPLINES_PATH,
} from '../../router/paths.js'

import backgroundImage from '../../common/assets/statistics-background.png'
import ChoiceButton from '../../common/components/choice-button.jsx'

import fetchAllCategories from '../../common/hooks/categories/use-categories.jsx'
import fetchCategoriesForCompetition from '../../common/hooks/categories/use-category-for-competition.jsx'
import fetchCategoriesForDiscipline from '../../common/hooks/categories/use-categories-for-discipline.jsx'
import fetchCategoriesForCompetitionDiscipline from '../../common/hooks/categories/use-categories-for-competition-discipline.jsx'
import fetchCategoriesForGenderDiscipline from '../../common/hooks/categories/use-categories-for-gender-discipline.jsx'
import fetchCategoriesForCompetitionGenderDiscipline from '../../common/hooks/categories/use-categories-for-competition-gender-discipline.jsx'
import fetchCategoriesForGender from '../../common/hooks/categories/use-category-for-gender.jsx'
import fetchCategoriesForCompetitionGender from '../../common/hooks/categories/use-category-for-competition-gender.jsx'
import fetchCompetitionInfo from '../../common/hooks/competitions/use-competition-for-ranking-info.jsx'
import fetchDisciplineInfo from '../../common/hooks/disciplines/use-discipline-for-ranking-info.jsx'

const CategoriesPage = () => {
  const [competitionInfo, setCompetitionInfo] = useState({})
  const [disciplineInfo, setDisciplineInfo] = useState({})
  const [categories, setCategories] = useState([])
  const {zawody: competitionId} = useParams()
  const {gender: gender} = useParams()
  const {konkurencja: disciplineId} = useParams()

  const navigate = useNavigate()

  const fetchScoresForAllCategories = async () => {
    if (competitionId && gender && !disciplineId) {
      navigate(`${RANKING_COMPETITION_CUSTOM_PATH}${competitionId}${GENDERS_PATH}${gender}`)
    }

    if (!competitionId && gender && !disciplineId) {
      navigate(`${RANKING_GENDER_CUSTOM_PATH}${gender}`)
    }

    if (competitionId && !gender && !disciplineId) {
      navigate(`${RANKING_COMPETITION_CUSTOM_PATH}${competitionId}`)
    }

    if (!competitionId && !gender && !disciplineId) {
      navigate(RANKING_PATH)
    }

    if (!competitionId && !gender && disciplineId) {
      navigate(`${RANKING_DISCIPLINE_CUSTOM_PATH}${disciplineId}`)
    }

    if (competitionId && gender && disciplineId) {
      navigate(
        `${RANKING_COMPETITION_CUSTOM_PATH}${competitionId}${GENDERS_PATH}${gender}${DISCIPLINES_PATH}${disciplineId}`
      )
    }

    if (!competitionId && gender && disciplineId) {
      navigate(`${RANKING_GENDER_CUSTOM_PATH}${gender}${DISCIPLINES_PATH}${disciplineId}`)
    }

    if (competitionId && !gender && disciplineId) {
      navigate(`${RANKING_COMPETITION_CUSTOM_PATH}${competitionId}${DISCIPLINES_PATH}${disciplineId}`)
    }
  }

  const fetchScoresForCompetitionCategory = async (categoryId) => {
    if (competitionId && gender && !disciplineId) {
      navigate(
        `${RANKING_COMPETITION_CUSTOM_PATH}${competitionId}${GENDERS_PATH}${gender}${CATEGORIES_PATH}${categoryId}`
      )
    }

    if (!competitionId && gender && !disciplineId) {
      navigate(`${RANKING_GENDER_CUSTOM_PATH}${gender}${CATEGORIES_PATH}${categoryId}`)
    }

    if (competitionId && !gender && !disciplineId) {
      navigate(`${RANKING_COMPETITION_CUSTOM_PATH}${competitionId}${CATEGORIES_PATH}${categoryId}`)
    }

    if (!competitionId && !gender && !disciplineId) {
      navigate(`${RANKING_CATEGORY_CUSTOM_PATH}${categoryId}`)
    }

    if (!competitionId && !gender && disciplineId) {
      navigate(`${RANKING_DISCIPLINE_CUSTOM_PATH}${disciplineId}${CATEGORIES_PATH}${categoryId}`)
    }

    if (competitionId && gender && disciplineId) {
      navigate(
        `${RANKING_COMPETITION_CUSTOM_PATH}${competitionId}${GENDERS_PATH}${gender}${DISCIPLINES_PATH}${disciplineId}${CATEGORIES_PATH}${categoryId}`
      )
    }

    if (!competitionId && gender && disciplineId) {
      navigate(
        `${RANKING_GENDER_CUSTOM_PATH}${gender}${DISCIPLINES_PATH}${disciplineId}${CATEGORIES_PATH}${categoryId}`
      )
    }

    if (competitionId && !gender && disciplineId) {
      navigate(
        `${RANKING_COMPETITION_CUSTOM_PATH}${competitionId}${DISCIPLINES_PATH}${disciplineId}${CATEGORIES_PATH}${categoryId}`
      )
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (competitionId) {
          const competitionData = await fetchCompetitionInfo(competitionId)
          setCompetitionInfo(competitionData)
        }

        if (disciplineId) {
          const disciplineData = await fetchDisciplineInfo(disciplineId)
          setDisciplineInfo(disciplineData)
        }

        let categoriesData = []

        if (competitionId && gender && !disciplineId) {
          categoriesData = await fetchCategoriesForCompetitionGender(competitionId, gender)
        }

        if (!competitionId && gender && !disciplineId) {
          categoriesData = await fetchCategoriesForGender(gender)
        }

        if (competitionId && !gender && !disciplineId) {
          categoriesData = await fetchCategoriesForCompetition(competitionId)
        }

        if (!competitionId && !gender && !disciplineId) {
          categoriesData = await fetchAllCategories()
        }

        if (competitionId && gender && disciplineId) {
          categoriesData = await fetchCategoriesForCompetitionGenderDiscipline(
            competitionId,
            gender,
            disciplineId
          )
        }

        if (!competitionId && gender && disciplineId) {
          categoriesData = await fetchCategoriesForGenderDiscipline(gender, disciplineId)
        }

        if (competitionId && !gender && disciplineId) {
          categoriesData = await fetchCategoriesForCompetitionDiscipline(competitionId, disciplineId)
        }

        if (!competitionId && !gender && disciplineId) {
          categoriesData = await fetchCategoriesForDiscipline(disciplineId)
        }

        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching categories:', error.message)
      }
    }

    fetchCategories()
  }, [competitionId, gender, disciplineId])

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
              <Text textAlign="center">{gender ? gender : 'Wszystkie Płcie'}</Text>
            </Box>
            <Box w={{base: '70px', md: '150px'}} mx={2} fontSize={{base: '12px', md: '16px'}}>
              <Text textAlign="center">{disciplineId ? disciplineInfo.name : 'Wszystkie Konkurencje'}</Text>
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
          </HStack>
        </VStack>

        <Heading fontSize={{base: '2rem', lg: '3rem', xl: '3.5rem', '2xl': '4rem'}} mb={4} textAlign="center">
          Wybierz kategorie:
        </Heading>

        <VStack maxH="70vh" overflowY="auto">
          <ChoiceButton onClick={() => fetchScoresForAllCategories()}>Wszystkie</ChoiceButton>

          {categories.map((category) => (
            <ChoiceButton
              key={category.category_id}
              onClick={() => fetchScoresForCompetitionCategory(category.category_id)}
            >
              {category.name}
            </ChoiceButton>
          ))}
        </VStack>
      </Box>
    </motion.div>
  )
}

export default CategoriesPage
