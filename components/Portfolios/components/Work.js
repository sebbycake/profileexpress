import { Stack, Card, CardBody, CardFooter, 
  Heading, Text, Button, Image, Tag, HStack } from '@chakra-ui/react'

function Work({ work }) {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
    >
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
        alt='Caffe Latte'
      />

      <Stack>
        <CardBody>
          <Stack>
            <Heading size='md'>{ work.position }</Heading>
            <HStack spacing={10}>
              <Tag size='md'>{ work.organisation }</Tag>
              <Text fontSize='md'>{`${work.startDate} - ${work.endDate}`}</Text>
            </HStack>
          </Stack>
          <Text py='2'>
            { work.description }
          </Text>
        </CardBody>

        <CardFooter>
          <Button colorScheme='linkedin'>LinkedIn</Button>
        </CardFooter>
      </Stack>
  </Card>
  );
}

export default Work;
