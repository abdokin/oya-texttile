import {
  Flex,
  Box,
  Text,
  Button,
  VStack,
  FormControl,
  Input,
  Textarea,
  Stack,
  Select,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import SocialButton from "./SocialButton";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import TransDiv from "./TransDev";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import client from "../lib/apollo-client";
import Link from "next/link";

const StyledInput = ({ label, setInput }: { label: string; setInput: any }) => {
  return (
    <FormControl>
      <Input
        p="1"
        fontSize="14"
        bg="white"
        placeholder={label}
        borderRadius={0}
        border={0}
        borderBottom="1px"
        __css={{
          borderBottom: "1px solid",
          borderColor: "black",
        }}
        _focus={{
          outline: "none",
          borderColor: "transparent",
          outlineColor: "transparent",
        }}
        _placeholder={{
          color: "black",
        }}
        onChange={(e) => setInput(e.target.value)}
      />
    </FormControl>
  );
};

const SUBMIT = gql`
  mutation submit(
    $name: String
    $email: String
    $phone: String
    $message: String
    $country: String
    $select: String
  ) {
    submitForm(
      input: {
        formId: 3
        data: [
          { id: 9, value: $name }
          { id: 10, value: $phone }
          { id: 11, value: $email }
          { id: 12, value: $country }
          { id: 13, value: $select }
          { id: 15, value: $message }
        ]
      }
    ) {
      errors {
        fieldId
        message
        slug
      }
      message
      success
    }
  }
`;

export default function Contact() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Country, setCountry] = useState("");
  const [Message, setMessage] = useState("");
  const [Selected, setSelect] = useState("");

  const [submit, { data, loading, error }] = useMutation(SUBMIT);
  if (loading)
    return (
      <Box w="fit-content" margin={"auto"} py="4">
        <Spinner px="4" />
        Submitting...
      </Box>
    );
  if (error) return `Submission error! ${error.message}`;
  if (data)
    return (
      <Box w="fit-content" margin={"auto"} textAlign="center" py="4">
        <Heading py="4">
          Thanks for contacting us, we will reach you soon !
        </Heading>
        <Link href={"/"}>Go back Home</Link>
      </Box>
    );
  return (
    <Box
      color="black"
      borderRadius="0"
      w="full"
      justifyContent="center"
      overflow="hidden"
      display="flex"
      flexDirection={{ base: "column", lg: "row" }}
      h="fit-content"
    >
      <Box
        p={{ base: "12", sm: "2" }}
        bg="#299D8C"
        color="white"
        w={{ base: "fit-content", xs: "xs" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Text py="4" px="2" alignSelf="center" color="whiteAlpha.800">
          Fill up the form <br />
          and our sales department will get back to you
          <br />
          within a business day.
        </Text>
        <hr />
        <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }} fontSize="14">
          <VStack pl={0} alignItems="start" px="3">
            <Flex alignItems={"center"} gap="1">
              <span
                style={{
                  marginBottom: "4px",
                  fontSize: "2em",
                }}
              >
                ✆{" "}
              </span>
              <Text>0090 554 195 0 195 </Text>
            </Flex>
            <Flex alignItems={"center"} gap="1">
              <span
                style={{
                  marginBottom: "4px",
                  fontSize: "2em",
                }}
              >
                ✉{" "}
              </span>
              <Text>info@oyatextile.com </Text>
            </Flex>
            <Flex alignItems={"center"} gap="1">
              <span
                style={{
                  marginBottom: "4px",
                  fontSize: "1.5em",
                }}
              >
                📍{" "}
              </span>
              <Text>
                Akcesme Mah, 2622 Sok. No: 12 Merkezefendi / Denizli Turkey
              </Text>
            </Flex>
            {/* 📍 Akcesme Mah, 2622 Sok.    No: 12 Merkezefendi / Denizli Turkey */}

            <Flex alignItems={"center"} gap="1" fontSize={"17"}>
              <span
                style={{
                  marginBottom: "4px",
                  fontSize: "1.5em",
                }}
              >
                ⌛{" "}
              </span>
              <Text>Working hours</Text>
            </Flex>
            <Stack px="4">
              <Text>Monday – Friday</Text>
              <Text>09:00 AM – 18.00 PM</Text>
            </Stack>
          </VStack>
        </Box>
      </Box>
      <Box
        bg="white"
        p="12"
        borderRadius="0"
        w={{ base: "md", sm: "full" }}
        // h="full"
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignContent="center"
      >
        {data?.success}
        <form>
          <VStack spacing={5} justifyContent="center">
            <Stack
              justifyContent="start"
              alignContent="start"
              w="full"
              py="4"
              spacing={4}
              direction={{ base: "column", lg: "row" }}
            >
              <StyledInput label="Name" setInput={setName} />
              <StyledInput label="Email" setInput={setEmail} />
            </Stack>
            <Stack
              justifyContent="start"
              alignContent="start"
              w="full"
              py="4"
              spacing={4}
              direction={{ base: "column", lg: "row" }}
            >
              <StyledInput label="Phone" setInput={setPhone} />
              <StyledInput label="Country" setInput={setCountry} />
            </Stack>
            <FormControl py="4">
              <Select
                placeholder="Please, select your business"
                _placeholder={{
                  p: "1",
                }}
                _focus={{
                  outline: "none",
                  borderColor: "transparent",
                  outlineColor: "transparent",
                }}
                border="none"
                fontSize={14}
                borderBottom={"1px"}
                py="0"
                borderRadius="0"
                onChange={(e: any) => setSelect(e.target.value)}
              >
                <option value={"Wholsaler/Retailer"}>Wholsaler/Retailer</option>
                <option value={"E-commerce website"}>E-commerce website</option>
                <option value={"Hotel/SPA"}>Hotel/SPA</option>
                <option value={"Textile manufacturer"}>
                  Textile manufacturer
                </option>
              </Select>
            </FormControl>
            <FormControl id="message" py="4">
              <Textarea
                p="1"
                border={"none"}
                borderBottom="1px"
                borderRadius={0}
                borderColor="#299D8C"
                placeholder="Message/Request"
                fontSize={"14"}
                _placeholder={{
                  color: "black",
                }}
                onChange={(e) => setMessage(e.target.value)}
                _hover={{
                  borderRadius: "gray.300",
                }}
              />
            </FormControl>
            <FormControl id="submit" float="right" textAlign="end" py="4">
              <Button
                // type="submit"
                fontSize={"14"}
                borderRadius={0}
                variant="solid"
                bg="#299D8C"
                onClick={(e) => {
                  e.preventDefault();
                  const data = {
                    name: Name,
                    email: Email,
                    message: Message,
                  };
                  submit({
                    variables: {
                      name: Name,
                      email: Email,
                      message: Message,
                      select: Selected,
                      phone: Phone,
                      country: Country,
                    },
                  });
                  console.log("submited", data);
                }}
                color="white"
                _hover={{
                  bg: "#29AD8C",
                }}
              >
                Send
              </Button>
            </FormControl>
          </VStack>
        </form>

        <Flex
          as="iframe"
          gap="1"
          w={{ base: "sm", sm: "full" }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1576.1315204041227!2d29.06386111370987!3d37.80730734162292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c73fe6ed511a67%3A0x76fe7e77ec1e42c3!2sAk%C3%A7e%C5%9Fme%2C%202622.%20Sk.%20No%3A12%2C%2020020%20Denizli%20Merkez%2FDenizli%2C%20Turkey!5e0!3m2!1sen!2sma!4v1664742316506!5m2!1sen!2sma"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></Flex>
        <Stack
          direction={"row"}
          spacing={6}
          _hover={{}}
          alignSelf="end"
          py="4"
          // marginTop={{ base: "0", lg: "12em" }}
        >
          <TransDiv>
            <SocialButton
              label={"Twitter"}
              href={"https://twitter.com/Oyaevtekstili"}
            >
              <FaTwitter fill="#299D8C" style={{}} />
            </SocialButton>
          </TransDiv>
          <TransDiv>
            <SocialButton
              label={"YouTube"}
              href={
                "https://www.youtube.com/channel/UCaFjHW4MOhyVwvLbYoMoGIQhttp:/youtube.com"
              }
            >
              <FaYoutube fill="#299D8C" />
            </SocialButton>
          </TransDiv>
          <TransDiv>
            <SocialButton
              label={"Instagram"}
              href={"https://www.instagram.com/oyaevtekstili/"}
            >
              <FaInstagram fill="#299D8C" />
            </SocialButton>
          </TransDiv>
          <TransDiv>
            <SocialButton
              label={"Facebook"}
              href={"https://web.facebook.com/oyahomehoteltextile/?_rdc=1&_rdr"}
            >
              <FaFacebook fill="#299D8C" />
            </SocialButton>
          </TransDiv>
          <TransDiv>
            <SocialButton
              label={"Linkedin"}
              href={"https://www.linkedin.com/company/28625375/admin/"}
            >
              <FaLinkedin fill="#299D8C" />
            </SocialButton>
          </TransDiv>
        </Stack>
      </Box>
      {/* </Box> */}
      {/* </WrapItem> */}
      {/* </Wrap> */}
    </Box>
    // </Box>
    // </Flex>
    // </Container>
  );
}
