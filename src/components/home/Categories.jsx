import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Tag,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";



const productCategories = [
  {
    img: "https://d3upjtc0wh66ez.cloudfront.net/wp-content/uploads/2024/09/diabetes-symptoms-and-treatment.jpg",
    title: "Diabetes",
    description:
      "Balance blood sugar, enhance insulin sensitivity, and protect pancreatic function with targeted botanicals.",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/5c319e0d25bf02353683db93/1569122403100-ZAIVQ0YC8E702MOUQJG1/shutterstock_1035434050-1-e1532966569521.jpg",
    title: "PCOS",
    description:
      "Regulate cycles, support hormonal harmony, and reduce inflammation with clinically-backed Ayurvedic blends.",
  },
  {
    img: "https://medlineplus.gov/images/LiverDisease_share.jpg",
    title: "Liver",
    description:
      "Detoxify, regenerate, and elevate liver performance with antioxidant-rich herbs and nutraceuticals.",
  },
  {
    img: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=900&q=80",
    title: "Blood Pressure",
    description:
      "Stabilize blood pressure, improve circulation, and ease stress responses with adaptogenic formulations.",
  },
  {
    img: "https://english-blog.s3.amazonaws.com/uploads/2020/02/Home-Health-Care-The-New-Trend-In-India.jpg",
    title: "Heart Health",
    description:
      "Strengthen cardiac function, optimize lipids, and protect vascular integrity with cardiotonic herbs.",
  },
  {
    img: "https://www.lalpathlabs.com/blog/wp-content/uploads/2018/01/Lipid.jpg",
    title: "Lipids",
    description:
      "Manage cholesterol, reduce triglycerides, and boost metabolic resilience through evidence-led botanicals.",
  },
];

function Categories() {
  const router = useRouter();
  return (
    <Box px="20px" py={{ base: 16, md: 20 }}>
      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
        <Stack spacing={4} textAlign="center" mb={12}>
          <Text
            textTransform="uppercase"
            fontSize="sm"
            letterSpacing="widest"
            color="#fff"
          >
            Conditions we specialise in
          </Text>
          <Heading color="#000" fontSize={{ base: "2rem", md: "2.6rem" }}>
            Doctor-designed disease programmes backed by potent herbology.
          </Heading>
          <Text maxW="620px" mx="auto" color="#fff">
            Every condition is supported by clinically validated herbal stacks,
            nutrition roadmaps, and coaching to address underlying dysfunction.
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {productCategories.map((item) => (
            <Stack
              key={item.title}
              bg="black"
              border="1px solid"
              borderColor="black"
              rounded="2xl"
              overflow="hidden"
              boxShadow="2xl"
              spacing={0}
              transition="transform 0.3s ease"
              _hover={{ transform: "translateY(-8px)" }}
            >
              <Image
                src={item.img}
                alt={item.title}
                h="220px"
                w="full"
                objectFit="cover"
              />
              <Stack spacing={4} p={6}>
                <Tag
                  alignSelf="flex-start"
                  bg="#f5f8f3"
                  color="#0aa4eb"
                  rounded="full"
                  px={3}
                  py={1}
                >
                  {item.title}
                </Tag>
                <Text color="#9facd0">{item.description}</Text>
               <Button onClick={() => router.push("/contact")}
                  rounded="full"
                  color="white"
                  bg="#0aa4eb"
                  fontSize="lg"
                  size="sm"
                  alignSelf="flex-start"
                >
                 Book Free Consultation
                </Button>
              </Stack>
            </Stack>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Categories;
