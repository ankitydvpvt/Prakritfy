import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";

function CallToAction() {
  return (
    <Box bg="#fff" py={{ base: 16, md: 24 }}>
      <Box
        maxW="1100px"
        mx="auto"
        px={{ base: 4, md: 8 }}
        bgGradient="linear(to-r, #7b7c49, #263d21)"
        rounded="3xl"
        color="white"
        overflow="hidden"
        position="relative"
      >
        <Box
          position="absolute"
          inset="0"
          bgImage="radial-gradient(circle at top left, rgba(226, 170, 111, 0.4), transparent 45%)"
        />
        <Stack
          position="relative"
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "center" }}
          justify="space-between"
          spacing={8}
          px={{ base: 6, md: 12 }}
          py={{ base: 12, md: 16 }}
        >
          <Stack spacing={4} maxW="600px">
            <Text
              fontSize="sm"
              letterSpacing="widest"
              textTransform="uppercase"
              color="whiteAlpha.700"
            >
              Let's begin
            </Text>
            <Heading fontSize={{ base: "2rem", md: "2.6rem" }} color="white">
              Begin a 1:1 chronic condition plan with our wellness team.
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color="whiteAlpha.800">
              Receive root-cause decoding, lab interpretation, and a disease remission blueprint tailored to your biomarkers.
            </Text>
          </Stack>
          <Stack className="" spacing={4} minW={{ base: "full", md: "260px" }}>
            <Button size="lg" bg="#e2aa6f" rounded="full" color="white">
              Get Started
            </Button>
            <Button size="lg" variant="outline" rounded="full" color="white">
              View Wellness Programs
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default CallToAction;
