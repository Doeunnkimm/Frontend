'use client'

import { BoxIcon, Icon } from '@/components/Icon/Icon'
import {
  Box,
  Flex,
  Grid,
  ListItem,
  Spacer,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import {
  faBars,
  faCaretDown,
  faCircleDot,
  faCodePullRequest,
  faInbox,
  faMagnifyingGlass,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'

import { BorderBox } from '@/components/Box/Box'
import { borderCSS } from '@/styles/common'
import Image from 'next/image'

const Header = () => {
  return (
    <header>
      <Flex
        width='full'
        height='4rem'
        bg='gray.400'
        borderBottom='1px solid'
        borderColor='gray.400'
        align='center'
        p='16px'
        gap='4'>
        <BoxIcon icon={faBars} />
        <Image
          src='https://cdn-icons-png.flaticon.com/512/25/25231.png'
          alt='logo'
          width='32'
          height='32'
        />
        <UnorderedList
          display='flex'
          gap='1.5'
          m='0'
          fontSize='sm'>
          <ListItem>Doeunnkimm</ListItem>
          <ListItem>/</ListItem>
          <ListItem fontWeight='semibold'>chakra-practice</ListItem>
        </UnorderedList>
        <Spacer />
        <Flex
          {...borderCSS}
          minW='20rem'
          minH='100%'
          align='center'
          px='2'
          gap='3'>
          <Icon icon={faMagnifyingGlass} />
          <Text
            fontSize='sm'
            color='gray.100'>
            Type to / to search
          </Text>
        </Flex>
        <Grid
          gridAutoFlow='column'
          gap='2'
          minH='100%'>
          <Text
            color='gray.300'
            mr='1'>
            |
          </Text>
          <BorderBox
            px='2'
            gap='2'>
            <Icon icon={faPlus} />
            <Icon icon={faCaretDown} />
          </BorderBox>
          <BoxIcon icon={faCircleDot} />
          <BoxIcon icon={faCodePullRequest} />
          <BoxIcon icon={faInbox} />
          <Box
            borderRadius='full'
            overflow='hidden'>
            <Image
              src='https://avatars.githubusercontent.com/u/112946860?v=4'
              alt='profile-img'
              width='35'
              height='35'
            />
          </Box>
        </Grid>
      </Flex>
    </header>
  )
}

export default Header
