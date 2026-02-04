"use client";

import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiDroplet, FiHeart, FiTrendingUp } from "react-icons/fi";

import AnimatedImage from "@/components/home/AnimatedImage";
import ValuePropositions from "@/components/home/ValuePropositions";
import OurStory from "@/components/home/OurStory";
import Categories from "@/components/home/Categories";
import Testimonials from "@/components/home/Testimonials";
import BlogHighlights from "@/components/home/BlogHighlights";
import CallToAction from "@/components/home/CallToAction";
import VideosSection from "@/components/home/VideosSection";
import Form from "@/components/home/Form";

// Motion wrapper
const MotionBox = motion(Box);

// SAFE data
const highlights = [
  { icon: "heart", title: "Root Cause Analysis" },
  { icon: "trend", title: "Clinical Research Validation" },
  { icon: "droplet", title: "Software Driven  Management" },
];

// Icon map
const iconMap = {
  heart: FiHeart,
  trend: FiTrendingUp,
  droplet: FiDroplet,
};

export default function Tree_section() {
  return (
    <div>
      <Box
        bgGradient="linear(to-br, deepRed, brand.700)"
        color="white"
        pt={{ base: 16, md: 28 }}
        pb={{ base: 20, md: 28 }}
        position="relative"
        overflow="hidden"
      >
        {/* Background glow */}
        <Box
          position="absolute"
          inset="0"
          bgImage="radial-gradient(circle at top right, rgba(226, 170, 111, 0.35), transparent 45%)"
        />

        {/* Animated container */}
        <MotionBox
          position="relative"
          maxW="1200px"
          mx="auto"
          px={{ base: 4, md: 8 }}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 12, md: 16 }}
          >
            {/* LEFT CONTENT */}
            <Stack spacing={8} maxW="520px" mx={{ base: "auto", md: "0" }}>
              <Heading
                fontSize={{ base: "2.4rem", md: "3.4rem" }}
                lineHeight="1.1"
                textAlign={{ base: "center", md: "left" }}
              >
                Chronic Disease Management Through Functional Medicine
              </Heading>

              {/* Text block (color preserved) */}
              <Stack spacing={1} textAlign="center">
                <Text
                  fontWeight="bold"
                  fontSize={{ base: "2xl", md: "2xl" }}
                  color="whiteAlpha.800"
                >
                  INTEGRATING
                </Text>

                <Text
                  fontWeight="bold"
                  fontSize={{ base: "md", md: "lg" }}
                  color="whiteAlpha.800"
                >
                  Ancient wisdom · Modern science · Nutrition
                </Text>

                <Text
                  fontWeight="bold"
                  fontSize={{ base: "md", md: "lg" }}
                  color="whiteAlpha.800"
                >
                  Lifestyle Approch · Herbal Medication
                </Text>
              </Stack>

              {/* CTA */}
              <HStack spacing={4} justify="center" flexWrap="wrap">
                <Button
                  size="lg"
                  bg="#026aa2"
                  color="black"
                  rounded="full"
                  _hover={{ bg: "#afd4e6" }}
                >
                  Book Now
                </Button>
              </HStack>

              {/* Highlights */}
              <Stack
                spacing={4}
                direction={{ base: "column", md: "row" }}
                align={{ base: "center", md: "flex-start" }}
              >
                {highlights.map((item) => {
                  const IconComponent =
                    iconMap[item.icon as keyof typeof iconMap];

                  return (
                    <HStack
                      key={item.title}
                      spacing={3}
                      bg="whiteAlpha.100"
                      px={4}
                      py={3}
                      rounded="xl"
                      w={{ base: "100%", sm: "80%", md: "150px" }}
                      justify={{ base: "center", md: "flex-start" }}
                    >
                      <Icon as={IconComponent} boxSize={5} color="red" />
                      <Text fontWeight="500" color="white">
                        {item.title}
                      </Text>
                    </HStack>
                  );
                })}
              </Stack>
            </Stack>

            {/* RIGHT IMAGE */}
            <Box position="relative" w="100%" maxW="500px" mx="auto">
              {/* Blur glow */}
              <Box
                position="absolute"
                inset="0"
                rounded="3xl"
                bg="whiteAlpha.200"
                filter="blur(60px)"
              />

              <AnimatedImage />

              {/* WhatsApp floating */}
              <a
                href="https://wa.me/9911024406"
                target="_blank"
                className="group fixed top-4 right-4 md:top-6 md:right-6 z-50"
              >
                <span className="absolute right-16 top-1/2 -translate-y-1/2 scale-0 rounded bg-black px-3 py-1 text-sm text-white transition-all group-hover:scale-100">
                  Chat on WhatsApp
                </span>

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg hover:scale-110 transition">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    className="h-8 w-8"
                    alt="WhatsApp"
                  />
                </div>
              </a>
            </Box>
          </SimpleGrid>
        </MotionBox>

        <Form />
      </Box>

      <ValuePropositions />
      <OurStory />
      <Categories />
      <Testimonials />
      <VideosSection />
      <BlogHighlights />
      <CallToAction />
    </div>
  );
}
