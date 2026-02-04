"use client";

import NextLink from "next/link";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const footerLinks = [
  {
    title: "Company",
    items: [
      { label: "About", to: "/about" },
      { label: "Our Story", to: "/about#story" },
      { label: "Impact", to: "/about#impact" },
      { label: "Research & Stories", to: "/blog" },
    ],
  },
  {
    title: "Customer Care",
    items: [
      { label: "Conditions", to: "/conditions" },
      { label: "Herbal Kits", to: "/products" },
      { label: "Wellness Programs", to: "/wellness" },
      { label: "Contact Support", to: "/contact" },
      { label: "FAQ", to: "/contact#faq" },
    ],
  },
];

const socials = [
  { icon: <FaInstagram />, label: "Instagram", href: "#" },
  { icon: <FaFacebookF />, label: "Facebook", href: "#" },
  { icon: <FaYoutube />, label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <Box as="footer" bg="deepGreen" color="white" mt={20} pt={16}>
      <Flex
        maxW="1200px"
        mx="auto"
        px={{ base: 4, md: 8 }}
        direction="column"
        gap={12}
      >
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={12}>
          {/* Brand */}
          <Box>
            <Flex align="center" gap={3} mb={6}>
              <Box
                bg="#6da95c"
                color="white"
                rounded="full"
                px={3}
                py={1}
                fontWeight="700"
                letterSpacing="widest"
                fontSize="sm"
              >
                PR
              </Box>
              <Heading size="md">Prakritify</Heading>
            </Flex>

            <Text color="whiteAlpha.800" mb={4}>
              Elevating ancient Ayurvedic wisdom with modern research to craft
              high-efficacy herbal solutions tailored for today&apos;s
              lifestyles.
            </Text>

            <Flex gap={3}>
              {socials.map((social) => (
                <Button
                  key={social.label}
                  as="a"
                  href={social.href}
                  aria-label={social.label}
                  size="sm"
                  rounded="full"
                  variant="ghost"
                  color="whiteAlpha.900"
                  _hover={{ bg: "whiteAlpha.200" }}
                >
                  {social.icon}
                </Button>
              ))}
            </Flex>
          </Box>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <Box key={section.title}>
              <Heading size="sm" textTransform="uppercase" mb={4}>
                {section.title}
              </Heading>
              <Stack spacing={3}>
                {section.items.map((item) => (
                  <Link
                    key={item.label}
                    as={NextLink}
                    href={item.to}
                    color="whiteAlpha.800"
                    _hover={{ color: "#e2aa6f" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </Stack>
            </Box>
          ))}

          {/* Newsletter */}
          <Box>
            <Heading size="sm" textTransform="uppercase" mb={4}>
              Stay in the know
            </Heading>
            <Text color="whiteAlpha.800" mb={6}>
              Ayurvedic wellness tips, seasonal rituals, and limited product
              drops, delivered weekly.
            </Text>
            <Stack spacing={4}>
              <input
                type="tel"
                name="phone"
                
                placeholder="Enter Your Number"
                required
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                style={{
                  height:30,
                  padding:15,
                  color: "black",
                  caretColor: "black",
                  background:"white"
                }}
                className="w-full py-2 text-black outline-none rounded-full"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
              />
              <Button rounded="full" bg="#af8355" _hover={{ bg: "#e2aa6f" }}>
                BOOK
              </Button>
            </Stack>
          </Box>
        </SimpleGrid>

        <Divider borderColor="whiteAlpha.200" />

        {/* Bottom Bar */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          gap={4}
          pb={8}
          fontSize="sm"
          color="whiteAlpha.700"
        >
          <Text color="#5a4237">
            © {new Date().getFullYear()} Prakritify Ayurveda. All rights
            reserved.
          </Text>

          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Link
              as={NextLink}
              href="/contact#privacy"
              _hover={{ color: "#e2aa6f" }}
            >
              Privacy Policy
            </Link>
            <Link
              as={NextLink}
              href="/contact#terms"
              _hover={{ color: "#e2aa6f" }}
            >
              Terms of Service
            </Link>
            <Link
              as={NextLink}
              href="/contact#faq"
              _hover={{ color: "#e2aa6f" }}
            >
              FAQ
            </Link>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
